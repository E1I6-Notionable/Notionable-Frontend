export default {
  namespaced: true,
  state: {
    templateList: [],
    writeReview: false,
  },
  mutations: {
    ADD_LIST(state, payload) {
      state.templateList = payload;
    },
    WRITE_REVIEW(state, payload) {
      state.writeReview = payload;
    },
  },
  actions: {
    addList({ commit }, payload) {
      commit('ADD_LIST', payload.templateList);
    },
    clickWriteReview({ commit }, payload) {
      commit('WRITE_REVIEW', payload.writeReview);
    },
  },
};
