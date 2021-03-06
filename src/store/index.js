import Vue from 'vue'
import Vuex from 'vuex'
import items from './modules/items'
import history from './modules/history'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    items,
    history
  }
})
