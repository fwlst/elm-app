import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import axios from 'axios'


import goods from  'components/goods/goods.vue'
import ratings from 'components/ratings/ratings.vue'
import seller from 'components/seller/seller.vue'

import 'common/css/index.less'

Vue.use(VueRouter)
Vue.prototype.$http = axios

let app = Vue.extend(App);

let router = new VueRouter({
  linkActiveClass: 'active'
});

router.map({
  '/goods':{
    component: goods
  },
  '/ratings':{
    component: ratings
  },
  '/seller':{
    component: seller
  }
})

router.start(app, '#app')
router.go('/goods')
