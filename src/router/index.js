import Vue from 'vue'
import Router from 'vue-router'
import ChartEdit from "../components/ChartEdit";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ChartEdit',
      name: '图谱编辑',
      component: ChartEdit
    },
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'homePage',
      component: () => import('@/views/home')
    },
  ]
})
