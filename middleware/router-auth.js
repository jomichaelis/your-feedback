import 'firebase/auth'

export default function ({ app, redirect, route }) {
  if (!app.$fire.auth.currentUser && route.name !== 'login' && route.name !== 'home' ) {
    redirect('/login')
  } else if (app.$fire.auth.currentUser && route.name === 'login') {
    redirect('/')
  }
}
