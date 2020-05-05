const modelParams = {
    flipHorizontal: true, // flip e.g for video 
    imageScaleFactor: 0.7, // reduce input image size for gains in speed.
    maxNumBoxes: 2, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.89, // confidence threshold for predictions.
}


// Gives the ability to use the webcam different browsers
navigator.getUserMedia =
    navigator.getUserMedia ||
    // Chrome / Safari
    navigator.webkitGetUserMedia ||
    // Firefox
    navigator.mozGetUserMedia ||
    // IE
    navigator.msGetUserMedia;


// Select from html using query selector 
const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
let model;

handTrack.startVideo(video)
    .then(status => {
        if (status) {
            // Have access to the webcam, here we pass in video with empty object and then pass in the video stream
            navigator.getUserMedia({
                    video: {}
                }, stream => {
                    video.srcObject = stream;
                    // Run our detection
                    setInterval(runDetection, 300);
                },
                err => console.log(err)
            );
        }
    });


// Detection
function runDetection() {
    model.detect(video).then(predictions => {
        if (predictions.length !== 0) {
            let hand1 = predictions[0].bbox;
            let x = hand1[0];
            let y = hand1[1];

            if (y > 300) {
                if (x < 200) {
                    audio.src = '/notes/TL-79 Kick1.wav';
                } else if (x > 400) {
                    audio.src = '/notes/TL-08Cymbal.wav';
                } else if (x > 300) {
                    audio.src = '/notes/TL-60Perc23.wav';
                } else if (x > 200) {
                    audio.src = '/notes/TL-78 Tom Hi1.wav'
                }
            }
            //    Play sound!
            audio.play();
        }
    });
}


    // Hand detection and pass in params on the top
    handTrack.load(modelParams).then(lmodel => {
        model = lmodel;
    });