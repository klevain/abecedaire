<template>
  <div class="home">
    <CharsGrid/>
    <CharsFilters />
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
};
</script>
