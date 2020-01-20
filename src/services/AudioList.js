import { dbSetConfig, dbGetConfig } from "./db/db";
import List from "./List";

export default class AudioList extends List {
  constructor(audioPlay) {
    super({ storeName: 'mp3' })
    if (AudioList.instance instanceof AudioList) {
      return AudioList.instance
    }
    AudioList.instance = this
    this.isInit = false
    this.name = ''
    this.index = 0
    this.playbackRate = 1
    this.currentTime = 0
    this.duration = 0
    this.isAllLoop = false
    this.isPlay = false
    this.file = {}
    audioPlay.onloadedmetadata(e => {
      this.duration = this.audioPlay.duration
      dbSetConfig(this.config)
    })
    audioPlay.ontimeupdate(e => {
      this.currentTime = this.audioPlay.currentTime
      dbSetConfig(this.config)
    })
    audioPlay.onend(e => {
      this.playNext()
    })
    this.audioPlay = audioPlay;
    // (async () => {
    //   await this.getCurrent();
    //   this.audioPlay.src = this.curItem
    // })();
    (async () => {
      await this.getList()
      let config = await dbGetConfig()
      if (config) {
        AudioList.instance = Object.assign(this, config)
        this.audioPlay.src = this.list[this.index]
        this.audioPlay.playbackRate = this.playbackRate
        // debugger
      }
    })()
  }

  init(file) {
    this.isInit = true
    this.file = file
    this.name = file.name
    this.audioPlay.src = file
    this.audioPlay.playbackRate = this.playbackRate
    this.isPlay = false
    if (!this.isAllLoop) {
      this.audioPlay.loop = true
    }
    dbSetConfig(this.config)
  }

  insertAudio(file) {
    this.lastConfig = this.config
    this.loop = false
    this.src = file
    this.play()
  }

  setIndex(i) {
    super.setIndex(i)
    this.playCurItem()
  }

  // setCurrent(item) {
  //   super.setCurrent(item)
  //   // this.playCurItem()
  // }

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
    } else if (this.file && this.file.name) {
      this.playNewMp3(this.file)
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

