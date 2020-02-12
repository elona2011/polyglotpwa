import { openDB } from "idb"
import upgrade from "./upgrade";
import { dbName, storeName_config, version } from "./config";

export const dbSetConfig = config => {
  config.id = 1
  addValue(storeName_config, config)
}
export const dbGetConfig = async () => {
  let config = await getById(storeName_config, 1)
  return config
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

export const addValue = async (storeName, val) => {
  let db = await openMyDB()
  const tx = db.transaction(storeName, 'readwrite')
  const store = await tx.objectStore(storeName)
  await store.put(val)
  await tx.done
}

export const delById = async (storeName, id) => {
  let db = await openMyDB()
  const tx = db.transaction(storeName, 'readwrite')
  const store = await tx.objectStore(storeName)

  await store.delete(id)
  await tx.done
}

export const getList = async (storeName) => {
  let db = await openMyDB()
  let list = await db.transaction(storeName).objectStore(storeName).getAll()
  return list
}
export const setList = async (storeName)=>{
  
}

// export const getList = async function (storeName, direction, indexName) {
//   let cursor = await getCursor(storeName, direction, indexName)
//   let list = []
//   while (cursor) {
//     list.push(cursor.value)
//     cursor = await cursor.continue();
//   }
//   return list
// }

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