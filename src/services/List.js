import { addValue, getList } from "./db/db";

export default class List {
  constructor({ storeName, indexName, direction }) {
    this.list = [];
    this.curItem = {}
    this.storeName = storeName
    this.indexName = indexName
    this.direction = direction
  }
  async getList() {
    this.list = await getList(this.storeName, this.direction, this.indexName)
    return this.list
  }
  async add(val) {
    await addValue(this.storeName, val)
    await this.getList()
  }
  setCurrent(item) {
    return this.curItem = item && item.id ? item : this.curItem
  }
  async getCurrent() {
    if (Object.keys(this.curItem).length != 0) return this.curItem
    let list = this.list = await this.getList()
    this.curItem = list && list[0] ? list[0] : this.curItem
    return this.curItem
  }
  getNextToCurrent({ isLoop } = {}) {
    let item = this.getNext()
    if (isLoop && !item) item = this.list[0]
    return this.setCurrent(item)
  }
  getPrevToCurrent({ isLoop } = {}) {
    let item = this.getPrev()
    if (isLoop && !item) item = this.list[this.list.length - 1]
    return this.setCurrent(item)
  }
  getNext() {
    let i = this.list.findIndex(n => n.id === this.curItem.id)
    let r = this.list[i + 1]
    return r
  }
  getPrev() {
    let i = this.list.findIndex(n => n.id === this.curItem.id)
    let r = this.list[i - 1]
    return r
  }
}