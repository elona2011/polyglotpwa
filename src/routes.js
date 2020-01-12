import Home from "./pages/Home.vue";
import AudioList from "./pages/AudioList.vue";
import AudioPlay from "./pages/AudioPlay.vue";
import EngWordList from "./pages/english/EngWordList.vue";
import EngWordAdd from "./pages/english/EngWordAdd.vue";
import EngWordDetail from "./pages/english/EngWordDetail.vue";
import EngDadList from "./pages/english/EngDadList.vue";
import EngDadAdd from "./pages/english/EngDadAdd.vue";
import EngDadDetail from "./pages/english/EngDadDetail.vue";
import ChnCharList from "./pages/chnChar/ChnCharList.vue";
import ChnAdd from "./pages/chnChar/ChnAdd.vue";
import ChnCharDetail from "./pages/chnChar/ChnCharDetail.vue";
import CnWordsList from "./pages/chnChar/CnWordsList.vue";
import CnWordsDetail from "./pages/chnChar/CnWordsDetail.vue";
import TodoList from "./pages/TodoList.vue";
import Login from "./pages/Login.vue";

export default [
  {
    name: 'Login',
    path: '/Login',
    component: Login
  }, {
    name: 'home',
    path: '/',
    component: Home
  }, {
    name: 'listen',
    path: '/listen',
    component: AudioList
  }, {
    name: 'play',
    path: '/play',
    component: AudioPlay
  }, {
    name: 'ChnCharList',
    path: '/ChnCharList/:type',
    component: ChnCharList
  }, {
    name: 'ChnAdd',
    path: '/ChnAdd/:store',
    component: ChnAdd
  }, {
    path: '/ChnCharDetail',
    component: ChnCharDetail
  }, {
    name: 'CnWordsList',
    path: '/CnWordsList',
    component: CnWordsList
  }, {
    name: 'CnWordsDetail',
    path: '/CnWordsDetail',
    component: CnWordsDetail
  }, {
    name: 'EngWordList',
    path: '/EngWordList',
    component: EngWordList
  }, {
    name: 'EngWordAdd',
    path: '/EngWordAdd/:store',
    component: EngWordAdd
  }, {
    path: '/EngWordDetail',
    component: EngWordDetail
  }, {
    name: 'EngDadList',
    path: '/EngDadList',
    component: EngDadList
  }, {
    name: 'EngDadAdd',
    path: '/EngDadAdd/:store',
    component: EngDadAdd
  }, {
    path: '/EngDadDetail',
    component: EngDadDetail
  }, {
    name: 'TodoList',
    path: '/TodoList',
    component: TodoList
  }
]