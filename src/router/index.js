import Vue from 'vue'
import Router from 'vue-router'

import module from './module'
import article from './article'
import house from './house'
import follow from './follow'
import want from './want'
import my from './my'
import auth from './auth'
import user from './user'

Vue.use(Router)

let routes = [
  { path: '/', redirect: { name: 'Explore' } },
].concat(module, article, house, follow, want, my, auth, user);

export default new Router({
  mode: 'history',
  routes: routes
})


