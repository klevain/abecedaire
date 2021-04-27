<template>
  <div class="timeline">
    <svg class="d-none">
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
    </svg>
    <b-card
      no-body
      class="mt-3"
    >
      <svg
          class="w-100 h-auto card-img-top"
          viewBox="0 0 64 56"
      >
        <use width="64" height="56" xlink:href="#seyes" v-show="showGrid"/>
        <g ref="maj" class="maj" v-show="!showMin">
          <g class="helpers" v-show="showHelpers">
            <g
              v-for="(helper, index) in char.maj.helpers"
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
            <template v-for="(path, index) in char.maj.paths">
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
              ref="majpath"
              v-for="(path, index) in char.maj.paths"
              :key="index"
              :d="path.value"
              :class="{pressed: path.isPressed, handsup: !path.isPressed }"
              class="path"
            />
          </g>
          <use ref="majtip" x="-2" y="-2" width="4" height="4" xlink:href="#tip"/>
        </g>
        <g ref="min" class="min" v-show="showMin">
          <g class="helpers" v-show="showHelpers">
            <g
              v-for="(helper, index) in char.min.helpers"
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
            <template v-for="(path, index) in char.min.paths">
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
              ref="minpath"
              v-for="(path, index) in char.min.paths"
              :key="index"
              :d="path.value"
              :class="{pressed: path.isPressed, handsup: !path.isPressed }"
              class="path"
            />
          </g>
          <use ref="mintip" x="-2" y="-2" width="4" height="4" xlink:href="#tip"/>
        </g>
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
    </b-card>

    <div class="py-3">
      <b-input-group size="lg">
        <b-input-group-prepend>
          <b-button variant="primary" v-on:click="toggleTLs()">
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
          size="lg"
          type="range"
          min="0"
          max="1024"
          v-on:input="dispatchRange(cursor)"
        ></b-form-input>
        <b-input-group-append>
          <b-button
            variant="primary"
            v-b-modal.modal-options
          >
            <b-icon-gear></b-icon-gear>
          </b-button>
          <b-form-checkbox
            v-model="showMin"
            name="check-button"
            size="lg"
            button
            button-variant="primary"
            class="border-tweak-wrapper"
          >
            <span v-show="!showMin">Aa</span>
            <span v-show="showMin">aA</span>
          </b-form-checkbox>
        </b-input-group-append>
      </b-input-group>
    </div>

    <b-modal
      id="modal-options"
      title="Options"
      hide-footer
      centered
    >
      <b-form-checkbox v-model="showGrid" name="check-button" switch size="lg" class="my-3">
        Afficher les lignes
      </b-form-checkbox>
      <b-form-checkbox v-model="showHelpers" name="check-button" switch size="lg" class="my-3">
        Afficher les flèches d'aide
      </b-form-checkbox>
      <b-form-checkbox v-model="showTrack" name="check-button" switch size="lg" class="my-3">
        Afficher le tracé en pointillé
      </b-form-checkbox>
    </b-modal>
  </div>
</template>

<script>

export default {
  name: 'NewTimeline',
  data() {
    return {
      majTL: {},
      minTL: {},
      cursor: 1024,
      speed: 0.03,
      isPlaying: false,
      hasEnded: false,
    };
  },
  computed: {
    showGrid: {
      get() { return this.$store.state.options.showGrid; },
      set(value) { this.$store.commit('setOPtions', { showGrid: value }); },
    },
    showHelpers: {
      get() { return this.$store.state.options.showHelpers; },
      set(value) { this.$store.commit('setOPtions', { showHelpers: value }); },
    },
    showTrack: {
      get() { return this.$store.state.options.showTrack; },
      set(value) { this.$store.commit('setOPtions', { showTrack: value }); },
    },
    showMin: {
      get() { return this.$store.state.options.showMin; },
      set(value) { this.$store.commit('setOPtions', { showMin: value }); },
    },
  },
  props: {
    char: Object,
  },
  methods: {
    createTLs() {
      const tlOptions = {
        autoplay: false,
        easing: 'linear',
        update: () => {
          this.hasEnded = false;
          this.cursor = (this.majTL.progress * 1024) / 100;
        },
        complete: () => {
          this.hasEnded = true;
          this.isPlaying = false;
        },
      };
      this.majTL = this.$anime.timeline(tlOptions);
      this.minTL = this.$anime.timeline(tlOptions);
    },
    // Loop all the paths and add them to timeline
    populateTL(tipRef, pathRefs, pathDatas, timeline) {
      let delay = 0;

      pathDatas.forEach((path, index) => {
        const pathRef = pathRefs[index];
        const tipPath = this.$anime.path(pathRef);
        const duration = pathRef.getTotalLength() / this.speed;
        let before = { isPressed: false };

        // Add tip press effect
        before = pathDatas[index - 1] ? pathDatas[index - 1] : before;
        if (!before.isPressed && path.isPressed) {
          // Scale tip up
          timeline.add(
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
          // Scale tip down
          timeline.add(
            {
              targets: tipRef,
              scale: 1,
              duration: 200,
            },
            delay,
          );
          delay += 200;
        }

        // Add path reveal effect
        if (path.isPressed) {
          timeline.add(
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
        timeline.add(
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
      });

      return delay;
    },
    equalizeTLs() {
      const delta = this.minTL.duration - this.majTL.duration;
      const delayBuffer = {
        value: 0,
      };
      const delayItem = {
        targets: delayBuffer,
        value: 100,
        duration: Math.abs(delta),
      };
      if (delta < 0) {
        this.minTL.add(delayItem);
      } else
      if (delta > 0) {
        this.majTL.add(delayItem);
      }
    },
    restartTLs() {
      // console.log('restartTLs');
      this.majTL.restart();
      this.minTL.restart();
    },
    playTLs() {
      // console.log('playTLs');
      this.hasEnded = false;
      this.isPlaying = true;
      this.majTL.play();
      this.minTL.play();
    },
    pauseTLs() {
      // console.log('pauseTLs');
      this.isPlaying = false;
      this.majTL.pause();
      this.minTL.pause();
    },
    toggleTLs() {
      // console.log('toggleTLs', this.isPlaying);
      if (this.isPlaying) {
        this.pauseTLs();
      } else {
        this.playTLs();
      }
    },
    dispatchRange(range) {
      // console.log('dispatchRange', range / 1024);
      const wasPlaying = this.isPlaying;
      if (wasPlaying) {
        this.pauseTLs();
      }
      this.majTL.seek((range / 1024) * this.majTL.duration);
      this.minTL.seek((range / 1024) * this.minTL.duration);
      if (wasPlaying) {
        this.playTLs();
      }
    },
    dispatchWheel(event) {
      // console.log('dispatchWheel', event);
      const { deltaY } = event;
      const tempCursor = Math.min(Math.max(this.majTL.progress + (deltaY / 24), 0), 100) / 100;
      this.majTL.seek(tempCursor * this.majTL.duration);
      this.minTL.seek(tempCursor * this.minTL.duration);
    },
    dispatchClick() {
      // console.log('dispatchClick');
      this.toggleTLs();
    },
    dispatchKeyboard(event) {
      // console.log('dispatchKeyboard', event);
      const delta = 0.02;
      const progress = this.minTL.progress / 100;
      if (event.keyCode === 32) {
        this.toggleTLs();
      }
      if (event.keyCode === 39) {
        this.minTL.seek((progress + delta) * this.minTL.duration);
        this.majTL.seek((progress + delta) * this.majTL.duration);
      }
      if (event.keyCode === 37) {
        this.minTL.seek((progress - delta) * this.minTL.duration);
        this.majTL.seek((progress - delta) * this.majTL.duration);
      }
    },
  },
  created() {
    window.addEventListener('keydown', this.dispatchKeyboard);
  },
  destroyed() {
    window.removeEventListener('keydown', this.dispatchKeyboard);
  },
  mounted() {
    this.createTLs();
    this.populateTL(
      this.$refs.majtip,
      this.$refs.majpath,
      this.char.maj.paths,
      this.majTL,
    );
    this.populateTL(
      this.$refs.mintip,
      this.$refs.minpath,
      this.char.min.paths,
      this.minTL,
    );
    this.$nextTick(() => {
      this.equalizeTLs();
      this.playTLs();
    });
  },
};
</script>

<style lang="scss">
@import 'src/assets/_variables.scss';

.border-tweak-wrapper .btn{
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.timeline{
  position: relative;
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
  stroke:$blue;
  stroke-linecap:round;
  stroke-linejoin:round;
  stroke-width:0.25px;
}
.track{
  fill:none;
  fill-opacity: 0;
  stroke:$gray-100;
  stroke-linecap:round;
  stroke-linejoin:round;
  stroke-width: 0.45px;
  stroke-dasharray: 0.4px 1;
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
