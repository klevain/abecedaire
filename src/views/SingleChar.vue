<template>
  <div class="char">
    <h1>La lettre {{$route.params.char}}</h1>
    <CharCard v-bind="$store.state.currentChar" />
  </div>
</template>
<script>
import CharCard from '@/components/CharCard.vue';
// import charssetjson from '@/assets/chars-set.json';

export default {
  name: 'Char',
  components: {
    CharCard,
  },
  created() {
    const currentChar = this.$store.state.charsSet[this.$route.params.char];
    this.$store.commit('setCurrentChar', currentChar);
  },
};
</script>
