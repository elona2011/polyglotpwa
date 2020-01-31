import { openMyDB } from "./db/db";
import List from "./List";
import { getPageConfig } from "../config";

export default class Word extends List {
  constructor(storeName) {
    super({
      storeName,
      indexName: 'forgetNum',
      direction: 'prev'
    })
    if (Word[storeName] instanceof Word) {
      return Word[storeName]
    }
    Object.assign(this, getPageConfig(storeName))
    this.fontSize = "15vw"
    this.audio = {}
    Word[storeName] = this;
    (async () => {
      await this.getCurrent();
      this.title += `(${this.list.length})`
    })()
  }

  async getById(id) {
    let db = await openMyDB()
    let tx = db.transaction(this.storeName)
    let store = tx.objectStore(this.storeName)
    return await store.get(id)
  }

  async addWord({ name, audioFile, exp }) {
    await this.add({
      name,
      audioFile,
      exp,
      forgetNum: 10,
      totalNum: 1,
      date: +new Date(),
      isCheck: false,
    })
  }

  async editWord({ name, audioFile, exp, isCheck = false }) {
    this.curItem.name = name
    this.curItem.audioFile = audioFile
    this.curItem.exp = exp
    this.curItem.isCheck = isCheck
    await this.add(this.curItem)
  }

  async delWord() {
    let id = this.curItem.id

    let i
    if (this.list.length == 1) {
      i = null
    } else if (this.index === this.list.length - 1) {
      i = this.getPrevIndex()
    } else {
      i = this.getNextIndex()
    }
    this.setIndex(i)
    await this.delById(id)
  }
  async remember() {
    ++this.curItem.totalNum;
    this.curItem.forgetNum =
      this.curItem.forgetNum <= 0 ? 0 : --this.curItem.forgetNum;
    await this.addValue(this.curItem);
    this.getNextToCurrent()
  }
  async forget() {
    ++this.curItem.totalNum;
    this.curItem.forgetNum += 5;
    await this.addValue(this.curItem);
    this.getNextToCurrent()
  }
}
