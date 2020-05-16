<template>
  <div class="loader">
  </div>
</template>

<script>
export default {
  name: 'Loader',
  data() {
    return {
      timeline: {},
    };
  },
}
</script>


<style scoped lang="scss">
.loader{
  position:fixed;
  top: 50%;
  left: 50%;
  height: 1rem;
  width: 1rem;
  background: red;
}
</style>
