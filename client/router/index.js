import Vue from 'vue'
import Router from 'vue-router'
import Players from '../views/Players'
import Hostname from '../views/Hostname'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Players
    },
    {
      path: '/hostname',
      component: Hostname
    }
  ]
})
