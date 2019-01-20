import store from './store';
import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'

Vue.use(Router)

const checkAuthenticated = (to, from, next) => {
  store.dispatch('getMe').then(() => {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next({ path: '/' });
  });
}

// const checkNotAuthenticated = (to, from, next) => {
//   store.dispatch('getMe').then(() => {
//     if (!store.getters.isLoggedIn) {
//       next();
//       return;
//     }
//     next({ path: '/dashboard' });
//   });
// }

// Use beforeEnter to implement checks.
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
      // beforeEnter: checkNotAuthenticated
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: checkAuthenticated
    }
  ]
})
