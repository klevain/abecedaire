import Vue from 'vue';
import VueAnime from 'vue-animejs';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueAnime);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
