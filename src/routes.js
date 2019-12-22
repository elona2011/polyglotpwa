import AudioList from "./components/AudioList.vue";
import AudioPlay from "./components/AudioPlay.vue";
import WordList from "./components/WordList.vue";
import WordAdd from "./components/WordAdd.vue";
import WordDetail from "./components/WordDetail.vue";

export default [
  {
    path: '/',
    component: AudioList
  }, {
    path: '/play/:id',
    component: AudioPlay
  }, {
    path: '/words',
    component: WordList
  }, {
    path: '/wordadd',
    component: WordAdd
  }, {
    path: '/worddetail/:id',
    component: WordDetail
  }
]