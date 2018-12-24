import Vue from 'vue';
import Storage from './Storage';

Vue.mixin({
  beforeRouteLeave(to, from, next) {
    const toRoute = to.path;
    const fromRoute = from.path;
    const h = JSON.parse(Storage.getSessionStorage(toRoute));
    if (h && h.history) {
      this.$destroy();
      next();
    } else {
      next();
    }
    next();
  }
});

export default (to, from, next) => {
  const toRoute = to.path;
  const fromRoute = from.path;
  let h = JSON.parse(Storage.getSessionStorage(toRoute));
  if (h && h.history) { // 后退操作 删除缓存
    h.history = false;
    Storage.removeSessionStorage(toRoute);
  } else { // 前进操作 缓存路径
    Storage.setSessionStorage(fromRoute || '/', JSON.stringify({
      history: true
    }));
  }
  next();
};

