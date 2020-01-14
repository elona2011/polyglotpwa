import { storeName_cnWords } from "./services/db/config";

export const getPageConfig = pageName => {
  return {
    [storeName_cnWords]: {
      title: '语文',
      storeName: storeName_cnWords,
      // layout: 'block'
      layout: 'inline'
    }
  }[pageName]
}