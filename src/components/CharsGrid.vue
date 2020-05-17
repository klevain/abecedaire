<template>
  <transition-group name="flip-list" tag="div" class="row row-cols-3">
    <b-col
        v-for="char in charlist"
        v-bind:key="char.letter"
    >
      <router-link
        v-bind:to="{name: 'Lettre', params: { char: char.letter }}"
        v-shuffle="2"
        class="d-block m-3"
      >
        <CharCard v-bind="char"  />
      </router-link>
    </b-col>
  </transition-group>
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
.flip-list-move {
  // transition: transform 1s;
}
  .chargrid {
    // display: flex;
    // flex-direction: row;
    // flex-wrap: wrap;
    // justify-content: center;
    // align-items: flex-start;
  }
  .chargrid_cell {
    // display: block;
    // margin: 1rem;
    // transition: transform 150ms ease-in;
    // width: 15.2rem;
    // &:hover{
    //   transform: rotate(0deg) !important;
    // }
  }
</style>
