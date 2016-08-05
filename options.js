// Options.js
//
// Saves options to chrome.storage.sync

function save_options(){
    var selected = document.getElementById('words').value;
    switch(selected){
        case "herpderp":
            var words = ["herp","derp"];
            break;
        case "blahblah":
        default:
            var words = ["blah", "blahblah"];
        case "custom":
            var words = document.getElementById('text').value
                .split(',').map( function (s) { return s.trim() } );
    };
    chrome.storage.sync.clear();
    chrome.storage.sync.set(
            {
                selection: selected,
                word_list: words
            },
            function() {
                // Update status div to say if the save was successful
                var status = document.getElementById('status');
                status.textContent = 'options saved.';
                setTimeout( function() { status.textContent = ''; }, 750);
            });
}

// Restores selected options state using the saved preferences
function restore_options(){
    // Default value is herpderp
    chrome.storage.sync.get({
        selection: "herpderp",
        word_list: ["herp", "derp"]
    }, function(items) {
        document.getElementById('words').value = items.selection;
        if(items.selection === "custom"){
            document.getElementById('text').disabled = false;
            document.getElementById('text').value = items.word_list.join(', ');
        } else {
            document.getElementById('text').disabled = true;
        }
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
            save_options);
document.getElementById('words').addEventListener('change', function() {
        if(document.getElementById('words').value === "custom"){
            document.getElementById('text').disabled = false;
        } else {
            document.getElementById('text').disabled = true;
        }
}); 
