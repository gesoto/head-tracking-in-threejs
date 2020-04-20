
// We'll store the value of te bars we want to draw in here
const bars = [];
let bars2;

// An instance of AudioContext
const audioContext = new AudioContext();

// This will become our input MediaStreamSourceNode
let input = null;

// This will become our AnalyserNode
let analyser = null;

// This will become our ScriptProcessorNode
let scriptProcessor = null;

// Canvas related variables
const barWidth = 2;
const barGutter = 2;
const barColor = "#49F1D5";

let canvas = null;
let canvasContext = null;
let width = 0;
let height = 0;
let halfHeight = 0;
let drawing = false;

/**
 * Process the input of the ScriptProcessorNode.
 *
 * @param {audioProcessingEvent}
 */
const processInput = (audioProcessingEvent) => {
    // Create a new Uint8Array to store the analyser's frequencyBinCount
    const tempArray = new Uint8Array(analyser.frequencyBinCount);

    // Get the byte frequency data from our array
    analyser.getByteFrequencyData(tempArray);

    // Calculate the average volume and store that value in our bars Array
    bars.push(getAverageVolume(tempArray));
    bars2 = getAverageVolume(tempArray);

    // Render the bars
    renderBars(bars, bars2);
    // console.log("processInput")
};

/**
 * Calculate the average value from the supplied array.
 *
 * @param {Array<Int>}
 */
const getAverageVolume = (array) => {
    const length = array.length;
    let values = 0;
    let i = 0;

    // Loop over the values of the array, and count them
    for (; i < length; i++) {
        values += array[i];
    }

    // Return the avarag
    return values / length;
};

/**
 * Render the bars.
 */

const renderBars = () => {
    console.log(bars2)
};

// Wait untill the page has loaded
(function () {

    // Get the users microphone audio.
    navigator.mediaDevices
        .getUserMedia({
            audio: true,
        })
        .then(
            (stream) => {
                // Create the audio nodes
                input = audioContext.createMediaStreamSource(stream);
                analyser = audioContext.createAnalyser();
                scriptProcessor = audioContext.createScriptProcessor();

                analyser.smoothingTimeConstant = 0.3;
                analyser.fftSize = 1024;

                // Connect the audio nodes
                input.connect(analyser);
                analyser.connect(scriptProcessor);
                scriptProcessor.connect(audioContext.destination);

                // Add an event handler
                scriptProcessor.onaudioprocess = processInput;
            },
            (error) => {
                // Something went wrong, or the browser does not support getUserMedia
            }
        );
})();

