<template>
<div>
  <CharTimeline
    :letter="letter"
    :paths="majPaths"
    :isMaj="true"
    ref="majTimeline"
  />
  <CharTimeline
    :letter="letter"
    :paths="minPaths"
    :isMaj="false"
    ref="minTimeline"
  />
</div>
</template>

<script>
import CharTimeline from '@/components/CharTimeline.vue';

export default {
  name: 'CharCard',
  components: {
    CharTimeline,
  },
  props: {
    letter: String,
    majPaths: Array,
    minPaths: Array,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .charcard {
    background: antiquewhite;
  }
  .charcard_baselines {
    fill:none;
    stroke:#9b9b9b;
    stroke-width:0.5px;
  }
  .charcard_seyes {
    fill:none;
    stroke-linecap:round;
    stroke-linejoin:round;
  }
  .charcard_seyesinterlines {
    stroke:#93d6f6;
    stroke-width:0.5px;
  }
  .charcard_seyesbaselines {
    stroke:#8953a0;
    stroke-width:1px;
  }
  .charcard_print {
    font-size:26.6px;
    fill:#231f20;
    text-anchor: middle;
  }
  .charcard_print{
    font-family:Nunito-Regular, Nunito;
  }
  .charcard_manuscript{
    font-family:CrayonL;
  }
</style>
