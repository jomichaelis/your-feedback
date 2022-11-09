<template>
  <v-app
    style="
    background: #005C53;
    background: -webkit-linear-gradient(to top, #005C53, #D6D58E);
    background: linear-gradient(to top, #005C53, #D6D58E);"
  >
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-row align="center" justify="center">
            <v-img class="mb-5" src="/icon.png" max-height="200" max-width="200" contain />
          </v-row>
          <v-row align="center" justify="center">
            <v-btn class="white primary--text mt-5" :loading="loading" @click.native="onSignin">
              <img class="mr-2" width="20" height="20" src="/google.svg" alt="google-logo">
              Anmelden
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'blank',
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onSignin () {
      this.loading = true
      await this.$store.dispatch('user/signUserIn').then(() => {
        this.loading = false
      })
    }
  }
}
</script>
