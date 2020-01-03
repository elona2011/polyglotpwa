import Home from "./components/Home.vue";
import AudioList from "./components/mp3/AudioList.vue";
import AudioPlay from "./components/mp3/AudioPlay.vue";
import EngWordList from "./components/english/EngWordList.vue";
import EngWordAdd from "./components/english/EngWordAdd.vue";
import EngWordDetail from "./components/english/EngWordDetail.vue";
import ChnCharList from "./components/chnChar/ChnCharList.vue";
import ChnAdd from "./components/chnChar/ChnAdd.vue";
import ChnCharDetail from "./components/chnChar/ChnCharDetail.vue";
import CnWordsList from "./components/chnChar/CnWordsList.vue";
import CnWordsDetail from "./components/chnChar/CnWordsDetail.vue";

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
    path: '/play/:index',
    component: AudioPlay
  }, {
    name: 'ChnCharList',
    path: '/ChnCharList',
    component: ChnCharList
  }, {
    name: 'ChnAdd',
    path: '/ChnAdd/:store',
    component: ChnAdd
  }, {
    path: '/ChnCharDetail',
    component: ChnCharDetail
  },{
    name: 'CnWordsList',
    path: '/CnWordsList',
    component: CnWordsList
  },{
    name: 'CnWordsDetail',
    path: '/CnWordsDetail',
    component: CnWordsDetail
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