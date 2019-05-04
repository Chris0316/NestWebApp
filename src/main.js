// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import components from './components'
import App from './App'
import router from './router'
import './libs/remadaptor'
import filters from './utils/Filters'
import VueCookie from 'vue-cookie';
import Storage from './utils/Storage';
// import HistoryCache from './utils/HistoryCache';

import 'swiper/dist/css/swiper.min.css'
Vue.use(components)
Vue.use(VueCookie)

Vue.config.productionTip = false

// router.beforeEach(HistoryCache);

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
});

router.beforeEach((to, from, next) => {
  // 设置登录token
  let accessToken = Vue.prototype.$cookie.get('nest_access_token');
  // 设置个人信息是否完善状态
  let completeProfile = Vue.prototype.$cookie.get('nest_complete_profile');
  // 跳转登录
  if (to.meta.requireAuth && (!accessToken || accessToken.length === 0)) {
    next({
      name: 'AuthLogin'
    });
  }
  // 跳转完善个人信息页面
  if (completeProfile) {
    if (to.name !== 'AuthLogin')
      Vue.prototype.$toast.info('请完善用户基本信息');
    next({
      name: 'AuthBaseInfo1'
    });
  }
  next();
});

if (window.app.safe_top_height) {
  document.body.style.paddingTop = window.app.safe_top_height + 'px';
  document.body.style.paddingBottom = window.app.safe_bottom_height + 'px';
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
