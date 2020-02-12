import AudioPlay from "./AudioPlay";

export default class {
  constructor() {
    this.file = null
    this.audioPlay = new AudioPlay
    this.cameraStream = null;
    this.videoNode = null
  }

  async recordStart() {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    this.mediaRecorder = new MediaRecorder(this.stream);
    this.mediaRecorder.start();

    const audioChunks = [];
    this.mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    this.mediaRecorder.addEventListener("stop", () => {
      this.file = new Blob(audioChunks);
      this.audioPlay = new AudioPlay({ file: this.file });
      // audio.play();
    });
  }

  recordStop() {
    this.mediaRecorder.stop()
    this.stream.getTracks()[0].stop()
  }

  videoStart(videoNode) {
    this.videoNode = videoNode
    if ("mediaDevices" in navigator && null == this.cameraStream) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(mediaStream => {
          this.cameraStream = mediaStream;
          videoNode.srcObject = mediaStream;
          videoNode.play();
        })
        .catch(function (err) {
          console.log("Unable to access camera: " + err);
        });
    } else {
      alert("Your browser does not support media devices.");

      return;
    }
  }
  captureImage(capture){
    if (null != this.cameraStream) {
      var ctx = capture.getContext("2d");
      var img = new Image();

      ctx.drawImage(
        this.videoNode,
        0,
        0,
        capture.width,
        capture.height
      );

      img.src = capture.toDataURL("image/png");
      img.width = 240;

      // snapshot.innerHTML = "";

      // snapshot.appendChild(img);
      this.cameraStream.getTracks()[0].stop()
    } 
  }
}