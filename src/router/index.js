import Vue from 'vue'
import Router from 'vue-router'

import explore from './explore'
import follow from './follow'
import live from './live'
import my from './my'
import auth from './auth'

import Search from '@/views/Search'
import Map from '@/views/Map'
import Cellphone from '@/views/Cellphone'
import AddCellphone from '@/views/AddCellphone'

Vue.use(Router)

let routes = [
  { path: '/', redirect: { name: 'Explore' } },
  { path: '/search/:type', name: 'Search', component: Search, meta: { slideLevel: 1 } },
  { path: '/map', name: 'Map', component: Map, meta: { slideLevel: 1 } },
  { path: '/cellphone', name: 'Cellphone', component: Cellphone, meta: { slideLevel: 1 } },
  { path: '/cellphone/add', name: 'AddCellphone', component: AddCellphone, meta: { slideLevel: 1 } }
].concat(explore, follow, live, my, auth);

export default new Router({
  routes: routes
})


