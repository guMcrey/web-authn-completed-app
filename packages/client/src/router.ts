import {createRouter, createWebHistory} from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Product',
      component: () =>
        import(/* webpackChunkName: "product" */ '@/views/Product.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () =>
        import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    },
    {
      path: '/home',
      name: 'Home',
      component: () =>
        import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
    },
    {path: '/:catchAll(.*)', redirect: '/404'},
  ],
})
