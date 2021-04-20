import Vue from 'vue'
import axios from 'axios'
import {VueAxios} from './axios'
import {Notification, Message} from "element-ui";
import store from '@/store'
import {getToken} from './auth'
import router from '../router'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://47.118.57.5:8082' : 'http://localhost:8082',
  withCredentials: true
});
console.log(process.env.NODE_ENV);
const err = (error) => {
  if (error.response) {
    const data = error.response.data;
    const token = Vue.ls.get('ACCESS_TOKEN');
    if (error.response.status === 403) {
      Notification.error('Forbidden');
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      Notification.error('Unauthorized');
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
};
service.interceptors.request.use((config) => {
  return {
    ...config,
    url: `${config.url}`,
  }
}, err);

service.interceptors.response.use((response) => {
  // console.log(response)
  switch (response.status) {
    case 200:
      if (response.data.res === "success") {
        return response.data
      }
      Message.error(response.data.msg);
      break;
    case 404:
      return false;
    default:
      Message.error(response.data.msg)
  }
});

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service)
  }
};

export {
  installer as VueAxios,
  service as axios
};
