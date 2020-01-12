export default function () {
  return {
    setCurrent(item) {
      return this.curItem = item && item.id ? item : this.curItem
    },
    async getCurrent() {
      if (Object.keys(this.curItem).length != 0) return this.curItem
      let list = this.list = await this.getList()
      this.curItem = list && list[0] ? list[0] : this.curItem
      return this.curItem
    },
    getNextToCurrent(isLoop) {
      let item = this.getNext()
      if (isLoop && !item) item = this.list[0]
      return this.setCurrent(item)
    },
    getPrevToCurrent(isLoop) {
      let item = this.getPrev()
      if (isLoop && !item) item = this.list[this.list.length - 1]
      return this.setCurrent(item)
    },
    getNext() {
      let i = this.list.findIndex(n => n.id === this.curItem.id)
      let r = this.list[i + 1]
      return r
    },
    getPrev() {
      let i = this.list.findIndex(n => n.id === this.curItem.id)
      let r = this.list[i - 1]
      return r
    },
  }
}