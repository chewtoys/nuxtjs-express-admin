import Vuex from 'vuex'
import * as root from './root'
import * as setting from './modules/setting'
import * as auth from './modules/auth'

// More info about store: https://vuex.vuejs.org/en/core-concepts.html
// See https://nuxtjs.org/guide/vuex-store#classic-mode
// structure of the store:
  // types: Types that represent the keys of the mutations to commit
  // state: The information of our app, we can get or update it.
  // getters: Get complex information from state
  // action: Sync or async operations that commit mutations
  // mutations: Modify the state

interface ModulesStates {
  
}

export type RootState = root.State & ModulesStates

const createStore = () => {
  return new Vuex.Store({
    state: root.state(),
    getters: root.getters,
    mutations: root.mutations,
    actions: root.actions,
    modules: {
      [setting.name]: setting,
      [auth.name]: auth
    }
  })
}

export default createStore