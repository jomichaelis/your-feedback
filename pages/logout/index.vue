<template>
  <div></div>
</template>

<script>
export default {
  layout: 'blank',
  beforeMount() {
    this.onSignOut()
  },
  methods: {
    async onSignOut () {
      await this.$store.dispatch('user/signUserOut').then(() => {
        this.$toast.success('Du wurdest erfolgreich ausgeloggt.')
      })
    }
  }
}
</script>
