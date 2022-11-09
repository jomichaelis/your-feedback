// Make sure that userinfo is filled before rendering the page

export default (context) => {
  const { store } = context
  return new Promise((resolve, reject) => {
    store.dispatch('setGlobalLoading', true)
    store.dispatch('setGlobalLoading', false)
    context.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        return resolve(
          store.commit('user/setAuthUser', {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          })
        )
      }
      return resolve()
    })
  })
}
