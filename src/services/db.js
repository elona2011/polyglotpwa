import { openDB } from "idb"

export const dbName = 'mydb'
export const storeName_config = 'config'
export const storeName_mp3 = 'mp3'
export const storeName_words = 'words' //二类字
export const storeName_cnWords = 'cnWords'
export const storeName_enWords = 'enWords'
export const storeName_enDadWords = 'enDadWords'
export const version = 6

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
export const delMp3ById = async id => await delById(storeName_mp3, id)
export const delWordById = id => delById(storeName_words, id)
export const getMp3ById = id => getById(storeName_mp3, id)
export const getWordById = id => getById(storeName_words, id)
export const getListMp3 = () => getList(storeName_mp3)
export const getListWord = () => getList(storeName_words)
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
    async upgrade(db, oldVer, newVer, transaction) {
      if (oldVer == 0 && newVer == version) {
        db.createObjectStore(storeName_config, { keyPath: 'id', autoIncrement: true })
        db.createObjectStore(storeName_mp3, { keyPath: 'id', autoIncrement: true })
        db.createObjectStore(storeName_words, { keyPath: 'id', autoIncrement: true })
        db.createObjectStore(storeName_cnWords, { keyPath: 'id', autoIncrement: true })
        db.createObjectStore(storeName_enWords, { keyPath: 'id', autoIncrement: true })
        db.createObjectStore(storeName_enDadWords, { keyPath: 'id', autoIncrement: true })

        transaction.objectStore(storeName_words).createIndex("forgetNum", "forgetNum", { unique: false })
        transaction.objectStore(storeName_cnWords).createIndex("forgetNum", "forgetNum", { unique: false })
        transaction.objectStore(storeName_enWords).createIndex("forgetNum", "forgetNum", { unique: false })
        transaction.objectStore(storeName_enDadWords).createIndex("forgetNum", "forgetNum", { unique: false })
      } else {
        switch (newVer) {
          case 1:
            {
              let store = transaction.objectStore(storeName_words)
              let keyRangeValue = IDBKeyRange.lowerBound(0)
              let cursor = await store.openCursor(keyRangeValue)
              while (cursor) {
                let item = cursor.value

                item.totalNum = item.forget + item.remember
                item.forgetNum = item.forget

                cursor.update(item)
                cursor = await cursor.continue();
              }
              transaction.objectStore(storeName_words).createIndex("forgetNum", "forgetNum", { unique: false })
              transaction.objectStore(storeName_words).deleteIndex('forget')
              transaction.objectStore(storeName_words).deleteIndex('remember')

              db.createObjectStore(storeName_cnWords, { keyPath: 'id', autoIncrement: true })
              transaction.objectStore(storeName_cnWords).createIndex("forgetNum", "forgetNum", { unique: false })
              let list = await transaction.objectStore(storeName_words).getAll()
              list.forEach(async n => {
                if (n.name.length > 1) {
                  // const tx = db.transaction(storeName_cnWords, 'readwrite')
                  const store = transaction.objectStore(storeName_cnWords)
                  await store.put(n)
                }
              })
            }
            break

          case 3:
            {
              let store = transaction.objectStore(storeName_words)
              let keyRangeValue = IDBKeyRange.lowerBound(0)
              let cursor = await store.openCursor(keyRangeValue)
              while (cursor) {
                let item = cursor.value

                if (item.name.length > 1) cursor.delete()

                cursor = await cursor.continue();
              }
            }
            break

          case 5:
            {
              db.createObjectStore(storeName_config, { keyPath: 'id', autoIncrement: true })
              db.createObjectStore(storeName_enWords, { keyPath: 'id', autoIncrement: true })
              transaction.objectStore(storeName_enWords).createIndex("forgetNum", "forgetNum", { unique: false })
            }
            break
          case 6:
            {
              db.createObjectStore(storeName_enDadWords, { keyPath: 'id', autoIncrement: true })
              transaction.objectStore(storeName_enDadWords).createIndex("forgetNum", "forgetNum", { unique: false })
            }
            break
        }
      }
    }
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

const getList = async (storeName) => {
  let db = await openMyDB()
  let list = await db.transaction(storeName).objectStore(storeName).getAll()
  return list
}
