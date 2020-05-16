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
    },
    applySample(state, sample) {
      // Si sample fait au moins un char
      if (sample.length > 0) {
        // Pour chaque char du sample
        const sampleFiltered = sample.filter((_sampleChar) => {
          // on check s'il appartient au set de base
          const isInCharsSet = (element) => element.letter === _sampleChar.toLowerCase();
          // on cherche s'il appartient au set de base
          const finding = state.charsSet.find(isInCharsSet);
          if (finding !== undefined) {
            // on edit la visibilité ici aussi
            finding.selected = true;
          }
          // on return s'il appartient au set de base
          return finding !== undefined;
        });
        console.log('sampleFiltered', sampleFiltered);
      } else {
        console.log('can\'t applySample : empty sample');
      }
      // const charsSubset = sample;
      // for (let i = 0; i < charsSubset.length; i += 1) {
      //   const upChar = charsSubset[i];
      //   // (array, item)
      //   const potentialIndex = state.charsSet.findIndex((_char) =>
      // _char.letter === upChar.letter);

      //   if (potentialIndex > -1) {
      //     state.charsSet[potentialIndex] = upChar;
      //   } else {
      //     // state.charsSet.push(item);
      //     console.log('Can\'t update charset : unknown letter');
      //   }
      // }
    },
    toggleCharSelection(state, upChar) {
      const letter = state.charsSet.find((_char) => _char.letter === upChar);
      letter.selected = !letter.selected;
      console.log('toggleCharSelection', upChar, letter.selected);
    },
    emptyCharsSelection(state) {
      state.charsSet.forEach((_char) => {
        const charToReset = _char;
        charToReset.selected = false;
      });
      console.log('emptyCharsSelection', state.charsSet);
    },
    resetCharsSelection(state) {
      state.charsSet.forEach((_char) => {
        const charToReset = _char;
        charToReset.selected = true;
      });
      console.log('resetCharsSelection', state.charsSet);
    },
  },
  actions: {
  },
  modules: {
  },
});
