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
  }
}
