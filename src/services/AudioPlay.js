export default class AudioPlay {
  constructor({ file, playbackRate = 1 } = {}) {
    this.audio = new Audio()
    this.audio.addEventListener("loadedmetadata", e => {
      this.cbs.onloadedmetadata.forEach(n => n(e))
    });
    this.audio.addEventListener("timeupdate", e => {
      this.cbs.ontimeupdate.forEach(n => n(e))
    });
    this.audio.addEventListener("ended", e => {
      this.isPlay = false
      this.cbs.onend.forEach(n => n(e))
    });
    this.isPlay = false
    if (file) {
      this.src = file
      this.audio.playbackRate = playbackRate
    }
    this.cbs = {
      onloadedmetadata: [],
      ontimeupdate: [],
      onend: [],
      onplay: [],
    }
  }

  onloadedmetadata(fn) {
    this.cbs.onloadedmetadata.push(fn)
  }
  ontimeupdate(fn) {
    this.cbs.ontimeupdate.push(fn)
  }
  onend(fn) {
    this.cbs.onend.push(fn)
  }
  onplay(fn) {
    this.cbs.onplay.push(fn)
  }

  destroy() {
    this.audio.src = ''
    // this.audio.pause()
  }

  play(file) {
    if (file) {
      this.src = file
    }
    if (this.file) {
      this.audio.play()
      this.isPlay = true
    }
    this.cbs.onplay.forEach(n => n())
  }

  pause() {
    this.audio.pause()
    this.isPlay = false
  }

  playPause() {
    if (this.isPlay) {
      this.pause()
    } else {
      this.play()
    }
  }

  set src(file) {
    if (file && (file instanceof Blob || file instanceof File) && this.file !== file) {
      this.file = file
      this.objectURL = URL.createObjectURL(file)
      this.audio.src = this.objectURL
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