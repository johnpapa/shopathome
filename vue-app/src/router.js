import { createRouter, createWebHistory } from 'vue-router';
import PageNotFound from '@/components/page-not-found.vue';

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
    // route level code-splitting
    // this generates a separate chunk (home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ './views/home.vue'),
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFound },
];

const base = process.env.BASE_URL;

const router = createRouter({
  history: createWebHistory(base),
  routes,
});

export default router;
