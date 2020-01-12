import { dbName, storeName_config, storeName_mp3, storeName_words, storeName_words_1,storeName_cnWords, storeName_enWords, storeName_enDadWords, storeName_todo, version } from "./config";

export default async function (db, oldVer, newVer, transaction) {
  if (oldVer == 0 && newVer == version) {
    db.createObjectStore(storeName_config, { keyPath: 'id', autoIncrement: true })
    db.createObjectStore(storeName_mp3, { keyPath: 'id', autoIncrement: true })
    db.createObjectStore(storeName_words, { keyPath: 'id', autoIncrement: true })
    db.createObjectStore(storeName_words_1, { keyPath: 'id', autoIncrement: true })
    db.createObjectStore(storeName_cnWords, { keyPath: 'id', autoIncrement: true })
    db.createObjectStore(storeName_enWords, { keyPath: 'id', autoIncrement: true })
    db.createObjectStore(storeName_enDadWords, { keyPath: 'id', autoIncrement: true })
    db.createObjectStore(storeName_todo, { keyPath: 'id', autoIncrement: true })

    transaction.objectStore(storeName_todo).createIndex("forgetNum", "forgetNum", { unique: false })
    transaction.objectStore(storeName_words).createIndex("forgetNum", "forgetNum", { unique: false })
    transaction.objectStore(storeName_words_1).createIndex("forgetNum", "forgetNum", { unique: false })
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
      case 7:
        {
          db.createObjectStore(storeName_todo, { keyPath: 'id', autoIncrement: true })
          db.createObjectStore(storeName_words_1, { keyPath: 'id', autoIncrement: true })
          transaction.objectStore(storeName_todo).createIndex("forgetNum", "forgetNum", { unique: false })
          transaction.objectStore(storeName_words_1).createIndex("forgetNum", "forgetNum", { unique: false })
        }
        break
    }
  }
}