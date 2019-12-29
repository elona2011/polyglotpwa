import { openDB } from "idb"

const dbName = 'mydb'
const storeName_mp3 = 'mp3'
const storeName_words = 'words'
const version = 1

export const addWord = word => addValue(storeName_words, word)
export const addMp3 = mp3 => addValue(storeName_mp3, mp3)
export const delMp3ById = id => delById(storeName_mp3, id)
export const delWordById = id => delById(storeName_words, id)
export const getMp3ById = id => getById(storeName_mp3, id)
export const getWordById = id => getById(storeName_words, id)
export const getListMp3 = () => getList(storeName_mp3)
export const getListWord = () => getList(storeName_words)
export const getListWordByForget = async () => {
  let db = await dbPromise
  let index = await db.transaction(storeName_words).objectStore(storeName_words).index('forget')
  return await index.getAll()
}

export const getStore = async storeName => {
  let db = await dbPromise
  return db.transaction(storeName).objectStore(storeName)
}

export let dbPromise = openMyDB()

function openMyDB() {
  return openDB(dbName, version, {
    upgrade(db, oldVer, newVer, transaction) {
      db.createObjectStore(storeName_mp3, { keyPath: 'id', autoIncrement: true })
      let objectStore = db.createObjectStore(storeName_words, { keyPath: 'id', autoIncrement: true })
      objectStore.createIndex("forget", "forget", { unique: false })
      objectStore.createIndex("remember", "remember", { unique: false })

    }
  })
}

const getById = async (storeName, id) => {
  let db = await dbPromise
  let item = await db.transaction(storeName).objectStore(storeName).get(id)
  return item
}

const addValue = async (storeName, val) => {
  let db = await dbPromise
  const tx = db.transaction(storeName, 'readwrite')
  const store = await tx.objectStore(storeName)
  await store.put(val)
  await tx.done
}

const delById = async (storeName, id) => {
  let db = await dbPromise
  const tx = db.transaction(storeName, 'readwrite')
  const store = await tx.objectStore(storeName)

  await store.delete(id)
  await tx.done
}

const getList = async (storeName) => {
  let db = await dbPromise
  let list = await db.transaction(storeName).objectStore(storeName).getAll()
  return list
}
