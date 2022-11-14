import { firestoreAction } from 'vuexfire'

export const state = () => ({
  _mySlides: [],
})

export const getters = {
  mySlides: (state) => {
    return state._mySlides
  },
  byID: (state) => {
    return id => state._mySlides.find(slide => slide.id === id);
  }
}

export const mutations = {
  setMySlides (state, payload) {
    state._mySlides = payload
  },
}

export const actions = {
  async loadMyEvents({ commit }) {
    this.$fire.firestore.collection("events")
      .where('user', '==', this.$fire.auth.currentUser.uid)
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
    return bindFirestoreRef('_myEvents', this.$fire.firestore.collection('events')
      .orderBy('created'))
  }),
  unbindMyEvents: firestoreAction(({ unbindFirestoreRef }) => {
    return unbindFirestoreRef('_myEvents')
  }),
  createEvent (context, payload) {
    this.$fire.firestore.collection('events').doc(payload.id).set(payload.event)
      .then(() => {
        this.$toast.success('Event wurde erstellt.')
      }).catch((error) => {
      this.$toast.error('Fehler beim Erstellen des Events: ' + error)
    })
  },
  editEvent (context, payload) {
    this.$fire.firestore.collection('events').doc(payload.id).update(payload.event)
      .then(() => {
        this.$toast.success('Event wurde bearbeitet.')
      }).catch((error) => {
      this.$toast.error('Fehler beim Bearbeiten des Events: ' + error)
    })
  },
  deleteEvent (context, payload) {
    this.$fire.firestore.collection('events').doc(payload.id).delete()
      .then(() => {
        this.$toast.success('Event wurde gelöscht.')
      }).catch((error) => {
      this.$toast.error('Fehler beim Löschen des Events: ' + error)
    })
  }
}
