import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts'
import moment from 'moment'
import store from './store'
import '@/permission'
import Axios from 'axios'
import Chat from 'vue-beautiful-chat'

Vue.config.productionTip = false;
Vue.prototype.$moment = moment;
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = Axios;

const options = {
  namespace: 'pro__',
  name: 'ls',
  storage: 'local'
};

Vue.use(ElementUI);
Vue.use(Chat);
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
});
new Vue({
  el: '#app',
  router,
  components: {App},
  store,
  render: h => h(App),
  template: '<App/>'
}).$mount('#app');
