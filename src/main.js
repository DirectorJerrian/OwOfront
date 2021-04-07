import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'ant-design-vue/dist/antd.css'
import * as echarts from 'echarts'
import moment from 'moment'
import store from './store'
import '@/permission'

Vue.config.productionTip = false;
Vue.prototype.$moment = moment;
Vue.prototype.$echarts = echarts;

const options = {
  namespace: 'pro__',
  name: 'ls',
  storage: 'local'
};
Vue.use(Antd);
Vue.use(ElementUI);
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
});
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  render: h => h(App),
  template: '<App/>'
}).$mount('#app');
