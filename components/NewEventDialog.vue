<template>
  <div>
    <v-dialog
      v-model="show"
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Neues Event erstellen</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="event.title" label="Titel" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="close()">
            Abbrechen
          </v-btn>
          <v-btn color="primary" text @click="save">
            Speichern
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  name: "NewEventDialog",
  props: {
    value: Boolean,
  },
  data () {
    return {
      event: {
        title: '',
      }
    }
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },
    isValid () {
      return (this.event.title !== '')
    }
  },
  methods: {
    async save() {
      if (this.isValid) {
        await this.$store.dispatch('events/createEvent', {
          title: this.event.title,
          created: this.$fireModule.firestore.Timestamp.now(),
          user: this.$fire.auth.currentUser.uid
        })
        this.initForm()
        this.close()
      } else {
        this.$toast.warning('Bitte fülle alle Felder aus.')
      }
    },
    initForm() {
      this.event.title = ''
    },
    close() {
      this.show = false
    }
  }
}
</script>
