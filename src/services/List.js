import { addValue, getList, delById } from "./db/db";

export default class List {
  constructor({ storeName, indexName, direction }) {
    this.list = [];
    this.index = 0
    this.storeName = storeName
    this.indexName = indexName
    this.direction = direction
    this.curItem = {}
  }
  async getList() {
    this.list = await getList(this.storeName, this.direction, this.indexName)
    return this.list
  }
  async add(val) {
    await addValue(this.storeName, val)
    await this.getList()
  }
  async delById(id) {
    await delById(this.storeName, id)
    await this.getList()
  }
  setIndex(i) {
    this.index = i
    return this.curItem = this.list[i]
  }
  async getCurrent() {
    await this.getList()
    debugger
    return this.curItem = this.list[this.index]
  }
  // isCurItemEmpty() {
  //   if (Object.keys(this.curItem).length == 0) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }
  getNextToCurrent({ isLoop } = {}) {
    return this.setIndex(this.getNextIndex(isLoop))
  }
  getPrevToCurrent({ isLoop } = {}) {
    return this.setIndex(this.getPrevIndex(isLoop))
  }
  getNextIndex(loop) {
    let next = this.index + 1
    if (loop) {
      return next >= this.list.length ? 0 : next
    } else {
      return next >= this.list.length ? this.index : next
    }
  }
  getPrevIndex(loop) {
    let next = this.index - 1
    if (loop) {
      return next < 0 ? this.list.length - 1 : next
    } else {
      return next < 0 ? this.index : next
    }
  }
}