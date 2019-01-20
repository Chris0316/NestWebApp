// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import components from './components'
import App from './App'
import router from './router'
import './libs/remadaptor'
import filters from './utils/Filters'
// import HistoryCache from './utils/HistoryCache';

Vue.use(components)
Vue.use(require('vue-cookies'))

Vue.config.productionTip = false

// router.beforeEach(HistoryCache);

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
