var camX = 0;
var camY = 0;

// set up video and canvas elements needed
var videoInput = document.getElementById('inputVideo');
var canvasInput = document.getElementById('inputCanvas');

// additional elements to draw rectangle
var canvasOverlay = document.getElementById('overlayCanvas')
var overlayContext = canvasOverlay.getContext('2d');

// position the overlay on top of canvas
canvasOverlay.style.zIndex = '100001';
canvasOverlay.style.display = 'block';

// the face tracking setup
var htracker = new headtrackr.Tracker({calcAngles : true, ui : false, headPosition : false,});
htracker.init(videoInput, canvasInput);
htracker.start();

// for each facetracking event received draw rectangle around tracked face on canvas
document.addEventListener("facetrackingEvent", function( event ) {
    // clear canvas
    overlayContext.clearRect(0,0,320,240);
    // once we have stable tracking, draw rectangle
    if (event.detection == "CS") {
        overlayContext.translate(event.x, event.y)
        overlayContext.rotate(event.angle-(Math.PI/2));
        overlayContext.strokeStyle = "#00CC00";
        overlayContext.strokeRect((-(event.width/2)) >> 0, (-(event.height/2)) >> 0, event.width, event.height);
        overlayContext.rotate((Math.PI/2)-event.angle);
        overlayContext.translate(-event.x, -event.y);
        camX = (event.x - 160) * 5;
        camY = event.y;
    }
});
