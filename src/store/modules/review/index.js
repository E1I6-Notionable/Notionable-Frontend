export default {
  namespaced: true,
  state: {
    reviewView: false,
  },
  mutations: {
    REVIEW_VIEW(state, payload) {
      state.reviewView = payload;
    },
  },
  actions: {
    reviewView({ commit }, payload) {
      commit('REVIEW_VIEW', payload.reviewView);
    },
  },
};
