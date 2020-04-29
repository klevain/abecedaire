<template>
  <div class="chargrid">

    <router-link
      v-for="char in charlist"
      v-bind:key="char.letter"
      v-bind:to="{name: 'lettre', params: { char: char.letter }}"
      v-shuffle="2"
      class="chargrid_cell"
    >
      <CharCard v-bind="char" />
    </router-link>
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
      return this.$store.state.charsSet;
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
};
</script>

<style scoped lang="scss">
  .chargrid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
  }
  .chargrid_cell {
    margin: 1rem;
    transition: transform 150ms ease-in;
    width: 15.2rem;
    &:hover{
      transform: rotate(0deg) !important;
    }
  }
</style>
