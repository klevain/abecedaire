<template>
  <div class="home" >
    <b-row no-gutters>
      <nav class="col-md-3 col-lg-2 d-md-block bd-sidebar border-right d-none d-md-block">
        <div class="pt-3">
          <CharsFilters />
        </div>
      </nav>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <CharsGrid/>
      </main>
    </b-row>
  </div>
</template>

<script>
import CharsGrid from '@/components/CharsGrid.vue';
import CharsFilters from '@/components/CharsFilters.vue';

export default {
  name: 'Home',
  components: {
    CharsGrid,
    CharsFilters,
  },
  methods: {
    commitCurrent(charID) {
      let currentChar = {};
      const routeFilter = (_char) => _char.letter === charID;
      currentChar = this.$store.state.charsSet.find(routeFilter);
      this.$store.commit('setCurrentChar', currentChar);
    },
  },
};
</script>
