<template>
  <div class="timeline">
    <svg
        class="w-100 h-auto card-img-top"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="72 4 48 48"
    >
        <g class="charcard_baselines">
            <line x1="128" y1="32" y2="32"/>
        </g>
        <g class="charcard_seyes">
            <g class="charcard_seyesbaselines">
                <line x1="120" y1="32" x2="72" y2="32"/>
                <!-- <line x1="120" y1="64" x2="72" y2="64"/> -->
            </g>
            <g class="charcard_seyesinterlines">
                <!-- <line x1="120" y1="80" x2="72" y2="80"/>
                <line x1="120" y1="72" x2="72" y2="72"/>
                <line x1="120" y1="56" x2="72" y2="56"/> -->
                <line x1="120" y1="48" x2="72" y2="48"/>
                <line x1="120" y1="40" x2="72" y2="40"/>
                <line x1="120" y1="24" x2="72" y2="24"/>
                <line x1="120" y1="16" x2="72" y2="16"/>
                <line x1="120" y1="8" x2="72" y2="8"/>
            </g>
        </g>
        <g class="charcard_print">
            <text transform="translate(32 32)">
              {{ letter }}
            </text>
        </g>
        <g class="charcard_manuscript">
          <g class="charanim">
            <!-- Paths from letter "{{ letter }}" -->
            <g v-if="isMaj">
              <path
                ref="path"
                v-for="(path, index) in paths"
                :key="index"
                :d="path"
                class="pathsanim"
              />
            </g>
            <g v-if="!isMaj" transform="translate(0 -32)">
              <path
                ref="path"
                v-for="(path, index) in paths"
                :key="index"
                :d="path"
                class="pathsanim"
              />
            </g>
            <rect
              v-on:wheel.prevent="dispatchWheel($event)"
              v-on:click="dispatchClick($event)"
              class="charanim_wheelarea"
              x="72"
              y="8"
              width="48"
              height="32"
            ></rect>
          </g>
          <!-- eslint-disable -->
          <!-- just to remember -->
          <!-- eslint-enable -->
        </g>
    </svg>
    <div class="input-group">
      <b-input-group-prepend>
        <b-button variant="primary" v-on:click="toggleTL()">
          <span v-show="!hasEnded">
            <b-icon-play v-show="!isPlaying"></b-icon-play>
            <b-icon-pause v-show="isPlaying"></b-icon-pause>
          </span>
          <b-icon-arrow-counterclockwise v-show="hasEnded"></b-icon-arrow-counterclockwise>

        </b-button>
      </b-input-group-prepend>
      <b-form-input
        id="range"
        v-model="cursor"
        type="range"
        min="0"
        max="1024"
        size="lg"
        v-on:input="dispatchRange(cursor)"
      ></b-form-input>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CharTimeline',
  data() {
    return {
      timeline: {},
      cursor: 1024,
      speed: 0.02,
      isPlaying: false,
      hasEnded: false,
    };
  },
  props: {
    letter: String,
    paths: Array,
    isMaj: Boolean,
  },
  methods: {
    createTimeline() {
      this.timeline = this.$anime.timeline({
        autoplay: false,
        easing: 'linear',
        update: () => {
          // console.log(this.timeline.progress);
          this.cursor = (this.timeline.progress * 1024) / 100;
        },
        complete: () => {
          this.hasEnded = true;
          this.pauseTL();
        },
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
    restartTL() {
      this.timeline.restart();
    },
    playTL() {
      // console.log('playTL');
      // console.log('this.timeline.progress', this.timeline.progress);
      this.hasEnded = false;
      this.isPlaying = true;
      this.timeline.play();
    },
    pauseTL() {
      this.isPlaying = false;
      this.timeline.pause();
      // console.log('pauseTL');
    },
    toggleTL() {
      if (!this.isPlaying) {
        this.playTL();
      } else {
        this.pauseTL();
      }
    },
    dispatchRange(range) {
      this.timeline.seek((range / 1024) * this.timeline.duration);
    },
    dispatchWheel(event) {
      const { deltaY } = event;
      const tempCursor = Math.min(Math.max(this.timeline.progress + (deltaY / 24), 0), 100) / 100;
      this.timeline.seek(tempCursor * this.timeline.duration);
    },
    dispatchClick() {
      this.restartTL();
    },
  },
  mounted() {
    this.createTimeline();
    this.$nextTick(() => {
      this.addPathsToTL();
      this.playTL();
    });
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
  .pathsanim{
    fill-opacity: 0;
    stroke:#000000;
    stroke-width:1px;
    fill:none;
    stroke-linecap:round;
    stroke-linejoin:round;
  }
</style>
