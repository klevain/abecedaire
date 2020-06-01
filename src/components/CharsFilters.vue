<template>
  <div class="charsfilters">
    <div class="mt-4 mb-1 border-bottom">
      <b-form-group>
        <b-form-checkbox-group
          id="checkbox-letters"
          v-model="checkboxModel"
          v-bind:options="checkboxOptions"
          name="checkbox-letters"
        ></b-form-checkbox-group>
      </b-form-group>
    </div>
    <div class="mt-4 mb-1">
      <b-button
        name="reset"
        id="reset"
        block
        variant="primary"
        @click="resetFilters"
      >
        Tout selectionner
      </b-button>
      <b-button
        name="reset"
        id="reset"
        block
        variant="primary"
        @click="emptySelection"
      >
        Ne rien selectionner
      </b-button>
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
    checkboxOptions() {
      const options = this.$store.state.charsSet.map((_char) => ({
        text: _char.letter,
        value: _char.letter,
      }));
      // console.log('checkboxOptions', options);
      return options;
    },
    checkboxModel: {
      get() {
        const model = this.$store.getters.selectedSet.map((_char) => _char.letter);
        // console.log('get checkboxModel', model);
        return model;
      },
      set(sample) {
        // console.log('set checkboxModel', sample);
        this.$store.commit('selectSample', sample);
      },
    },
    sampleHash() {
      const selectedLettersMap = this.$store.getters.selectedSet.map((_char) => _char.letter);
      return selectedLettersMap.join(', ');
    },
  },
  methods: {
    sampleUpdate(event) {
      // Send a set of letters as sample to filter
      // console.log('sampleUpdate', event.target.value.split(''));
      this.$store.commit('selectSample', event.target.value.split(''));
    },
    toggleCharSelection(char) {
      // Send a letter id to toggle select attr
      this.$store.commit('toggleCharSelection', char);
    },
    resetFilters() {
      // Reset Charslist
      this.$store.commit('toggleCharsSet', true);
    },
    emptySelection() {
      // Reset Charslist
      this.$store.commit('toggleCharsSet', false);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
  .charsfilters {
    .custom-control {
      padding-left: 0;
      margin-right: 0;
      width: 33%;
      float: left;
      height: 3.5rem;
      text-align: center;
      display: block;
    }
    .custom-control-label {
      font-size: 120%;
      display: block;
      height: 100%;
      &::before,
      &::after {
        top: 2rem;
        left: calc(50% - 0.5rem);
      }
    }
  }
</style>
