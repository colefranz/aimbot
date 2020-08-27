import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const DEFAULT_LIVES = 3;
const DEFAULT_TARGETS_PER_SECOND = 2;

export enum Views {
  MainMenu = 'MainMenu',
  GameView = 'GameView',
}

export enum actions {
  resetGame = 'resetGame',
  goToMainMenu = 'goToMainMenu',
  goToGameView = 'goToGameView',
  startGame = 'startGame',
  targetClicked = 'targetClicked',
  targetExpired = 'targetExpired',
}

export enum mutations {
  resetGameState = 'resetGameState',
  setCurrentView = 'setCurrentView',
  setStartTime = 'setStartTime',
  incrementScore = 'incrementScore',
  decrementLives = 'decrementLives',
}

export const mainStore = new Vuex.Store({
  state: {
    currentView: Views.MainMenu,
    gameState: {
      score: 0,
      lives: DEFAULT_LIVES,
      startTime: 0,
      accuracy: 100,
      targetsMissed: 0,
    },
    gameConfig: {
      targetsPerSecond: DEFAULT_TARGETS_PER_SECOND,
      accelerationEnabled: true,
      targetWidth: 70,
      lives: DEFAULT_LIVES,
    },
  },
  actions: {
    [actions.resetGame]({ commit }) {
      commit(mutations.resetGameState);
    },
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
    [mutations.resetGameState](state) {
      state.gameState.score = 0;
      state.gameState.lives = state.gameConfig.lives;
      state.gameState.accuracy = 0;
      state.gameState.targetsMissed = 0;
    },
    [mutations.setCurrentView](state, view: Views) {
      state.currentView = view;
    },
    [mutations.setStartTime](state, time: number) {
      state.gameState.startTime = time;
    },
    [mutations.incrementScore](state) {
      state.gameState.score++;
    },
    [mutations.decrementLives](state) {
      state.gameState.lives--;
    },
  },
});
