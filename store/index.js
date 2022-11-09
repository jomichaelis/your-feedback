import { vuexfireMutations } from 'vuexfire'

export const state = () => ({
  globalLoading: false
})

export const mutations = {
  ...vuexfireMutations,
  setGlobalLoading (state, payload) {
    state.globalLoading = payload
  }
}

export const getters = {
  globalLoading: (state) => {
    return state.globalLoading
  }
}

export const actions = {
  setGlobalLoading (context, payload) {
    context.commit('setGlobalLoading', payload)
  }
}
