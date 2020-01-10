import Home from "./components/Home.vue";
import AudioList from "./components/mp3/AudioList.vue";
import AudioPlay from "./components/mp3/AudioPlay.vue";
import EngWordList from "./pages/english/EngWordList.vue";
import EngWordAdd from "./pages/english/EngWordAdd.vue";
import EngWordDetail from "./pages/english/EngWordDetail.vue";
import EngDadList from "./pages/english/EngDadList.vue";
import EngDadAdd from "./pages/english/EngDadAdd.vue";
import EngDadDetail from "./pages/english/EngDadDetail.vue";
import ChnChar2List from "./pages/chnChar/ChnChar2List.vue";
import ChnAdd from "./pages/chnChar/ChnAdd.vue";
import ChnChar2Detail from "./pages/chnChar/ChnChar2Detail.vue";
import CnWordsList from "./pages/chnChar/CnWordsList.vue";
import CnWordsDetail from "./pages/chnChar/CnWordsDetail.vue";

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
    name: 'ChnChar2List',
    path: '/ChnChar2List',
    component: ChnChar2List
  }, {
    name: 'ChnAdd',
    path: '/ChnAdd/:store',
    component: ChnAdd
  }, {
    path: '/ChnChar2Detail',
    component: ChnChar2Detail
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
  }
]