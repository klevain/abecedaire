<template>
  <b-row
  no-gutters
  >
    <b-col
      v-for="char in charlist"
      :key="char.letter"
      cols="3"
      sm="3"
      md="2"
      class="border"
    >
      <b-link
        :to="{name: 'Lettre', params: { char: char.letter }}"
        class="d-block text-center fs-2"
      >
        <h5 class="display-1 text-uppercase font-weight-bold">
          {{ char.letter }}
        </h5>
        <b-icon-plus
          variant="secondary"
          class="border border-secondary rounded-circle h3"
        ></b-icon-plus>
      </b-link>

      <b-modal
        :id="'bv-modal-letter-' + char.letter"
        v-on:hidden="onHidden(char.letter)"
        v-model="char.current"
        :title="'La lettre “' + char.letter.toUpperCase() + '”'"
        size="lg"
        hide-footer
        centered
      >
        <CharCard v-bind="char"  />
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
import CharCard from '@/components/CharCard.vue';
import { BIconPlus } from 'bootstrap-vue';

export default {
  name: 'CharGrid',
  components: {
    CharCard,
    BIconPlus,
  },
  computed: {
    charlist() {
      return this.$store.getters.selectedSet;
    },
    isRouteChar() {
      return this.router.params.char;
    },
  },
  methods: {
    onHidden(charID) {
      console.log('CharsGrid.onHidden', charID);
      this.$router.push({ name: 'Lettres' });
    },
  },
};
</script>

<style scoped lang="scss">
a:hover {
  text-decoration: none;
}
</style>
