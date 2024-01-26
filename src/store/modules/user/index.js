export default {
  namespaced: true,
  state: {
    login: false,
    name: '',
    phoneNumber: '',
    email: '',
    profile: '',
    role: '',
  },
  mutations: {
    USER_STATUS(state, payload) {
      state.login = payload;
    },
    USER_NAME(state, payload) {
      state.name = payload;
    },
    USER_NUMBER(state, payload) {
      state.phoneNumber = payload;
    },
    USER_EMAIL(state, payload) {
      state.email = payload;
    },
    USER_PROFILE(state, payload) {
      state.profile = payload;
    },
    USER_ROLE(state, payload) {
      state.role = payload;
    },
  },
  actions: {
    loginUser({ commit }, payload) {
      commit('USER_STATUS', payload.login);
      commit('USER_NAME', payload.name);
      commit('USER_NUMBER', payload.phoneNumber);
      commit('USER_EMAIL', payload.email);
      commit('USER_PROFILE', payload.profile);
      commit('USER_ROLE', payload.role);
    },
  },
};
