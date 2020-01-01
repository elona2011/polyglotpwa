import { getListMp3, delMp3ById, addMp3, getMp3ById } from "../../services/db";

export class Mp3 {
  constructor() {
    if (Mp3.instance instanceof Mp3) {
      return Mp3.instance
    }
    Mp3.instance = this
    this.isInit = false
    this.isPlay = false
    this.name = ''
    this.playbackRate = 1
    this.currentTime = 0
    this.duration = 0
    this.file = {}
    this.list = [];
    (async () => {
      this.getMp3List()
    })()
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

  async getMp3List() {
    return this.list = await getListMp3()
  }

  async delMp3ById(id) {
    await delMp3ById(id)
    await this.getMp3List()
  }

  async addMp3(file) {
    await addMp3(file)
    await this.getMp3List()
  }

  async getFirstMp3() {
    if (!this.list) this.getMp3List()
    if (this.list && this.list.length) {
      return this.list[0]
    } else {
      return null
    }
  }

  async playMp3ById(id) {
    let file = await getMp3ById(id);
    this.playNewMp3(file);
  }

  playPauseMp3(file) {
    if (this.isInit) {
      if (this.isPlay) {
        this.pause()
      } else {
        this.play()
      }
    } else {
      this.playNewMp3(file)
    }
  }
  async continuePauseOrPlayFirst() {
    let file = await this.getFirstMp3()
    this.playPauseMp3(file)
    return this.isPlay
  }
  async playNewMp3(file) {
    if (file) {
      this.init(file)
      this.play()
    }
  }
}

