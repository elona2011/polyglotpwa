import { delById, addValue, dbSetConfig, dbGetConfig } from "./db/db";
import List from "./List";
import AudioPlay from "./AudioPlay";

export class Mp3 extends List {
  constructor() {
    super({ storeName: 'mp3' })
    if (Mp3.instance instanceof Mp3) {
      return Mp3.instance
    }
    Mp3.instance = this
    this.isInit = false
    this.name = ''
    this.index = 0
    this.playbackRate = 1
    this.currentTime = 0
    this.duration = 0
    this.isAllLoop = false
    this.isPlay = false
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
      this.audioPlay = new AudioPlay({
        file,
        playbackRate: this.playbackRate,
        onloadedmetadata: () => {
          this.duration = this.audioPlay.duration
          dbSetConfig(this.config)
        },
        ontimeupdate: (t) => {
          this.currentTime = t
          dbSetConfig(this.config)
        },
        onend: () => this.playNext()
      })
      if (!this.isAllLoop) {
        this.audioPlay.loop = true
      }
      dbSetConfig(this.config)
    }
  }

  setCurrent(item) {
    super.setCurrent(item)
    this.playCurItem()
  }

  setCurrentTime(t) {
    if (this.audioPlay) {
      this.audioPlay.currentTime = t
    }
  }
  setPlaybackRate(t) {
    if (this.audioPlay) {
      this.audioPlay.playbackRate = this.playbackRate = t
    }
    dbSetConfig(this.config)
  }

  setAllLoop() {
    this.isAllLoop = !this.isAllLoop
    if (this.audioPlay) {
      this.audioPlay.loop = !this.isAllLoop
    }
    dbSetConfig(this.config)
  }

  playNext() {
    this.getNextToCurrent({ isLoop: true })
    this.playCurItem()
  }

  async playCurItem() {
    await this.getCurrent()
    this.playNewMp3(this.curItem)
  }

  playPauseMp3() {
    if (this.isInit) {
      this.audioPlay.playPauseMp3()
      this.isPlay = this.audioPlay.isPlay
    } else {
      this.playCurItem()
    }
  }

  playNewMp3(file) {
    if (file) {
      this.init(file)
      this.audioPlay.play()
      this.isPlay = this.audioPlay.isPlay
    }
  }

  get config() {
    return {
      playbackRate: this.audioPlay.playbackRate,
      currentTime: this.audioPlay.currentTime,
      duration: this.audioPlay.duration,
      isAllLoop: this.isAllLoop,
      file: this.audioPlay.file || {},
      index: this.index
    }
  }
}

