import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ChartEdit',
      name: '图谱编辑',
      component: () => import('@/views/ChartEdit')
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
    {
      path: '/myChart',
      name: '我的知识图谱',
      component: () => import('@/views/myChart')
    }
  ]
})
