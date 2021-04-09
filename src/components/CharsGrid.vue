<template>
  <div class="row row-cols-3">
    <b-col
        v-for="char in charlist"
        :key="char.letter"
    >
      <router-link
        :to="{name: 'Lettre', params: { char: char.letter }}"
        v-shuffle="2"
        class="d-block m-3"
      >
        <CharCard v-bind="char" is-in-grid  />
      </router-link>
      <b-modal
        :id="'bv-modal-letter-' + char.letter"
        v-on:hidden="onHidden(char.letter)"
        v-model="char.current"
        size="lg"
        hide-footer
      >
        <!-- <template v-slot:modal-header>
          <h5 class="modal-title">La lettre “{{char.letter.toUpperCase()}}”</h5>
          <router-link to="/lettres" class="close" >×</router-link>
        </template> -->
        <CharCard v-bind="char"  />
      </b-modal>
    </b-col>
  </div>
</template>

<script>
import CharCard from '@/components/CharCard.vue';
// import charsSetJson from '@/assets/chars-set.json';

export default {
  name: 'CharGrid',
  components: {
    CharCard,
  },
  computed: {
    charlist() {
      return this.$store.getters.selectedSet;
    },
    isRouteChar() {
      return this.router.params.char;
    },
  },
  directives: {
    shuffle: {
      bind(el) {
        const randrot = (Math.random() >= 0.5) ? -1 : 1;
        const randamp = 1 + Math.random() * 2;
        const element = el;
        element.style.transform = `rotate(${randrot * randamp}deg)`;
      },
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
.flip-list-move {
  transition: transform 1s;
}
</style>
