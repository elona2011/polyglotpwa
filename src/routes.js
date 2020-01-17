import Home from "./pages/Home.vue";
import AudioList from "./pages/AudioList.vue";
import AudioPlay from "./pages/AudioPlay.vue";
import Login from "./pages/Login.vue";
import ListPage from "./pages/ListPage.vue";
import ListAddPage from "./pages/ListAddPage.vue";
import ListEditPage from "./pages/ListEditPage.vue";
import ListDetailPage from "./pages/ListDetailPage.vue";

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
    name: 'list',
    path: '/list/:storeName',
    component: ListPage
  }, {
    name: 'listadd',
    path: '/listadd/:storeName',
    component: ListAddPage
  }, {
    name: 'listedit',
    path: '/listedit/:storeName',
    component: ListEditPage
  }, {
    name: 'listdetail',
    path: '/listdetail/:storeName',
    component: ListDetailPage
  }, {
    name: 'listen',
    path: '/listen',
    component: AudioList
  }, {
    name: 'play',
    path: '/play/:storeName',
    component: AudioPlay
  }
]