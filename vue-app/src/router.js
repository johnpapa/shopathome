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
