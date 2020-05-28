import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/lettres/',
    name: 'Lettres',
    component: () => import(/* webpackChunkName: "letters" */ '../views/Letters.vue'),
  },
  {
    path: '/lettres/:char',
    name: 'Lettre',
    component: () => import(/* webpackChunkName: "letters" */ '../views/Letters.vue'),
    beforeEnter: (to, from, next) => {
      console.log('router(/lettres/:char).beforeEnter');
      next();
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
