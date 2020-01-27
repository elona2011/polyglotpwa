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
    })()
  }

  async getById(id) {
    let db = await openMyDB()
    let tx = db.transaction(this.storeName)
    let store = tx.objectStore(this.storeName)
    return await store.get(id)
  }

  async addWord({ name, audioFile }) {
    await this.add({
      name,
      audioFile,
      forgetNum: 10,
      totalNum: 1,
      date: +new Date()
    })
  }

  async editWord(name) {
    this.curItem.name = name
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
    this.delById(id)
  }
  async remember() {
    ++this.curItem.totalNum;
    this.curItem.forgetNum =
      this.curItem.forgetNum <= 0 ? 0 : --this.curItem.forgetNum;
    await this.add(this.curItem);
    // await this.getList()
    this.getNextToCurrent()
  }
  async forget() {
    ++this.curItem.totalNum;
    this.curItem.forgetNum += 5;
    await this.add(this.curItem);
    // await this.getList()
    this.getNextToCurrent()
  }
}
