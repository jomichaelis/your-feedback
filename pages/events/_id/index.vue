<template>
  <div>
    <v-layout row wrap class="my-5">
      <h1 class="heading">
        {{ event.title }}
      </h1>
      <v-spacer />
      <v-btn elevation="0" outlined>
        present
      </v-btn>
    </v-layout>
    <Slide></Slide>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(slide,i) in slides"
        :key="i"
      >
        <v-sheet
          height="100%"
        >
          <Slide />
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import Slide from '/components/Slide.vue';
import {firestoreAction} from "vuexfire";

export default {
  components: {
    Slide
  },
  data() {
    return {
      slides: null
    }
  },
  computed: {
    event() {
      return this.$store.getters["events/byID"](this.$route.params.id)
    }
  },
  beforeMount() {
    firestoreAction(function ({ bindFirestoreRef }) {
      return bindFirestoreRef('slides', this.$fire.firestore.collection('events/a1f3P8F4MfKky7bJeDD3/slides')
        .orderBy('index'))
    })
  }
}
</script>
