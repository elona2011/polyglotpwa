import { openDB } from "idb"
import upgrade from "./upgrade";
import { dbName, storeName_config, storeName_mp3, storeName_words, storeName_words_1, storeName_cnWords, storeName_enWords, storeName_enDadWords, storeName_todo, version } from "./config";

export const dbSetConfig = config => {
  config.id = 1
  addValue(storeName_config, config)
}
export const dbGetConfig = async () => {
  let config = await getById(storeName_config, 1)
  return config
}
export const addWord = word => addValue(storeName_words, word)
export const addMp3 = async mp3 => await addValue(storeName_mp3, mp3)
export const getListWordByForget = async () => {
  let db = await openMyDB()
  let index = await db.transaction(storeName_words).objectStore(storeName_words).index('forget')
  return await index.getAll()
}

export const getStore = async storeName => {
  let db = await openMyDB()
  return db.transaction(storeName).objectStore(storeName)
}

export const openMyDB = async function () {
  return await openDB(dbName, version, {
    upgrade
  })
}

const getById = async (storeName, id) => {
  let db = await openMyDB()
  let item = await db.transaction(storeName).objectStore(storeName).get(id)
  return item
}

const addValue = async (storeName, val) => {
  let db = await openMyDB()
  const tx = db.transaction(storeName, 'readwrite')
  const store = await tx.objectStore(storeName)
  await store.put(val)
  await tx.done
}

const delById = async (storeName, id) => {
  let db = await openMyDB()
  const tx = db.transaction(storeName, 'readwrite')
  const store = await tx.objectStore(storeName)

  await store.delete(id)
  await tx.done
}

// const getList = async (storeName) => {
//   let db = await openMyDB()
//   let list = await db.transaction(storeName).objectStore(storeName).getAll()
//   return list
// }

export const getList = async function (storeName, direction, indexName) {
  let cursor = await getCursor(storeName, direction, indexName)
  let list = []
  while (cursor) {
    list.push(cursor.value)
    cursor = await cursor.continue();
  }
  return list
}

const getCursor = async function (storeName, direction, indexName) {
  let db = await openMyDB()
  let tx = db.transaction(storeName)
  let store = tx.objectStore(storeName)
  let keyRangeValue = IDBKeyRange.lowerBound(0)
  if (indexName) {
    let indexForget = store.index(indexName)
    return await indexForget.openCursor(keyRangeValue, direction)
  } else {
    return await store.openCursor(keyRangeValue, direction)
  }
}