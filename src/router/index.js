import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/ChartEdit',
    name: '图谱编辑',
    meta: {title: 'OwO图谱编辑'},
    component: resolve => require(['@/views/ChartEdit'], resolve)
  },
  {
    path: '/userInfo',
    name: '用户信息',
    component: resolve => require(['@/views/userInfo'], resolve)
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'homePage',
    meta: {title: '首页'},
    component: resolve => require(['@/views/home'], resolve)
  },
  {
    path: '/QAndAInstruction',
    name: '智能问答说明',
    meta: {title: '智能问答说明'},
    component: resolve => require(['@/views/QAndAInstruction'], resolve)
  },
  {
    path: '/platformInstruction',
    name: '平台使用说明',
    meta: {title: '平台使用说明'},
    component: resolve => require(['@/views/platformInstruction'], resolve)
  },

  {
    path: '/register',
    name: 'Register',
    meta: {title: 'OwO注册'},
    component: resolve => require(['@/views/register'], resolve)
  },
  {
    path: '/login',
    name: 'Login',
    meta: {title: 'OwO登录'},
    component: resolve => require(['@/views/login'], resolve)
  },
  {
    path: '/myChart',
    name: '我的知识图谱',
    meta: {title: '我的知识图谱'},
    component: resolve => require(['@/views/myChart'], resolve)
  }
];

const createRouter = () => new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes
});
const router = createRouter();

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
});

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher
}

export default router
