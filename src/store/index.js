import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import user from './modules/user';
import template from './modules/template';
import review from './modules/review';

export default createStore({
  modules: {
    user,
    template,
    review,
  },
  plugins: [
    createPersistedState({
      paths: ['user', 'review'],
    }),
  ],
});
