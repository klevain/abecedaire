import Vue from 'vue';
import Vuex from 'vuex';
import charsSetJson from '@/assets/chars-set.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    charsSet: charsSetJson,
    currentChar: {},
  },
  mutations: {
    setCurrentChar(state, letter) {
      state.currentChar = letter;
    },
  },
  actions: {
  },
  modules: {
  },
});
