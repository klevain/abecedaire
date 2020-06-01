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
    setCurrentChar(state, charID) {
      const currentedCharsSet = state.charsSet.map((_char) => {
        const setchar = _char;
        setchar.current = setchar.letter === charID;
        return setchar;
      });
      state.charsSet = currentedCharsSet;
      state.currentChar = currentedCharsSet.find((_char) => _char.current === true);
      console.log('store.setCurrentChar', state.currentChar.letter);
    },
    unsetCurrentChar(state) {
      state.charsSet.forEach((_char) => {
        const char = _char;
        char.current = false;
      });
      state.currentChar = {};
      console.log('store.unsetCurrentChar');
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
