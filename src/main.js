import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import routes from "./routes";

Vue.config.productionTip = false
export const bus = new Vue()
Vue.use(VueRouter)

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  data: {
    currentRoute: window.location.pathname
  },
  router,
  render: h => h(App),
}).$mount('#app')
