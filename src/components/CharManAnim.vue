<template>
  <!-- Paths from letter "{{ letter }}" -->
  <g class="charcard_manuscript" v-on:click="playTL">
    <g class="charcard_uppercase">
      <path ref="majPath" v-for="(path, index) in majPaths" :key="index" :d="path" />
    </g>
    <g class="charcard_lowercase">
      <path ref="minPath" v-for="(path, index) in minPaths" :key="index" :d="path" />
    </g>
  </g>
</template>

<script>
export default {
  name: 'CharManAnim',
  props: {
    letter: String,
    majPaths: Array,
    minPaths: Array,
  },
  data() {
    return {
      majTimeline: {},
      minTimeline: {},
      speed: 0.02,
    };
  },
  methods: {
    createTimelines() {
      this.majTimeline = this.$anime.timeline({
        loop: true,
        autoplay: false,
        easing: 'linear',
      });
    },
    addPathsToTL() {
      this.$refs.majPath.forEach((path) => { this.addPathToTL(path); });
    },
    addPathToTL(path) {
      const calculatedDuration = path.getTotalLength() / this.speed;
      console.log('duration', calculatedDuration);
      this.majTimeline.add({
        targets: path,
        strokeDashoffset: [this.$anime.setDashoffset, 0],
        easing: 'linear',
        duration: calculatedDuration,
      }, '+=500');
    },
    playTL() {
      console.log('Tl play()');
      this.majTimeline.play();
    },
  },
  mounted() {
    this.createTimelines();
    this.$nextTick(() => {
      console.log('nextTick');
      this.addPathsToTL();
      this.playTL();
    });
  },
};
</script>
