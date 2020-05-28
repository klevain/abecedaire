<template>
<div>
  <b-container>
    <b-row>
      <b-col>
        <svg
            class="w-100 h-auto rounded-lg shadow-sm bg-light border"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 88"
        >
            <g class="charcard_baselines">
                <line x1="128" y1="64" y2="64"/>
                <line x1="128" y1="32" y2="32"/>
            </g>
            <g class="charcard_seyes">
                <g class="charcard_seyesbaselines">
                    <line x1="120" y1="32" x2="72" y2="32"/>
                    <line x1="120" y1="64" x2="72" y2="64"/>
                </g>
                <g class="charcard_seyesinterlines">
                    <line x1="120" y1="80" x2="72" y2="80"/>
                    <line x1="120" y1="72" x2="72" y2="72"/>
                    <line x1="120" y1="56" x2="72" y2="56"/>
                    <line x1="120" y1="48" x2="72" y2="48"/>
                    <line x1="120" y1="40" x2="72" y2="40"/>
                    <line x1="120" y1="24" x2="72" y2="24"/>
                    <line x1="120" y1="16" x2="72" y2="16"/>
                    <line x1="120" y1="8" x2="72" y2="8"/>
                </g>
            </g>
            <g class="charcard_print">
                <text class="charcard_uppercase" transform="translate(32 32)">
                  {{ letter.toUpperCase() }}
                </text>
                <text class="charcard_lowercase" transform="translate(32 64)">
                  {{ letter }}
                </text>
            </g>
            <g class="charcard_manuscript">
              <CharManAnim
                :letter="letter"
                :majPaths="majPaths"
                :minPaths="minPaths"
                ref="charManAnim"
              />
              <!-- eslint-disable -->
              <!-- just to remember -->
              <!-- eslint-enable -->
            </g>
        </svg>
      </b-col>
    </b-row>
    <b-row v-if="!isInGrid">
      <b-col>
        <div>
          <div class="input-group input-group-lg mt-3">
            <div class="input-group-prepend">
              <b-button variant="primary" v-on:click="togglePath()">
                <b-icon-pause v-if="isPlaying"></b-icon-pause>
                <b-icon-play v-else></b-icon-play>
              </b-button>
            </div>
            <b-form-input
              id="range-1"
              v-model="controlTL"
              type="range"
              min="0"
              max="100"
              size="lg"
              v-on:input="seekPath(controlTL)"
            ></b-form-input>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
import CharManAnim from '@/components/CharManAnim.vue';

export default {
  name: 'CharCard',
  data() {
    return {
      controlTL: 0.0,
      isPlaying: false,
    };
  },
  components: {
    CharManAnim,
  },
  props: {
    letter: String,
    majPaths: Array,
    minPaths: Array,
    isInGrid: Boolean,
  },
  methods: {
    increment() {
      this.$store.commit('increment');
      console.log(this.$store.state.count);
    },
    playPath() {
      this.$refs.charManAnim.playBoth();
    },
    pausePath() {
      this.$refs.charManAnim.pauseBoth();
    },
    togglePath() {
      if (this.isPlaying) {
        this.$refs.charManAnim.pauseBoth();
      } else {
        this.$refs.charManAnim.playBoth();
      }
      this.isPlaying = !this.isPlaying;
    },
    seekPath(percent) {
      console.log('CharCard.seekPath', percent);
      this.$refs.charManAnim.seekBoth(percent);
    },
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
