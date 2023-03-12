import Vue from 'vue'
import Vuex from 'vuex'

import chain from './modules/chain'
import getters from './getters'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    chain
  },
  getters
})
