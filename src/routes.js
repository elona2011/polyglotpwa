import Home from "./components/Home.vue";
import AudioList from "./components/AudioList.vue";
import AudioPlay from "./components/AudioPlay.vue";
import EngWordList from "./components/english/EngWordList.vue";
import EngWordAdd from "./components/english/EngWordAdd.vue";
import EngWordDetail from "./components/english/EngWordDetail.vue";
import ChnCharList from "./components/chnChar/ChnCharList.vue";
import ChnCharAdd from "./components/chnChar/ChnCharAdd.vue";
import ChnCharDetail from "./components/chnChar/ChnCharDetail.vue";
import ListCnWords from "./components/chnChar/ListCnWords.vue";

export default [
  {
    name: 'home',
    path: '/',
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
    name: 'ChnCharList',
    path: '/ChnCharList',
    component: ChnCharList
  }, {
    name: 'ChnCharAdd',
    path: '/ChnCharAdd',
    component: ChnCharAdd
  }, {
    path: '/ChnCharDetail',
    component: ChnCharDetail
  },{
    name: 'ListCnWords',
    path: '/ListCnWords',
    component: ListCnWords
  }, {
    name: 'EngWordList',
    path: '/EngWordList',
    component: EngWordList
  }, {
    name: 'EngWordAdd',
    path: '/EngWordAdd',
    component: EngWordAdd
  }, {
    path: '/EngWordDetail/:id',
    component: EngWordDetail
  }
]