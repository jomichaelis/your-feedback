<template>
  <div>
    <v-container row wrap class="my-5">
      <h1 class="heading">
        Dashboard
      </h1>
    </v-container>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <EventCard v-for="event in events" :key="event.id" :event="event" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import EventCard from "../components/EventCard";
export default {
  components: {EventCard},
  async beforeMount() {
    // await this.$store.dispatch("events/loadMyEvents");
  },
  computed: {
    events() {
      return this.$store.getters["events/myEvents"];
    },
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }
}

</script>
