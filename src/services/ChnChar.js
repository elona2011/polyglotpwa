import { getListWordByForget, dbPromise, getStore } from "./db";

const storeName_words = 'words'

export class ChnChar {
  constructor() {
    if (ChnChar.instance instanceof ChnChar) {
      return ChnChar.instance
    }

    ChnChar.instance = this
  }

  async init() {
    if (!this.store) this.store = await getStore(storeName_words)
    if (!this.indexForget) this.indexForget = await this.store.index('forget')
  }

  async getList() {
    await this.init()
    if (this.list) return this.list
    this.list = await this.indexForget.getAll()
    return this.list = this.list.reverse()
  }

  async getById(id) {
    let db = await dbPromise
    let tx = db.transaction(storeName_words)
    let store = tx.objectStore(storeName_words)
    return await store.get(id)
  }

  async addWord(val) {
    let db = await dbPromise
    const tx = db.transaction(storeName_words, 'readwrite')
    const store = tx.objectStore(storeName_words)
    await store.put(val)
    await tx.done
  }

  getNext() {

  }
}
