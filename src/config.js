import { storeName_enSentences, storeName_kidTodo, storeName_cnWords, storeName_words_2, storeName_words_1, storeName_todo, storeName_enWords, storeName_enDadWords } from "./services/db/config";

export const getPageConfig = pageName => {
  return {
    [storeName_cnWords]: {
      title: '语文',
      storeName: storeName_cnWords,
      layout: 'inline'
    },
    [storeName_words_2]: {
      title: '二类字',
      storeName: storeName_words_2,
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
      layout: 'checkbox'
    },
    [storeName_kidTodo]: {
      title: 'kidTodo',
      storeName: storeName_kidTodo,
      layout: 'checkbox'
    },
    [storeName_enWords]: {
      title: 'eng',
      storeName: storeName_enWords,
      layout: 'inline'
    },
    [storeName_enSentences]: {
      title: 'enSentences',
      storeName: storeName_enSentences,
      layout: 'inline'
    },
    [storeName_enDadWords]: {
      title: 'dadEng',
      storeName: storeName_enDadWords,
      layout: 'inline',
      fontSize: '10vh'
    }
  }[pageName]
}