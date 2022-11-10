<template>
  <div>
    {{ event.title }}
  </div>
</template>

<script>
export default {
  computed: {
    event() {
      console.log(this.$route.params.id)
      return this.$store.getters["events/byID"](this.$route.params.id)
    }
  }
}
</script>
