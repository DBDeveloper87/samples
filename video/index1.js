const airPlayButton = document.getElementById('airPlayButton')

// Adds AirPlay support
function toggleAirPlay() {

}

// toggleSubtitles toggles the subtitles menu
function toggleSubtitles() {
  for (var i = 0; i < video.textTracks.length; i++) {
    video.textTracks[i].mode = 'hidden';
  }
  
}



  




// Add eventlisteners here

// Checks for AirPlay Availability
if (window.WebKitPlaybackTargetAvailabilityEvent) {
     video.addEventListener('webkitplaybacktargetavailabilitychanged',
         function(event) {
             switch (event.availability) {
             case "available":
                 airPlayButton.hidden = false;
                 airPlayButton.disabled = false;
                 break;
             case "not-available":
                 airPlayButton.hidden = true;
                 airPlayButton.disabled = true;
                 break;
              } }); 
     
     airPlayButton.addEventListener('click', function(event) {
            video.webkitShowPlaybackTargetPicker();
      });

     video.addEventListener('webkitcurrentplaybacktargetiswirelesschanged', 
            function(event) {
                updateAirPlayButtonWirelessStyle();
                updatePageDimmerForWirelessPlayback();
      });
} 


// Check for PnP support
document.addEventListener('DOMContentLoaded', () => {
  if (!('pictureInPictureEnabled' in document)) {
    pipButton.classList.add('hidden');
  }
});

document.addEventListener('keyup', keyboardShortcuts);

// document.getElementById('timeStamp').innerHTML = timeElapsed + " / " + duration;