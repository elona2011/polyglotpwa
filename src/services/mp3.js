import { getListMp3 } from "./db";

class Mp3 {
  constructor() {
    this.isInit = false
    this.isPlay = false
    this.name = ''
    this.playbackRate = 1
    this.currentTime = 0
    this.duration = 0
    this.file = {}
  }

  init(file) {
    if (file.id !== this.file.id) {
      this.isInit = true
      this.file = file
      this.name = file.name
      this.audio = this.audio ? this.audio : new Audio()
      this.isPlay = false
      this.audio.loop = true
      this.objectURL = URL.createObjectURL(file)
      this.audio.src = this.objectURL
      this.audio.addEventListener("loadedmetadata", () => {
        this.duration = this.audio.duration;
      });
      this.audio.addEventListener("timeupdate", () => {
        this.currentTime = this.audio.currentTime
      });
    }
  }

  setCurrentTime(t) {
    if (this.audio) {
      this.audio.currentTime = t
    }
  }
  setPlaybackRate(t) {
    if (this.audio) {
      this.audio.playbackRate = this.playbackRate = t
    }
  }
  play() {
    this.audio.play()
    this.isPlay = true
  }
  pause() {
    this.audio.pause()
    this.isPlay = false
  }

  // get isPlaying() {
  //   return !!(this.audio.currentTime > 0 && !this.audio.paused && !this.audio.ended && this.audio.readyState > 2)
  // }
}

export let mp3 = new Mp3()

export const getFirstMp3 = async () => {
  let listMp3 = await getListMp3()
  if (listMp3 && listMp3.length) {
    return listMp3[0]
  } else {
    return null
  }
}

export const playPauseMp3 = file => {
  if (mp3.isInit) {
    if (mp3.isPlay) {
      mp3.pause()
    } else {
      mp3.play()
    }
  } else {
    playNewMp3(file)
  }
}

export const continuePauseOrPlayFirst = async () => {
  let file = await getFirstMp3()
  playPauseMp3(file)
  return mp3.isPlay
}

export const playNewMp3 = async file => {
  if (file) {
    mp3.init(file)
    mp3.play()
  }
}