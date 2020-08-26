import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const actions = {
    startGame: 'startGame',
    endGame: 'endGame'
};

export const mutations = {
    setInGame: 'setInGame'
};

export const mainStore = new Vuex.Store({
  state: {
    inGame: false,
    score: {
      value: 0,
    },
    lives: {
      value: 3,
    },
    targetsMissed: {
      value: 0,
    },
    accuracy: {
      value: 100,
    },
    time: {
      value: 0,
    },
  },
  actions: {
    [actions.startGame]({ commit }) {
      commit(mutations.setInGame, true);
    },
    [actions.endGame]({ commit }) {
      commit(mutations.setInGame, false);
    },
  },
  mutations: {
    [mutations.setInGame](state, inGame) {
      state.inGame = inGame;
    },
  },
});
