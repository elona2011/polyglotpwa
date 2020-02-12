import { create, edit, getList, delByName } from "./Interfaces";
import { getList as getListDb } from "./db/db";

export default class List {
  constructor({ storeName, indexName, direction }) {
    if (List.hasOwnProperty(storeName) && List[storeName] instanceof List) {
      return List[storeName]
    }
    List[storeName] = this
    this.list = [];
    this.index = 0
    this.storeName = storeName
    this.indexName = indexName
    this.direction = direction
    this.curItem = {};
    this.getList()
  }

  async getList() {
    // this.list = await getListDb(this.storeName)
    this.list = await getList(this.storeName, this.direction, this.indexName)
    this.setIndex()
  }

  async add(val) {
    await create(this.storeName, val)
    await this.getList()
  }
  async edit(val) {
    await edit(this.storeName, val)
    await this.getList()
  }
  async delByName(name) {
    await delByName(this.storeName, name)
    await this.getList()
  }
  setIndex(i) {
    if (i !== undefined) {
      this.index = i
    }
    return this.curItem = this.list[this.index]
  }
  setIndexByName(name) {
    let i = this.list.findIndex(n => n.name === name)
    return this.setIndex(i)
  }
  // async getCurrent() {
  //   await this.getList()
  //   return this.curItem = this.list[this.index]
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