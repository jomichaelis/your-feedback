<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
      :color="$vuetify.theme.themes[theme].navigation"
    >
      <v-list class="pt-3" nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template #append>
        <v-list class="pt-2" nav>
          <v-list-item
            v-for="(item, i) in bottomitems"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <div class="pa-2">
          <v-btn outlined block to="/logout" nuxt>
            <span>Logout</span>
            <v-icon right>
              mdi-exit-to-app
            </v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      fixed
      app
      elevation="0"
      :color="$vuetify.theme.themes[theme].navigation"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-img
        class="mx-2"
        src="/logo.png"
        max-height="35"
        max-width="35"
        contain
      />
      <v-toolbar-title>
        <router-link tag="span" to="/" style="cursor: pointer">
          <span class="title ml-3 mr-5"><span class="font-weight-light">your</span>feedback</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <!--
      <v-btn icon @click.stop="switchTheme">
        <v-icon>mdi-{{ `${$vuetify.theme.dark ? 'white-balance-sunny' : 'moon-waning-crescent'}` }}</v-icon>
      </v-btn>
      -->
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!--
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    -->
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-align-horizontal-left',
          title: 'Events',
          to: '/events'
        },
      ],
      bottomitems: [
        {
          icon: 'mdi-cog-outline',
          title: 'Settings',
          to: '/settings'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  beforeMount () {
    const theme = localStorage.getItem('darkTheme')
    if (theme) {
      this.$vuetify.theme.dark = theme === 'true'
    }
    this.$store.dispatch('events/bindMyEvents')
  },
  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  },
  /*
  methods: {
    switchTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('darkTheme', this.$vuetify.theme.dark.toString())
    }
  }
  */
}
</script>

<style scoped>
.v-navigation-drawer >>> .v-navigation-drawer__border {
  display: none
}
</style>
