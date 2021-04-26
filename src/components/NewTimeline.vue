<template>
  <div class="timeline">
    <svg
        class="w-100 h-auto card-img-top"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
    >
      <defs>
        <symbol id="tip" data-name="tip" viewBox="-2 -2 4 4" refX="0" refY="0">
          <g class="tip">
            <circle class="border" cx="0" cy="0" r="1"/>
            <circle class="cross" cx="0" cy="0" r="0.5"/>
          </g>
        </symbol>
        <symbol id="seyes" data-name="seyes" viewBox="0 0 64 56">
          <line class="seyes-interline" x1="0" x2="64" y1="08" y2="08"/>
          <line class="seyes-interline" x1="0" x2="64" y1="16" y2="16"/>
          <line class="seyes-interline" x1="0" x2="64" y1="24" y2="24"/>
          <line class="seyes-line"      x1="0" x2="64" y1="32" y2="32"/>
          <line class="seyes-interline" x1="0" x2="64" y1="40" y2="40"/>
          <line class="seyes-interline" x1="0" x2="64" y1="48" y2="48"/>
        </symbol>
      </defs>
      <use width="64" height="56" xlink:href="#seyes" v-show="showGrid"/>
      <g class="helpers" v-show="showHelpers">
        <g
          v-for="(helper, index) in helpers"
          :key="index"
          class="helper"
        >
          <path
            v-for="(path, jndex) in helper"
            :key="jndex"
            :d="path"
          />
        </g>
      </g>
      <g class="tracks" v-show="showTrack">
        <template v-for="(path, index) in paths">
          <path
            v-if="path.isPressed"
            :key="index"
            :d="path.value"
            class="track"
          />
        </template>
      </g>
      <g class="paths">
        <path
          ref="path"
          v-for="(path, index) in paths"
          :key="index"
          :d="path.value"
          :class="{pressed: path.isPressed, handsup: !path.isPressed }"
          class="path"
        />
      </g>
      <use ref="tip" x="-2" y="-2" width="4" height="4" xlink:href="#tip"/>
      <rect
        v-on:wheel.prevent="dispatchWheel($event)"
        v-on:click="dispatchClick($event)"
        class="wheelarea"
        x="0"
        y="0"
        width="64"
        height="56"
      ></rect>
      <!-- eslint-disable -->
      <!-- just to remember -->
      <!-- eslint-enable -->
    </svg>
    <div class="timeline-toolbar p-3 d-flex flex-column-reverse bd-highlight">
      <b-input-group>
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
          v-on:input="dispatchRange(cursor)"
          v-on:click="playTL"
        ></b-form-input>
        <b-input-group-append>
          <b-button
            variant="primary"
            v-on:click="toggleOptions"
          >
            <b-icon-gear></b-icon-gear>
          </b-button>
        </b-input-group-append>
      </b-input-group>
      <div class="mb-2 text-right" v-show="showOptions">
        <b-form-checkbox
          v-model="showGrid"
          name="check-button"
          button
          button-variant="primary"
        >
          <b-iconstack aria-label="Grille" v-show="showGrid">
            <b-icon stacked icon="bookshelf"></b-icon>
            <b-icon stacked icon="slash" scale="2"></b-icon>
          </b-iconstack>
          <b-icon icon="bookshelf" aria-label="Tracé" v-show="!showGrid"></b-icon>
          <!-- <b-icon-eye v-show="!showGrid"></b-icon-eye>
          <b-icon-eye-slash v-show="showGrid"></b-icon-eye-slash> -->
        </b-form-checkbox>
      </div>
      <div class="mb-2 text-right" v-show="showOptions">
        <b-form-checkbox
          v-model="showHelpers"
          :disabled="helpers.length == 0"
          name="check-button"
          button
          button-variant="primary"
        >
          <b-iconstack aria-label="Flechage" v-show="showHelpers">
            <b-icon stacked icon="arrow-left-right" flip-h></b-icon>
            <b-icon stacked icon="slash" scale="2"></b-icon>
          </b-iconstack>
          <b-icon
            icon="arrow-left-right"
            aria-label="Flechage"
            flip-h
            v-show="!showHelpers"
          ></b-icon>
        </b-form-checkbox>
      </div>
      <div class="mb-2 text-right" v-show="showOptions">
        <b-form-checkbox
          v-model="showTrack"
          name="check-button"
          button
          button-variant="primary"
        >
          <b-iconstack aria-label="Tracé" v-show="showTrack">
            <b-icon stacked icon="three-dots"></b-icon>
            <b-icon stacked icon="slash" scale="2"></b-icon>
          </b-iconstack>
          <b-icon icon="three-dots" aria-label="Tracé" v-show="!showTrack"></b-icon>
        </b-form-checkbox>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NewTimeline',
  data() {
    return {
      timeline: {},
      cursor: 1024,
      speed: 0.03,
      showGrid: true,
      showHelpers: false,
      showTrack: false,
      showOptions: false,
      isPlaying: false,
      hasEnded: false,
      holdTime: 200, // ms between paths.
    };
  },
  props: {
    letter: String,
    paths: Array,
    helpers: Array,
  },
  methods: {
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
    createTimeline() {
      this.timeline = this.$anime.timeline({
        autoplay: false,
        easing: 'linear',
        update: () => {
          this.hasEnded = false;
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
      const tipRef = this.$refs.tip;
      let delay = 0;

      this.paths.forEach((path, index) => {
        const pathRef = this.$refs.path[index];
        const tipPath = this.$anime.path(pathRef);
        const duration = pathRef.getTotalLength() / this.speed;
        const before = this.paths[index - 1] ? this.paths[index - 1] : { isPressed: false };

        console.log('Before : ', before.isPressed);

        if (!before.isPressed && path.isPressed) {
          // Add tip press effect (scale up)
          this.timeline.add(
            {
              targets: tipRef,
              scale: 1.5,
              duration: 200,
            },
            delay,
          );
          delay += 200;
        }
        if (before.isPressed && !path.isPressed) {
          // Add tip release effect (scale down)
          this.timeline.add(
            {
              targets: tipRef,
              scale: 1,
              duration: 200,
            },
            delay,
          );
          delay += 200;
        }

        if (path.isPressed) {
          // Add path reveal effect
          this.timeline.add(
            {
              targets: pathRef,
              strokeDashoffset: [this.$anime.setDashoffset, 0],
              easing: 'easeInOutCubic',
              duration,
            },
            delay,
          );
        }
        // Add pen tip track
        this.timeline.add(
          {
            targets: tipRef,
            translateX: tipPath('x'),
            translateY: tipPath('y'),
            rotate: tipPath('angle'),
            easing: 'easeInOutCubic',
            duration,
          },
          delay,
        );

        delay += duration;
        // delay += this.holdTime;
      });

      return delay;
    },
    restartTL() {
      this.timeline.restart();
    },
    playTL() {
      console.log('playTL');
      // console.log('this.timeline.progress', this.timeline.progress);
      this.hasEnded = false;
      this.isPlaying = true;
      this.timeline.play();
    },
    pauseTL() {
      console.log('pauseTL');
      this.isPlaying = false;
      this.timeline.pause();
    },
    toggleTL() {
      if (!this.isPlaying) {
        this.playTL();
      } else {
        this.pauseTL();
      }
    },
    dispatchRange(range) {
      this.pauseTL();
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
      // this.timeline.seek(this.timeline.duration);
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import 'src/assets/_variables.scss';

  .timeline{
    position: relative;
  }
  .timeline-toolbar{
    position: absolute;bottom: 0;left: 0;right: 0;
  }
  .tip{
    .cross{
      fill: $red;
    }
    .border{
      fill: $red;
      opacity: 0.5;
    }
  }
  .seyes-line{
    fill:none;
    fill-opacity: 0;
    stroke:$gray-200;
    stroke-linecap:round;
    stroke-linejoin:round;
    stroke-width:0.25px;
  }
  .seyes-interline{
    fill:none;
    fill-opacity: 0;
    stroke:$gray-200;
    stroke-linecap:round;
    stroke-linejoin:round;
    stroke-width:0.125px;
  }
  .helper{
    fill:none;
    fill-opacity: 0;
    stroke:$gray-200;
    stroke-linecap:round;
    stroke-linejoin:round;
    stroke-width:0.25px;
  }
  .track{
    fill:none;
    fill-opacity: 0;
    stroke:$gray-200;
    stroke-linecap:round;
    stroke-linejoin:round;
    stroke-width:0.25px;
    stroke-dasharray: 0.25 0.5;
  }
  .pressed{
    fill:none;
    fill-opacity: 0;
    stroke:$gray-900;
    stroke-linecap:round;
    stroke-linejoin:round;
    stroke-width:1px;
  }
  .handsup{
    fill:none;
    fill-opacity: 0;
    stroke:none;
    stroke-opacity: 0;
  }
  .wheelarea {
    fill-opacity:0;
  }
</style>
