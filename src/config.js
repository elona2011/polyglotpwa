import { storeName_cnWords, storeName_words, storeName_words_1, storeName_todo, storeName_enWords, storeName_enDadWords } from "./services/db/config";

export const getPageConfig = pageName => {
  return {
    [storeName_cnWords]: {
      title: '语文',
      storeName: storeName_cnWords,
      layout: 'inline'
    },
    [storeName_words]: {
      title: '二类字',
      storeName: storeName_words,
      layout: 'grid'
    },
    [storeName_words_1]: {
      title: '一类字',
      storeName: storeName_words_1,
      layout: 'grid'
    },
    [storeName_todo]: {
      title: 'todo',
      storeName: storeName_todo,
      layout: 'block'
    },
    [storeName_enWords]: {
      title: 'eng',
      storeName: storeName_enWords,
      layout: 'inline'
    },
    [storeName_enDadWords]: {
      title: 'eng',
      storeName: storeName_enDadWords,
      layout: 'inline',
      fontSize: '10vh'
    }
  }[pageName]
}