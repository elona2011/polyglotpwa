import { dbName, storeNames, version } from "./config";

export default async function (db, oldVer, newVer, transaction) {
  if (oldVer == 0 && newVer == version) {
    storeNames.forEach(n => {
      db.createObjectStore(n, { keyPath: 'id', autoIncrement: true })
    })
  } 
}