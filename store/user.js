export const state = () => ({
  _authUser: null,
  _loginError: ''
})

export const getters = {
  authUser: (state) => {
    return state._authUser
  },
  loginError: (state) => {
    return state._loginError
  }
}

export const mutations = {
  setAuthUser (state, payload) {
    state._authUser = payload
  },
  setLoginError (state, payload) {
    state._loginError = payload
  }
}

export const actions = {
  async signUserIn ({ commit }) {
    // commit('setLoading', true)
    // commit('clearError')
    try {
      const provider = new this.$fireModule.auth.GoogleAuthProvider()
      await this.$fire.auth.signInWithPopup(provider)
    } catch (error) {
      commit('setLoginError', error)
    }
  },

  async signUserOut ({ commit }) {
    try {
      await this.$fire.auth.signOut()
      commit('setAuthUser', null)
      // TODO: reset store completely
    } catch (error) {
      commit('setError', error)
    }
  },

  async onAuthStateChangedAction ({ commit, dispatch }, { authUser }) {
    if (!authUser) {
      await this.$router.push('/login')
    } else {
      await this.$router.push('/app')
      // using plugin fireauth to make sure user is initialized *before* rendering the page
    }
  },

  editUser (context, payload) {
    this.$fire.firestore.collection('users').doc(this.$fire.auth.currentUser.uid).update(payload)
      .catch((error) => {
        this.$toast.error('Fehler beim Bearbeiten der Nutzerinformation: ' + error)
      })
  }

}
