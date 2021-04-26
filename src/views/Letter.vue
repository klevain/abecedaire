<template>
  <b-container
    fluid="lg"
  >
    <b-row>
      <b-col>
        <h1 class="my-3">La lettre “{{char.letter}}”</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        v-if="char.maj"
        cols="12"
        md="6"
      >
        <b-card
          no-body
          class="mt-3"
          title="Majuscule"
        >
          <NewTimeline
            :letter="char.letter"
            :paths="char.maj.paths"
            :helpers="char.maj.helpers"
          />
        </b-card>
      </b-col>
      <b-col
        v-if="!char.maj"
        cols="12"
        md="6"
      >
        <b-card
          no-body
          class="mt-3"
          title="Majuscule"
        >
          <CharTimeline
            :letter="char.letter"
            :paths="char.majPaths"
            :isMaj="true"
            ref="majTimeline"
          />
        </b-card>
      </b-col>
      <b-col
        v-if="char.min"
        cols="12"
        md="6"
      >
        <b-card
          no-body
          class="mt-3"
          title="Minuscule"
        >
          <NewTimeline
            :letter="char.letter"
            :paths="char.min.paths"
            :helpers="char.min.helpers"
          />
        </b-card>
      </b-col>
      <b-col
        v-if="!char.min"
        cols="12"
        md="6"
      >
        <b-card
          no-body
          class="mt-3"
          title="Minuscule"
        >
          <CharTimeline
            :letter="char.letter"
            :paths="char.minPaths"
            :isMaj="false"
            ref="minTimeline"
          />
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CharTimeline from '@/components/CharTimeline.vue';
import NewTimeline from '@/components/NewTimeline.vue';

export default {
  name: 'Letter',
  components: {
    CharTimeline,
    NewTimeline,

  },
  computed: {
    char() {
      console.log(this.$store.getters.currentChar);
      return this.$store.getters.currentChar;
    },
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
