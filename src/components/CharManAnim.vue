<template>
  <!-- Paths from letter "{{ letter }}" -->
  <g class="charanim">
    <g class="charanim_uppercase">
      <PathsAnim v-bind:paths="majPaths" ref="majPaths" />
    </g>
    <g class="charanim_lowercase">
      <PathsAnim v-bind:paths="minPaths" ref="minPaths" />
    </g>
    <rect
      v-on:wheel="dispatchWheel($event)"
      v-on:click="dispatchClick($event)"
      class="charanim_wheelarea charanim_wheelarea--uppercase"
      x="72"
      y="8"
      width="48"
      height="32"
    ></rect>
    <rect
      v-on:wheel="dispatchWheel($event)"
      v-on:click="dispatchClick($event)"
      class="charanim_wheelarea charanim_wheelarea--lowercase"
      x="72"
      y="40"
      width="48"
      height="32"
    ></rect>
  </g>
</template>
<script>
import PathsAnim from '@/components/PathsAnim.vue';

export default {
  name: 'CharManAnim',
  components: {
    PathsAnim,
  },
  props: {
    letter: String,
    majPaths: Array,
    minPaths: Array,
  },
  methods: {
    dispatchWheel(event) {
      if (event.target.classList.contains('charanim_wheelarea--uppercase')) {
        this.$refs.majPaths.controlTL(event.deltaY);
      }
      if (event.target.classList.contains('charanim_wheelarea--lowercase')) {
        this.$refs.minPaths.controlTL(event.deltaY);
      }
    },
    dispatchClick(event) {
      if (event.target.classList.contains('charanim_wheelarea--uppercase')) {
        this.$refs.majPaths.restartTL();
      }
      if (event.target.classList.contains('charanim_wheelarea--lowercase')) {
        this.$refs.minPaths.restartTL();
      }
    },
    playBoth() {
      this.$refs.majPaths.playTL();
      this.$refs.minPaths.playTL();
    },
    pauseBoth() {
      this.$refs.majPaths.pauseTL();
      this.$refs.minPaths.pauseTL();
    },
    seekBoth(percent) {
      console.log('CharManAnim.seekBoth', percent);
      this.$refs.majPaths.seekTL(percent);
      this.$refs.minPaths.seekTL(percent);
    },
  },
};
</script>
<style lang="scss">
.charanim_wheelarea {
  fill-opacity:0;
}
.charanim_path{
  fill-opacity: 0;
  stroke:#000000;
  stroke-width:1px;
  fill:none;
  stroke-linecap:round;
  stroke-linejoin:round;
}
</style>
