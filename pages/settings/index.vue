<template>
  <div>
    <v-container row wrap class="my-5">
      <h1 class="heading">
        Settings
      </h1>
    </v-container>
    <v-container>
      <v-list subheader two-line flat color="transparent">
        <v-list-item>
          <v-list-item-action>
            <v-switch
              v-model="darkTheme"
              color="primary"
            />
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Dark Mode</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      darkTheme: false,
    }
  },
  beforeMount() {
    this.darkTheme = this.$vuetify.theme.dark;
  },
  watch: {
    darkTheme(newValue, oldValue) {
      this.$vuetify.theme.dark = newValue;
      localStorage.setItem('darkTheme', this.$vuetify.theme.dark.toString());
    }
  },
}
</script>
