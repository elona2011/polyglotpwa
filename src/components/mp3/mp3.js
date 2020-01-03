import { getListMp3, delMp3ById, addMp3, getMp3ById, dbSetConfig, dbGetConfig } from "../../services/db";

export class Mp3 {
  constructor() {
    if (Mp3.instance instanceof Mp3) {
      return Mp3.instance
    }
    Mp3.instance = this
    this.isInit = false
    this.isPlay = false
    this.name = ''
    this.index = 0
    this.playbackRate = 1
    this.currentTime = 0
    this.duration = 0
    this.file = {}
    this.list = [];
    (async () => {
      this.getMp3List()
      let config = await dbGetConfig()
      if (config) {
        Mp3.instance = Object.assign(this, config)
      }
    })()
  }

  init(file) {
    if (file.id !== this.file.id) {
      this.isInit = true
      this.file = file
      this.name = file.name
      this.audio = this.audio ? this.audio : new Audio()
      this.isPlay = false
      // this.audio.loop = true
      this.objectURL = URL.createObjectURL(file)
      this.audio.src = this.objectURL
      this.audio.playbackRate = this.playbackRate
      this.audio.addEventListener("loadedmetadata", () => {
        this.duration = this.audio.duration;
        dbSetConfig(this.config)
      });
      this.audio.addEventListener("timeupdate", () => {
        this.currentTime = this.audio.currentTime
        dbSetConfig(this.config)
      });
      this.audio.addEventListener("ended", () => {
        this.playNext()
      });
      dbSetConfig(this.config)
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
    dbSetConfig(this.config)
  }
  play() {
    this.audio.play()
    this.isPlay = true
  }
  playNext() {
    this.playMp3ByIndex(this.index >= this.list.length - 1 ? 0 : ++this.index)
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

  playMp3ByIndex(i) {
    this.playNewMp3(this.list[i]);
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
  playNewMp3(file) {
    if (file) {
      this.init(file)
      this.play()
    }
  }

  get config() {
    return {
      playbackRate: this.playbackRate,
      currentTime: this.currentTime,
      duration: this.duration,
      file: this.file,
      index: this.index
    }
  }
}

