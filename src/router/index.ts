import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import CategoriesList from '../views/TheMainPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'categoriesList',
    component: CategoriesList
  },
  {
    path: '/category/:id',
    name: 'subcategoriesList',
    component: () => import('../views/TheСategoryPage.vue')
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import('../views/TheProductPage.vue')
  },
  {
    path: '/cart',
    name: 'shoppingCart',
    component: () => import('../views/TheCartPage.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
