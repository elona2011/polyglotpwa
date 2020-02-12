import { dbSetConfig, dbGetConfig } from "./db/db";
import List from "./List";

export default class AudioList extends List {
  constructor(audioPlay) {
    super({ storeName: 'mp3' })
    if (AudioList.instance instanceof AudioList) {
      return AudioList.instance
    }
    AudioList.instance = this
    this.name = ''
    this.index = 0
    this.playbackRate = 1
    this.currentTime = 0
    this.duration = 0
    this.isAllLoop = false
    this.file = {}
    this.reload = false
    audioPlay.onloadedmetadata(e => {
      this.duration = this.audioPlay.duration
      this.audioPlay.playbackRate = this.playbackRate
      this.audioPlay.currentTime = this.currentTime
      this.audioPlay.loop = !this.isAllLoop
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
    (async () => {
      await this.getConfig()
      if (this.curItem) {
        this.audioPlay.src = this.curItem
        this.name = this.curItem && this.curItem.name
        // this.isInit = true
      }
    })()
  }

  async getConfig() {
    let config = await dbGetConfig()
    if (config) {
      // if (config.index != this.index) {
      //   this.isInit = false
      // }
      Object.assign(this, config)
      // this.audioPlay.index = this.index
    }
  }

  insertAudio(audioPlay) {
    let isPlay = this.audioPlay.isPlay
    audioPlay.play()
    audioPlay.onplay(() => {
      isPlay = this.audioPlay.isPlay
      this.audioPlay.pause();
    });
    audioPlay.onend(() => {
      isPlay && this.audioPlay.play();
    });
  }

  setIndex(i) {
    if (i != this.index) {
      this.reload = true
      super.setIndex(i)
      this.name = this.curItem && this.curItem.name
      dbSetConfig(this.config)
    }
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

  playCurItem() {
    this.audioPlay.play(this.curItem)
    this.audioPlay.playbackRate = this.playbackRate
    this.audioPlay.loop = !this.isAllLoop
  }

  get config() {
    return {
      playbackRate: this.audioPlay.playbackRate,
      currentTime: this.audioPlay.currentTime,
      isAllLoop: this.isAllLoop,
      index: this.index
    }
  }
}

