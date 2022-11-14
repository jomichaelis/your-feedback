<template>
  <v-card
    class="mb-4"
    width="100%"
    elevation="0"
  >
    <v-card-title class="headline">
      {{ event.title }}
      <v-spacer></v-spacer>
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Bearbeiten</v-list-item-title>
          </v-list-item>
          <v-list-item tag="button" v-ripple>
            <v-list-item-title @click="onDeleteClick(event.id)">Löschen</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-list-item dense>
      <v-list-item-icon>
        <v-icon>
          mdi-calendar
        </v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{ $moment(event.created.toDate()).format("dddd, DD. MMMM YYYY") }}</v-list-item-subtitle>
    </v-list-item>
    <v-card-actions>
      <v-spacer />
      <v-btn :to="'/events/' + event.id" outlined>
        View
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
  methods: {
    onDeleteClick(id) {
      console.log(id)
      this.$store.dispatch("events/deleteEvent", {id: id})
    }
  }
}
</script>

<style scoped>
.v-card__text, .v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>
