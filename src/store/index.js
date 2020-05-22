import Vue from 'vue';
import Vuex from 'vuex';
import charsSetJson from '@/assets/chars-set.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    charsSet: charsSetJson,
    currentChar: {},
  },
  getters: {
    selectedSet(state) {
      return state.charsSet.filter((_char) => _char.selected);
    },
    shuffledSet(state, getters) {
      return getters.selectedSet
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
    },
  },
  mutations: {
    setCurrentChar(state, letter) {
      state.currentChar = letter;
      console.log('setCurrentChar', letter, state.currentChar);
    },
    // sample est un tableau genre ['a','f','b'] contenant au moins une lettre
    selectSample(state, sample) {
      const options = { sample };
      if (options.sample.length > 0) {
        state.charsSet.forEach((setChar) => {
          const currentChar = setChar;
          const finding = options.sample.some((sampleChar) => currentChar.letter === sampleChar);
          console.log('selectSample.finding', finding);
          currentChar.selected = finding;
        });
      }
      console.log('selectSample', options, state.charsSet);
    },
    toggleCharSelection(state, upChar) {
      const currentChar = state.charsSet.find((char) => char.letter === upChar);
      currentChar.selected = !currentChar.selected;
      console.log('toggleCharSelection', upChar);
    },
    toggleCharsSet(state, forced) {
      state.charsSet.forEach((char) => {
        const charToToggle = char;
        const toggleDir = (forced === undefined) ? !charToToggle.selected : forced;
        charToToggle.selected = toggleDir;
      });
      console.log('resetCharsSelection', state.charsSet);
    },
  },
});
