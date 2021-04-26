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
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'CharGrid',
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
