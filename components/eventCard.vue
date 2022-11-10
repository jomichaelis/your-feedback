<template>
  <v-card class="mb-4" width="100%">
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="headline" v-text="event.title"/>
        <v-list-item dense>
          <v-list-item-icon>
            <v-icon>
              mdi-calendar
            </v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{ $moment(event.created.toDate()).format("dddd, DD. MMMM YYYY") }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item dense class="mb-2">
          <v-list-item-icon>
            <v-icon>
              mdi-map-marker
            </v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{ event.user }}</v-list-item-subtitle>
        </v-list-item>
      </div>
    </div>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        nuxt
        :to="'/events/' + event.id"
      >
        Continue
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      default: null
    }
  },
  data () {
    return {}
  },
}
</script>

<style scoped>
.v-card__text, .v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>
