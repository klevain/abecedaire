<template>
  <b-container fluid="md" class="home">
    <b-row>
      <b-col cols="12" md="3">
        <CharsFilters />
      </b-col>
      <b-col cols="12" md="9">
        <CharsGrid/>
      </b-col>
    </b-row>
  </b-container>
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
};
</script>
