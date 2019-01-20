import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    user: null
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    user: state => {
      return state.user
    },
  },
  mutations: {
    setLoggedIn(state, isLoggedIn) {
      Vue.set(state, 'isLoggedIn', isLoggedIn);
    },
    setUser(state, user) {
      Vue.set(state, 'user', user);
    }
  },
  actions: {
    getMe({ commit }) {
      return axios.get(`/api/me`).then(result => {
        const data = result.data;
        if (data.code && data.code === 401) {
          commit('setUser', null);
          commit('setLoggedIn', false)
        } else {
          commit('setUser', result.data.user);
          commit('setLoggedIn', true);
        }
      })
    },
  }
})
