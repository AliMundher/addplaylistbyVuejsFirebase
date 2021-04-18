import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login'
import Register from '../views/auth/Register'
import CreatePlayList from '../views/playLists/CreatePlayList'
import Details from '../views/playLists/Details'
import { auth } from '../firebase/config'

// route guard
const requiredAuth = (to, from, next) => {
  let user = auth.currentUser;
  if (!user) {
    next({ name: 'Login' })
  }
  else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requiredAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
  ,
  {
    path: '/playlist/create',
    name: 'CreatePlayList',
    component: CreatePlayList,
    beforeEnter: requiredAuth
  },
  {
    path: '/playlist/details/:id',
    name: 'Details',
    component: Details,
    beforeEnter: requiredAuth,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
