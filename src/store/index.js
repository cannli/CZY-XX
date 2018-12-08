import Vue from 'vue'
import Vuex from 'vuex'
import {cookieStorage} from 'common/storage'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    user_info: cookieStorage.get('user_info'),
    logoImg: ''
  },
  mutations: {
    user_infoFn(state, userinfo) {
      state.user_info = userinfo || {}
      if (userinfo === null) {
        cookieStorage.remove('user_info')
      } else {
        cookieStorage.set('user_info', userinfo)
        state.user_info = userinfo
      }
    },
    logoImgFn (state, val) {
      state.logoImg = val
    }
  }
})
export default store
