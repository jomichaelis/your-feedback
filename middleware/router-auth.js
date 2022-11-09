import 'firebase/auth'

export default function ({ app, redirect, route }) {
  if (!app.$fire.auth.currentUser && route.name !== 'login' && route.name !== 'index' ) {
    console.log(route)
    console.log("redirecting")
    redirect('/login')
  } else if (app.$fire.auth.currentUser && route.name === 'login') {
    redirect('/app')
  }
}
