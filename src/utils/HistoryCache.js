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
  if (h && h.history) {
    h.history = false;
    Storage.removeSessionStorage(toRoute);
  } else {
    Storage.setSessionStorage(fromRoute || '/', JSON.stringify({
      history: true
    }));
  }
  next();
};
