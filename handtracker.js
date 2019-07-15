const modelParams = {
  flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image size for gains in speed.
  maxNumBoxes: 5, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.90, // confidence threshold for predictions.
}

navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

const video = document.querySelector("#video");
const audio = document.querySelector("#audio");
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
let model;

handTrack.startVideo(video)
  .then(status => {
    if (status) {
      navigator.getUserMedia({
          video: {}
        }, stream => {
          video.srcObject = stream;
          // setInterval(runDetection, 1000);
          runDetection();
        },
        err => console.log(err)
      );
    }
  });

function runDetection() {
  model.detect(video)
    .then(predictions => {
      // document.getElementById("output").innerHTML = "SCANNING";
      console.log(predictions);
      // model.renderPredictions(predictions, canvas, context, video);
      if (predictions.length > 0) {
        audio.play();
        console.log(predictions[0]["score"])
        document.getElementById("output").innerHTML = "Probability output: " + predictions[0]["score"].toString();
      }
      requestAnimationFrame(runDetection);
    });
}


handTrack.load(modelParams).then(lmodel => {
  model = lmodel;
});
