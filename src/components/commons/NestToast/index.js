import Vue from 'vue';
import NestToast from './NestToast';

const ToastConstructor = Vue.extend(NestToast);
let instance;

let showToast = (type, options = {}) => {
  options.type = type;
  options.visible = true;
  instance = instance || new ToastConstructor({
    propsData: options
  }).$mount(document.createElement('div'));
  document.body.appendChild(instance.$el);

  // toast实例销毁
  instance.$on('close', () => {
    instance = null;
  });
};

const Toast = {
  info(options) {
    showToast('info', options);
  },
  loading(options) {
    showToast('loading', options);
  },
  hide() {
    if (instance) {
      instance.close();
      instance = null;
    }
  }
};

export default Toast;
