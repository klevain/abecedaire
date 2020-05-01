<template>
  <!-- Paths from letter "{{ letter }}" -->
  <g>
    <path
      ref="path"
      v-for="(path, index) in paths"
      :key="index"
      :d="path"
      class="pathsanim"
    />
  </g>
</template>
<script>
export default {
  name: 'PathsAnim',
  props: {
    paths: Array,
  },
  data() {
    return {
      timeline: {},
      cursor: 0,
      speed: 0.02,
    };
  },
  methods: {
    createTimeline() {
      this.timeline = this.$anime.timeline({
        autoplay: false,
        easing: 'linear',
      });
    },
    // Loop all the paths and add them to timeline
    addPathsToTL() {
      this.$refs.path.forEach((path) => {
        this.timeline.add({
          targets: path,
          strokeDashoffset: [this.$anime.setDashoffset, 0],
          easing: 'linear',
          duration: path.getTotalLength() / this.speed,
        }, '+=500');
      });
    },
    // Add one path to a specific timeline
    addPathToTL(path) {
      const calculatedDuration = path.getTotalLength() / this.speed;
      this.timeline.add({
        targets: path,
        strokeDashoffset: [this.$anime.setDashoffset, 0],
        easing: 'linear',
        duration: calculatedDuration,
      }, '+=500');
    },
    playTL() {
      this.timeline.restart();
    },
    controlTL(deltaY) {
      this.cursor = Math.min(Math.max(this.cursor + deltaY / 24, 0), 100);
      this.timeline.seek((this.cursor / 50) * this.timeline.duration);
      return this.cursor;
    },
  },
  mounted() {
    this.createTimeline();
    this.$nextTick(() => {
      this.addPathsToTL();
      this.timeline.seek(this.timeline.duration);
    });
  },
};
</script>
<style lang="scss">
.pathsanim{
  fill-opacity: 0;
  stroke:#000000;
  stroke-width:1px;
  fill:none;
  stroke-linecap:round;
  stroke-linejoin:round;
}
</style>
