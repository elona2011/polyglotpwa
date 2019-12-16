import { openDB } from "idb"

const dbName = 'mydb'
const storeName = 'mp3'
const version = 1

function upgrade(db, oldVer, newVer, transaction) {
  const store = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })
}

const addMp3 = async file => {
  const db = await openDB(dbName, version, {
    upgrade
  })
  const tx = db.transaction(storeName, 'readwrite')
  const store = await tx.objectStore(storeName)

  const val = file
  const value = await store.put(val)
  await tx.done
}

const delMp3 = async id => {
  const db = await openDB(dbName, version, {
    upgrade
  })
  const tx = db.transaction(storeName, 'readwrite')
  const store = await tx.objectStore(storeName)

  const value = await store.delete(id)
  await tx.done
}

const getList = async () => {
  const db = await openDB(dbName, version, {
    upgrade
  })
  let list = await db.transaction(storeName).objectStore(storeName).getAll()
  return list
}

export { addMp3, getList, delMp3 }