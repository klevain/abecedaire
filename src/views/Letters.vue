<template>
  <b-container
    fluid
    class="home"
  >
    <b-row>
      <nav class="col-md-3 col-lg-2 d-md-block bd-sidebar border-right">
        <div class="pt-3">
          <CharsFilters />
        </div>
      </nav>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <CharsGrid/>
      </main>
    </b-row>
  </b-container>
</template>

<script>
import CharsGrid from '@/components/CharsGrid.vue';
import CharsFilters from '@/components/CharsFilters.vue';

export default {
  name: 'Letters',
  components: {
    CharsGrid,
    CharsFilters,
  },
  methods: {
    commitCurrent(charID) {
      let currentChar = {};
      const routeFilter = (_char) => _char.letter === charID;
      currentChar = this.$store.state.charsSet.find(routeFilter);
      console.log('letters.commitCurrent', currentChar);
      this.$store.commit('setCurrentChar', currentChar);
    },
  },
  mounted() {
    console.log('letters.mounted');
    this.commitCurrent(this.$route.params.char);
  },
  // updated() {
  //   console.log('letters.updated');
  //   this.commitCurrent();
  // },
  beforeRouteUpdate(to, from, next) {
    console.log('letters.beforeRouteUpdate');
    this.commitCurrent(to.params.char);
    next();
  },
  beforeRouteEnter(to, from, next) {
    console.log('letters.beforeRouteEnter');
    next();
  },
  watch: {
    $route(to) {
      console.log('letters.watch.$route', to.params.char);
    },
  },
};
</script>
