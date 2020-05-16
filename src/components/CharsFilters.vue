<template>
  <div class="charsfilters">
    <div>
      <label for="reset">
        Réinitialiser les filtres
      </label>
      <button
        name="reset"
        id="reset"
        class="favorite styled"
        type="button"
        @click="resetFilters"
      >
        Selectionner tout
      </button>
      <button
        name="reset"
        id="reset"
        class="favorite styled"
        type="button"
        @click="emptySelection"
      >
        Ne rien selectionner
      </button>
    </div>
    <div>
      <label for="sample">
        Choisir par ensembles de lettres
      </label>
      <input
        type="text"
        name="sample"
        id="sample"
        v-model="sample"
        @input="sampleUpdate"
      >
      <div>{{ sampleHash }}</div>
    </div>
    <div>
      <label for="letter">
        Choisir par lettres
      </label>
      <div
        name="letter"
        id="letter"
        v-for="char in charsSet"
        v-bind:key="char.letter"
        class="chargrid_cell"
      >
        <label v-bind:for="char.letter">
          {{ char.letter }}
        </label>
        <input
          type="checkbox"
          v-bind:id="char.letter"
          v-model="char.selected"
          @input="toggleCharSelection"
        >
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CharsFilters',
  data() {
    return {
      sample: '',
    };
  },
  computed: {
    charsSet() {
      return this.$store.state.charsSet;
    },
    sampleHash() {
      const selectedLettersMap = this.$store.getters.selectedSet.map((_char) => _char.letter);
      return selectedLettersMap.join(', ');
    },
  },
  methods: {

    sampleUpdate(event) {
      // Send a set of letters as sample to filter
      console.log('sampleUpdate', event);
      this.$store.commit('applySample', event.target.value.split(''));
    },
    toggleCharSelection(event) {
      // Send a letter id to toggle select attr
      this.$store.commit('toggleCharSelection', event.target.id);
    },
    resetFilters() {
      // Reset Charslist
      this.$store.commit('resetCharsSelection');
    },
    emptySelection() {
      // Reset Charslist
      this.$store.commit('emptyCharsSelection');
    },
  },
};
</script>


<style lang="scss">
 .charsfilters {
  position: fixed;
  top: 0;
  right: 0;
  width: 20rem;
 }
</style>
