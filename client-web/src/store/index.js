import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    // Here we will create a getter
    overTen: state => {
      return state.count > 10;
    }
  },

  mutations: {
    // Here we will create Jenny
    increment(state, amount) {
      state.count += amount;
    }
  },

  actions: {
    // Here we will create Larry
    increment(context, amount) {
      context.commit('increment', amount);
    }
  }
})
