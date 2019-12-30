import { dbPromise } from "../../services/db";

export class ChnChar {
  constructor(storeName) {
    if (ChnChar[storeName] instanceof ChnChar) {
      return ChnChar[storeName]
    }
    this.storeName = storeName
    ChnChar[storeName] = this
  }

  async getList() {
    let cursor = await this.getCursor('prev')
    this.list = []
    while (cursor) {
      this.list.push(cursor.value)
      cursor = await cursor.continue();
    }

    return this.list
  }

  async getById(id) {
    let db = await dbPromise
    let tx = db.transaction(this.storeName)
    let store = tx.objectStore(this.storeName)
    return await store.get(id)
  }

  async addWord(val) {
    let db = await dbPromise
    const tx = db.transaction(this.storeName, 'readwrite')
    const store = tx.objectStore(this.storeName)
    await store.put(val)
    await tx.done
  }
  async delWord() {
    let id = this.curItem.id
    let item = this.getNext()
    if (item == this.curItem) item = this.getPrev()
    let db = await dbPromise
    const tx = db.transaction(this.storeName, 'readwrite')
    const store = await tx.objectStore(this.storeName)

    await store.delete(id)
    await tx.done
    await this.getList()
    return item
  }

  setCurrent(item) {
    this.curItem = item
  }
  async getCurrent() {
    if (this.curItem) return this.curItem
    let list = await this.getList()
    this.curItem = list && list[0] ? list[0] : this.curItem
    return this.curItem
  }

  async getCursor(direction) {
    let db = await dbPromise
    let tx = db.transaction(this.storeName)
    let store = tx.objectStore(this.storeName)
    let indexForget = store.index('forget')
    let keyRangeValue = IDBKeyRange.lowerBound(0)
    return await indexForget.openCursor(keyRangeValue, direction)
  }

  getNext() {
    let i = this.list.findIndex(n => n.id === this.curItem.id)
    let r = this.list[i + 1]
    this.curItem = r ? r : this.curItem
    return this.curItem
  }
  getPrev() {
    let i = this.list.findIndex(n => n.id === this.curItem.id)
    let r = this.list[i - 1]
    this.curItem = r ? r : this.curItem
    return this.curItem = r ? r : this.curItem
  }
}
