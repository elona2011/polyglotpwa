import { delById, addValue, dbSetConfig, dbGetConfig } from "./db/db";
import List from "./List";

export class Mp3 extends List {
  constructor() {
    super({ storeName: 'mp3' })
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
    this.isAllLoop = false
    this.file = {}

    this.getCurrent();
    (async () => {
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
      this.isPlay = false
      if (!this.audio) {
        this.audio = new Audio()
        if (!this.isAllLoop) {
          this.audio.loop = true
        }
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
      }
      this.objectURL = URL.createObjectURL(file)
      this.audio.src = this.objectURL
      dbSetConfig(this.config)
    }
  }

  setCurrent(item) {
    super.setCurrent(item)
    this.playCurItem()
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

  setAllLoop() {
    this.isAllLoop = !this.isAllLoop
    if (this.audio) {
      this.audio.loop = !this.isAllLoop
    }
    dbSetConfig(this.config)
  }

  async delMp3ById(id) {
    await delById(this.storeName, id)
    await this.getList()
  }

  async addMp3(file) {
    await addValue(this.storeName, file)
    await this.getList()
  }

  play() {
    this.audio.play()
    this.isPlay = true
  }
  playNext() {
    this.getNextToCurrent({ isLoop: true })
    this.playCurItem()
  }
  pause() {
    this.audio.pause()
    this.isPlay = false
  }

  async playCurItem() {
    await this.getCurrent()
    this.playNewMp3(this.curItem)
  }

  playPauseMp3() {
    if (this.isInit) {
      if (this.isPlay) {
        this.pause()
      } else {
        this.play()
      }
    } else {
      this.playCurItem()
    }
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
      isAllLoop: this.isAllLoop,
      file: this.file,
      index: this.index
    }
  }
}

