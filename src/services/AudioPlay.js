export default class AudioPlay {
  constructor({ file, playbackRate = 1, onloadedmetadata, ontimeupdate, onend } = {}) {
    let self = this
    if (AudioPlay.instance instanceof AudioPlay) {
      self = AudioPlay.instance
    } else {
      AudioPlay.instance = self
    }
    self.file = file
    if (!self.audio) {
      self.audio = new Audio()
      self.audio.addEventListener("loadedmetadata", () => {
        onloadedmetadata && onloadedmetadata()
      });
      self.audio.addEventListener("timeupdate", () => {
        ontimeupdate && ontimeupdate(self.audio.currentTime)
      });
      self.audio.addEventListener("ended", () => {
        self.isPlay = false
        onend && onend()
      });
    }
    self.isPlay = false
    if (file) {
      self.objectURL = URL.createObjectURL(file)
      self.audio.src = self.objectURL
    }
    self.audio.playbackRate = playbackRate
    return self
  }

  play() {
    if (this.file) {
      this.audio.play()
      this.isPlay = true
    }
  }

  pause() {
    if (this.file) {
      this.audio.pause()
      this.isPlay = false
    }
  }

  playPauseMp3() {
    if (this.isPlay) {
      this.pause()
    } else {
      this.play()
    }
  }

  get loop() {
    return this.audio.loop
  }
  set loop(value) {
    this.audio.loop = value
  }

  get duration() {
    return this.audio.duration
  }
  get currentTime() {
    return this.audio.currentTime
  }
  set currentTime(value) {
    this.audio.currentTime = value
  }
  get playbackRate() {
    return this.audio.playbackRate
  }
  set playbackRate(value) {
    this.audio.playbackRate = value
  }
}