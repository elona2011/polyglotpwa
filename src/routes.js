import Home from "./components/Home.vue";
import AudioList from "./components/AudioList.vue";
import AudioPlay from "./components/AudioPlay.vue";
import WordList from "./components/WordList.vue";
import WordAdd from "./components/WordAdd.vue";
import WordDetail from "./components/WordDetail.vue";

export default [
  {
    name: 'home',
    path: '/home',
    component: Home
  }, {
    name: 'listen',
    path: '/listen',
    component: AudioList
  }, {
    name: 'play',
    path: '/play/:id',
    component: AudioPlay
  }, {
    name: 'words',
    path: '/words',
    component: WordList
  }, {
    name: 'wordadd',
    path: '/wordadd',
    component: WordAdd
  }, {
    path: '/worddetail/:id',
    component: WordDetail
  }
]