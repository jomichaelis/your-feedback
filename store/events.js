import { firestoreAction } from 'vuexfire'

export const state = () => ({
  _myEvents: [],
})

export const getters = {
  myEvents: (state) => {
    return state._myEvents
  },
  byID: (state) => {
    return id => state._myEvents.find(event => event.id === id);
  }
}

export const mutations = {
  setMyEvents (state, payload) {
    state._myEvents = payload
  },
}

export const actions = {
  async loadMyEvents({ commit }) {
    this.$fire.firestore.collection('users/' + this.$fire.auth.currentUser.uid + '/events')
      .get()
      .then((querySnapshot) => {
        const events = []
        querySnapshot.forEach((doc) => {
          const obj = doc.data()
          events.push({
            id: doc.id,
            ...obj
          })
        })
        commit("setMyEvents", events);
      })
  },
  bindMyEvents: firestoreAction(function ({ bindFirestoreRef }) {
    console.log(this.$fire.auth.currentUser.uid)
    return bindFirestoreRef('_myEvents', this.$fire.firestore.collection('users/' + this.$fire.auth.currentUser.uid + '/events')
      .orderBy('created'))
  }),
  unbindMyEvents: firestoreAction(({ unbindFirestoreRef }) => {
    return unbindFirestoreRef('_myEvents')
  }),
  createEvent (context, payload) {
    console.log(payload)
    this.$fire.firestore.collection('users/' + this.$fire.auth.currentUser.uid + '/events').add(payload)
      .then(() => {
        this.$toast.success('Event wurde erstellt.')
      }).catch((error) => {
      this.$toast.error('Fehler beim Erstellen des Events: ' + error)
    })
  },
  editEvent (context, payload) {
    this.$fire.firestore.collection('users/' + this.$fire.auth.currentUser.uid + '/events').doc(payload.id).update(payload.event)
      .then(() => {
        this.$toast.success('Event wurde bearbeitet.')
      }).catch((error) => {
      this.$toast.error('Fehler beim Bearbeiten des Events: ' + error)
    })
  },
  deleteEvent (context, payload) {
    this.$fire.firestore.collection('users/' + this.$fire.auth.currentUser.uid + '/events').doc(payload.id).delete()
      .then(() => {
        this.$toast.success('Event wurde gelöscht.')
      }).catch((error) => {
      this.$toast.error('Fehler beim Löschen des Events: ' + error)
    })
  }
}
