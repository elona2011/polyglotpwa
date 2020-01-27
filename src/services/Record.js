import AudioPlay from "./AudioPlay";

export default class {
  constructor(){
    this.file = null
    this.audioPlay = new AudioPlay
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
}