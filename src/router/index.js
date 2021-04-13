import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const routes = [
  {
    path: '/ChartEdit',
    name: '图谱编辑',
    meta: { title: 'OwO图谱编辑' },
    component: () => import('@/views/ChartEdit')
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'homePage',
    meta: { title: '首页' },
    component: () => import('@/views/home')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { title: 'OwO注册' },
    component: () => import('@/views/register')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: 'OwO登录' },
    component: () => import('@/views/login')
  },
  {
    path: '/myChart',
    name: '我的知识图谱',
    meta: { title: '我的知识图谱' },
    component: () => import('@/views/myChart')
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
