import { dbPromise } from "./db";

function methods() {
  return {
    async getList() {
      let cursor = await this.getCursor('prev')
      this.list = []
      while (cursor) {
        this.list.push(cursor.value)
        cursor = await cursor.continue();
      }

      return this.list
    },
    async getById(id) {
      let db = await dbPromise
      let tx = db.transaction(this.storeName)
      let store = tx.objectStore(this.storeName)
      return await store.get(id)
    },
    async addWord(word) {
      await this.add({
        name: word,
        forgetNum: 1,
        totalNum: 1,
        date: +new Date()
      })
    },

    async add(val) {
      let db = await dbPromise
      const tx = db.transaction(this.storeName, 'readwrite')
      const store = tx.objectStore(this.storeName)
      await store.put(val)
      await tx.done
    },
    async delWord() {
      let id = this.curItem.id
      let item = this.getNext()
      if (!item) item = this.getPrev()
      if (!item) item = {}
      this.setCurrent(item)

      let db = await dbPromise
      const tx = db.transaction(this.storeName, 'readwrite')
      const store = await tx.objectStore(this.storeName)

      await store.delete(id)
      await tx.done
      await this.getList()
      return item
    },

    setCurrent(item) {
      return this.curItem = item && item.id ? item : this.curItem
    },
    async getCurrent() {
      if (this.curItem) return this.curItem
      let list = await this.getList()
      this.curItem = list && list[0] ? list[0] : this.curItem
      return this.curItem
    },

    async getCursor(direction) {
      let db = await dbPromise
      let tx = db.transaction(this.storeName)
      let store = tx.objectStore(this.storeName)
      let indexForget = store.index('forgetNum')
      let keyRangeValue = IDBKeyRange.lowerBound(0)
      return await indexForget.openCursor(keyRangeValue, direction)
    },
    getNextToCurrent() {
      let item = this.getNext()
      return this.setCurrent(item)
    },
    getPrevToCurrent() {
      let item = this.getPrev()
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
    }
  }
}

export default class Word {
  constructor(storeName) {
    if (Word[storeName] instanceof Word) {
      return Word[storeName]
    }
    this.storeName = storeName
    Object.assign(this, methods())
    Word[storeName] = this
  }
}

// export default class Word {
//   constructor(storeName) {
//     if (Word[storeName] instanceof Word) {
//       return Word[storeName]
//     }
//     this.storeName = storeName
//     Word[storeName] = this
//   }

//   async getList() {
//     let cursor = await this.getCursor('prev')
//     this.list = []
//     while (cursor) {
//       this.list.push(cursor.value)
//       cursor = await cursor.continue();
//     }

//     return this.list
//   }

//   async getById(id) {
//     let db = await dbPromise
//     let tx = db.transaction(this.storeName)
//     let store = tx.objectStore(this.storeName)
//     return await store.get(id)
//   }

//   async addWord(val) {
//     let db = await dbPromise
//     const tx = db.transaction(this.storeName, 'readwrite')
//     const store = tx.objectStore(this.storeName)
//     await store.put(val)
//     await tx.done
//   }
//   async delWord() {
//     let id = this.curItem.id
//     let item = this.getNext()
//     if (!item) item = this.getPrev()
//     if (!item) item = {}
//     this.setCurrent(item)

//     let db = await dbPromise
//     const tx = db.transaction(this.storeName, 'readwrite')
//     const store = await tx.objectStore(this.storeName)

//     await store.delete(id)
//     await tx.done
//     await this.getList()
//     return item
//   }

//   setCurrent(item) {
//     return this.curItem = item && item.id ? item : this.curItem
//   }
//   async getCurrent() {
//     if (this.curItem) return this.curItem
//     let list = await this.getList()
//     this.curItem = list && list[0] ? list[0] : this.curItem
//     return this.curItem
//   }

//   async getCursor(direction) {
//     let db = await dbPromise
//     let tx = db.transaction(this.storeName)
//     let store = tx.objectStore(this.storeName)
//     let indexForget = store.index('forgetNum')
//     let keyRangeValue = IDBKeyRange.lowerBound(0)
//     return await indexForget.openCursor(keyRangeValue, direction)
//   }
//   getNextToCurrent() {
//     let item = this.getNext()
//     return this.setCurrent(item)
//   }
//   getPrevToCurrent() {
//     let item = this.getPrev()
//     return this.setCurrent(item)
//   }
//   getNext() {
//     let i = this.list.findIndex(n => n.id === this.curItem.id)
//     let r = this.list[i + 1]
//     return r
//   }
//   getPrev() {
//     let i = this.list.findIndex(n => n.id === this.curItem.id)
//     let r = this.list[i - 1]
//     return r
//   }
// }
