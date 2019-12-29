import Home from "./components/Home.vue";
import AudioList from "./components/AudioList.vue";
import AudioPlay from "./components/AudioPlay.vue";
import EngWordList from "./components/EngWordList.vue";
import EngWordAdd from "./components/EngWordAdd.vue";
import EngWordDetail from "./components/EngWordDetail.vue";
import ChnCharList from "./components/ChnCharList.vue";
import ChnCharAdd from "./components/ChnCharAdd.vue";
import ChnCharDetail from "./components/ChnCharDetail.vue";

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
    path: '/ChnCharDetail/:id',
    component: ChnCharDetail
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