import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: {}
  },
  getters: {
  },
  mutations: {
    SetUserinfo(state, userinfo) {
      state.userinfo = userinfo
      console.log('vuex中的userinfo重新设置了');
    }
  },
  actions: {
  },
  modules: {
  }
})
