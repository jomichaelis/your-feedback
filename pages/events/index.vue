<template>
  <div>
    <v-container row wrap class="my-5">
      <h1 class="heading">
        Events
      </h1>
    </v-container>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <EventCard v-for="event in events" :key="event.id" :event="event" />
        </v-col>
      </v-row>
    </v-container>
    <v-btn
      :color="$vuetify.theme.themes[theme].orange"
      fab
      fixed
      bottom
      right
      @click="showDialog = true"
    >
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
    <NewEventDialog v-model="showDialog" />
  </div>
</template>

<script>
import NewEventDialog from "../../components/NewEventDialog";
import firestore from "@nuxtjs/firebase";
export default {
  components: {NewEventDialog},
  data() {
    return {
      showDialog: false,
    }
  },
  computed:{
    events() {
      return this.$store.getters["events/myEvents"];
    },
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  },
}
</script>
