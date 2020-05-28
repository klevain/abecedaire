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
    currentChar(state) {
      return state.charsSet.find((_char) => _char.current);
    },
  },
  mutations: {
    setCurrentChar(state, char) {
      const currentedCharsSet = state.charsSet.map((_char) => {
        const setchar = _char;
        setchar.current = setchar.letter === char.letter;
        return setchar;
      });
      state.currentChar = char;
      state.charsSet = currentedCharsSet;
      console.log('store.setCurrentChar', state.currentChar.letter);
    },
    // sample est un tableau genre ['a','f','b'] contenant au moins une lettre
    selectSample(state, sample) {
      const options = { sample };
      if (options.sample.length > 0) {
        state.charsSet.forEach((setChar) => {
          const currentChar = setChar;
          const finding = options.sample.some((sampleChar) => currentChar.letter === sampleChar);
          currentChar.selected = finding;
        });
      }
      console.log('store.selectSample', options.sample);
    },
    toggleCharSelection(state, upChar) {
      const currentChar = state.charsSet.find((char) => char.letter === upChar);
      currentChar.selected = !currentChar.selected;
      console.log('store.toggleCharSelection', upChar);
    },
    toggleCharsSet(state, forced) {
      state.charsSet.forEach((char) => {
        const charToToggle = char;
        const toggleDir = (forced === undefined) ? !charToToggle.selected : forced;
        charToToggle.selected = toggleDir;
      });
      console.log('store.toggleCharsSet', forced);
    },
  },
});
