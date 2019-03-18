import Vue from 'vue';
import axios from 'axios';
import Storage from './Storage';
import Router from '../router';

let instance = axios.create({
  baseURL: process.env.API_SERVER,
  timeout: 1000 * 10
});

instance.interceptors.request.use(
  config => {
    if (config.loading !== false)
      Vue.prototype.$toast.loading();
    let accessToken = Storage.getLocalStorage('nest_access_token');
    if (accessToken && accessToken.length !== 0) {
      config.headers['Authorization'] = 'Bearer ' + accessToken;
    }
    return config;
  },
  error => {
    Vue.prototype.$toast.hide();
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    Vue.prototype.$toast.hide();
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    return response.data;
  },
  error => {
    Vue.prototype.$toast.hide();
    if (error.response) {
      let resData = error.response.data;
      // errors = error.response.data.errors;
      if (error.response.status === 401) {
        /**
         *  未授权跳转到登录
         *  1. 清空localstorage accessToken
         *  2. 跳转登录页
         */
        let token = Storage.getLocalStorage('nest_access_token');
        if (token) {
          Storage.removeLocalStorage('nest_access_token');
          Vue.prototype.$toast.fail('登录超时，请重新登录');
        }
        Router.replace({name: 'AuthLogin'});
      } else if (error.response.status >= 300 || error.response.status < 200) {
        Vue.prototype.$toast.info(resData.message);
        return Promise.reject('error');
      } else {
        return error;
      }
    }
    return Promise.reject(error.response.data) //请求错误时，直接结束
  }
);

export default instance;
