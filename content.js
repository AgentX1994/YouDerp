// content.js

var words = [];

chrome.storage.sync.get({
        selection: "herpderp",
        word_list: ["herp", "derp"]
    }, function(items) {
        words = items.word_list;
    });

function replace_words() {
    this.original = $(this).html(); // Save original contents

    $(this).click(function(){ $(this).html(this.original)}); // restore contents on click

    var randLen = (Math.floor(Math.random()*50)+1);
    var newContents = new Array(randLen);

    for(var i = 0; i < randLen; i++) {
        var index = (Math.floor(Math.random()*words.length));

        newContents[i] = words[index];
    }

    $(this).addClass("Changed");

    return newContents.join(' ');
}

$('.Ct, .comment-renderer-text-content').not('.Changed').html(replace_words);

setInterval(function() {
    $('.Ct, .comment-renderer-text-content').not('.Changed').html(replace_words);
}, 100);


