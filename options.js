// Saves options to chrome.storage
function save_options() {
    var name = document.getElementById('discordName').value;
    var discordIMG = document.getElementById('discordIMG').value;
    chrome.storage.sync.set({
      name: name,
      discordImage: discordIMG
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }

  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    chrome.storage.sync.get({
        name: 'Pixcord',
        discordImage: 'blue'
    }, function(items) {
      document.getElementById('discordName').value = items.name;
      document.getElementById('discordIMG').value = items.discordImage;
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);