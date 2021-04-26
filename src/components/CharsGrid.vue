<template>
  <div>
    <svg
      height="0"
      width="0"
    >
      <defs>
        <symbol id="seyes" data-name="seyes" viewBox="0 0 64 88">
          <line class="seyes-interline" x1="0" x2="64" y1="08" y2="08"/>
          <line class="seyes-interline" x1="0" x2="64" y1="16" y2="16"/>
          <line class="seyes-interline" x1="0" x2="64" y1="24" y2="24"/>
          <line class="seyes-line"      x1="0" x2="64" y1="32" y2="32"/>
          <line class="seyes-interline" x1="0" x2="64" y1="40" y2="40"/>
          <line class="seyes-interline" x1="0" x2="64" y1="48" y2="48"/>
          <line class="seyes-interline" x1="0" x2="64" y1="56" y2="56"/>
          <line class="seyes-line"      x1="0" x2="64" y1="64" y2="64"/>
          <line class="seyes-interline" x1="0" x2="64" y1="72" y2="72"/>
          <line class="seyes-interline" x1="0" x2="64" y1="80" y2="80"/>
        </symbol>
      </defs>
    </svg>
    <b-row no-gutters>
      <b-col
        v-for="char in chars"
        :key="char.letter"
        cols="3"
        sm="3"
        md="2"
      >
        <b-link
          :to="{name: 'Lettre', params: { char: char.letter }}"
          class="d-block text-center fs-2"
        >
          <svg
              class="w-100 h-auto card-img-top"
              viewBox="0 0 64 88"
          >
            <use width="64" height="88" xlink:href="#seyes"/>
            <g
              class="paths paths-maj"
              v-if="char.maj"
            >
              <path
                v-for="(path, index) in char.maj.paths"
                v-show="path.isPressed"
                :key="index"
                :d="path.value"
                class="path"
              />
            </g>
            <g
              class="paths paths-min"
              v-if="char.min"
            >
              <path
                v-for="(path, index) in char.min.paths"
                v-show="path.isPressed"
                :key="index"
                :d="path.value"
                class="path"
              />
            </g>
            <g
              class="paths paths-maj paths-transform"
              v-if="!char.maj"
            >
              <path
                v-for="(path, index) in char.majPaths"
                :key="index"
                :d="path"
                class="path"
              />
            </g>
            <g
              class="paths paths-min paths-transform"
              v-if="!char.min"
            >
              <path
                v-for="(path, index) in char.minPaths"
                :key="index"
                :d="path"
                class="path"
              />
            </g>
          </svg>

          <!-- <svg
              class="w-100 h-auto card-img-top"
              viewBox="0 0 64 88"
          >
            <use width="64" height="88" xlink:href="#seyes"/>
            <g
              class="paths paths-maj paths-transform"
              v-if="!char.maj"
            >
              <path
                v-for="(path, index) in char.majPaths"
                :key="index"
                :d="path"
                class="path"
              />
            </g>
            <g
              class="paths paths-min paths-transform"
              v-if="!char.min"
            >
              <path
                v-for="(path, index) in char.minPaths"
                :key="index"
                :d="path"
                class="path"
              />
            </g> -->
            <!-- eslint-disable -->
            <!-- just to remember -->
            <!-- eslint-enable -->
          <!-- </svg> -->

        </b-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'CharGrid',
  computed: {
    chars() {
      return this.$store.getters.selectedSet;
    },
    isRouteChar() {
      return this.router.params.char;
    },
  },
  methods: {
    onHidden(charID) {
      console.log('CharsGrid.onHidden', charID);
      this.$router.push({ name: 'Lettres' });
    },
  },
};
</script>

<style lang="scss">
@import 'src/assets/_variables.scss';

.paths{
  fill:none;
  fill-opacity: 0;
  stroke:$gray-900;
  stroke-linecap:round;
  stroke-linejoin:round;
  stroke-width:1px;
}
.paths-maj{
  &.paths-transform{
    transform: translateX(-64px);
  }
}
.paths-min{
  transform: translateY(32px);
  &.paths-transform{
    transform: translate(-64px, 0);
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
</style>
