import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import chart from './modules/chart'
import getters from './getters'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    chart,
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
