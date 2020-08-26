import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export enum Views {
  MainMenu = 'MainMenu',
  GameView = 'GameView',
}

export enum actions {
  goToMainMenu = 'goToMainMenu',
  goToGameView = 'goToGameView',
  startGame = 'startGame',
  targetClicked = 'targetClicked',
  targetExpired = 'targetExpired',
}

export enum mutations {
  setCurrentView = 'setCurrentView',
  setStartTime = 'setStartTime',
  incrementScore = 'incrementScore',
  decrementLives = 'decrementLives',
}

export const mainStore = new Vuex.Store({
  state: {
    currentView: Views.MainMenu,
    score: 0,
    lives: 3,
    targetsMissed: 0,
    accuracy: 100,
    time: 0,
    startTime: 0,
    gameConfig: {
      targetsPerSecond: 2,
      accelerationEnabled: true,
      targetWidth: 70,
    },
  },
  actions: {
    [actions.goToGameView]({ commit }) {
      commit(mutations.setCurrentView, Views.GameView);
    },
    [actions.goToMainMenu]({ commit }) {
      commit(mutations.setCurrentView, Views.MainMenu);
    },
    [actions.startGame]({ commit }) {
      commit(mutations.setStartTime, new Date().getTime());
    },
    [actions.targetClicked]({ commit }) {
      commit(mutations.incrementScore);
    },
    [actions.targetExpired]({ commit }) {
      commit(mutations.decrementLives);
    },
  },
  mutations: {
    [mutations.setCurrentView](state, view: Views) {
      state.currentView = view;
    },
    [mutations.setStartTime](state, time: number) {
      state.startTime = time;
    },
    [mutations.incrementScore](state) {
      state.score++;
    },
    [mutations.decrementLives](state) {
      state.lives--;
    },
  },
});
