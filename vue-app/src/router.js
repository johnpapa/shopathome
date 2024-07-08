// import Vue from 'vue';
// import Router from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import PageNotFound from './components/page-not-found.vue';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/products',
    name: 'products',
    component: () =>
      import(
        /* webpackChunkName: "products" */ './views/products/products.vue'
      ),
  },
  {
    path: '/discounts',
    name: 'discounts',
    component: () =>
      import(/* webpackChunkName: "discount" */ './views/discounts.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ './views/home.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

// import PageNotFound from './components/page-not-found.vue';

// Vue.use(Router);

// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/',
//       redirect: '/home',
//     },
//     {
//       path: '/products',
//       name: 'products',
//       component: () =>
//         import(
//           /* webpackChunkName: "products" */ './views/products/products.vue'
//         ),
//     },
//     {
//       path: '/discounts',
//       name: 'discounts',
//       component: () =>
//         import(/* webpackChunkName: "discount" */ './views/discounts.vue'),
//     },
//     {
//       path: '/home',
//       name: 'home',
//       // route level code-splitting
//       // this generates a separate chunk (home.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () =>
//         import(/* webpackChunkName: "home" */ './views/home.vue'),
//     },
//     {
//       path: '*',
//       component: PageNotFound,
//     },
//   ],
// });
