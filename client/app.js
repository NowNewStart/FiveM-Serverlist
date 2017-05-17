import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'

Vue.config.devtools = true

require('bulma')

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})


export { app, router, store }
