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
    this.storeName = storeName
    Object.assign(this, getPageConfig(storeName))
    Word[storeName] = this;
    this.getCurrent();
  }

  async getById(id) {
    let db = await openMyDB()
    let tx = db.transaction(this.storeName)
    let store = tx.objectStore(this.storeName)
    return await store.get(id)
  }
  async addWord(word) {
    await this.add({
      name: word,
      forgetNum: 1,
      totalNum: 1,
      date: +new Date()
    })
    await this.getList()
  }
  async pushCurItem() {
    await this.add(this.curItem)
  }
  async add(val) {
    let db = await openMyDB()
    const tx = db.transaction(this.storeName, 'readwrite')
    const store = tx.objectStore(this.storeName)
    await store.put(val)
    await tx.done
  }
  async delWord() {
    let id = this.curItem.id
    let item = this.getNext()
    if (!item) item = this.getPrev()
    if (!item) item = {}
    this.setCurrent(item)

    let db = await openMyDB()
    const tx = db.transaction(this.storeName, 'readwrite')
    const store = await tx.objectStore(this.storeName)

    await store.delete(id)
    await tx.done
    await this.getList()
    return item
  }
  async remember() {
    ++this.curItem.totalNum;
    this.curItem.forgetNum =
      this.curItem.forgetNum <= 0 ? 0 : --this.curItem.forgetNum;
    await this.add(this.curItem);
    await this.getList()
    this.getNextToCurrent()
  }
  async forget() {
    ++this.curItem.totalNum;
    ++this.curItem.forgetNum;
    await this.add(this.curItem);
    await this.getList()
    this.getNextToCurrent()
  }
}
