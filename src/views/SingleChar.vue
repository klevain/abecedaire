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
    const letterFilter = (_char) => _char.letter === this.$route.params.char;
    const currentChar = this.$store.state.charsSet.find(letterFilter);
    this.$store.commit('setCurrentChar', currentChar);
  },
};
</script>
