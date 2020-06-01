import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Store from '../store/index';

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
    beforeEnter: (to, from, next) => {
      console.log('router.beforeEnter.unsetCurrentChar');
      Store.commit('unsetCurrentChar');
      next();
    },
  },
  {
    path: '/lettres/:char',
    name: 'Lettre',
    component: () => import(/* webpackChunkName: "letters" */ '../views/Letters.vue'),
    beforeEnter: (to, from, next) => {
      console.log('router.beforeEnter.setCurrentChar', to.params.char);
      Store.commit('setCurrentChar', to.params.char);
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
