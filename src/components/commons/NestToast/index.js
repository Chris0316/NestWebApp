import Vue from 'vue';
import NestToast from './NestToast';

const ToastConstructor = Vue.extend(NestToast);
let instance;

let showToast = (type, message, options = {}) => {
  options.type = type;
  options.visible = true;
  options.message = message.toString();
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
  info(message, options) {
    showToast('info', message, options);
  },
  loading(options) {
    showToast('loading', '', options);
  },
  success(message, options) {
    showToast('success', message, options);
  },
  fail(message, options) {
    showToast('fail', message, options);
  },
  hide() {
    if (instance) {
      instance.close();
      instance = null;
    }
  }
};

export default Toast;
