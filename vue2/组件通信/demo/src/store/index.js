import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginStatus: '未登录'
  },
  mutations: {
    changeStatus(state, msg) {
      state.loginStatus = msg
      console.log(state.loginStatus);
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
  }
})
