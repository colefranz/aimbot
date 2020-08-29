import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const DEFAULT_LIVES = 3;
const DEFAULT_TARGETS_PER_SECOND = 2;

type GameConfig = {
  targetsPerSecond: number;
  accelerationEnabled: boolean;
  targetWidth: number;
  lives: number;
};

function getDefaultGameConfig(): GameConfig {
  return {
    targetsPerSecond: DEFAULT_TARGETS_PER_SECOND,
    accelerationEnabled: true,
    targetWidth: 70,
    lives: DEFAULT_LIVES,
  };
}

export enum Views {
  MainMenu = 'MainMenu',
  GameView = 'GameView',
}

export enum getters {
  accuracy = 'accuracy',
  gameTime = 'gameTime',
}

export enum actions {
  resetGame = 'resetGame',
  goToMainMenu = 'goToMainMenu',
  goToGameView = 'goToGameView',
  startGameClock = 'startGameClock',
  updateGameTime = 'updateGameTime',
  targetClicked = 'targetClicked',
  targetExpired = 'targetExpired',
  clickMissed = 'clickMissed',
  endGame = 'endGame',
  resetGameConfig = 'resetGameConfig',
  updateTargetsPerSecond = 'updateTargetsPerSecond',
  updateTargetWidth = 'updateTargetWidth',
  updateAccelerationEnabled = 'updateAccelerationEnabled',
}

export enum mutations {
  resetGameState = 'resetGameState',
  setCurrentView = 'setCurrentView',
  setStartTime = 'setStartTime',
  setCurrentTime = 'setCurrentTime',
  incrementScore = 'incrementScore',
  decrementLives = 'decrementLives',
  setLives = 'setLives',
  incrementClicksMissed = 'incrementClicksMissed',
  setTargetsPerSecond = 'setTargetsPerSecond',
  setTargetWidth = 'setTargetWidth',
  setAccelerationEnabled = 'setAccelerationEnabled',
  setGameConfig = 'setGameConfig',
}

export const mainStore = new Vuex.Store({
  state: {
    currentView: Views.MainMenu,
    gameState: {
      score: 0,
      lives: DEFAULT_LIVES,
      startTime: 0,
      currentTime: 0,
      clicksMissed: 0,
    },
    gameConfig: getDefaultGameConfig(),
  },
  getters: {
    [getters.accuracy](state) {
      const hit = state.gameState.score;
      const missed = state.gameState.clicksMissed;
      const totalClicks = hit + missed;
      let accuracy = (hit / totalClicks) * 100;
      if (!Number.isFinite(accuracy)) {
        accuracy = 100;
      }
      return `${accuracy.toFixed(2)}%`;
    },
    [getters.gameTime](state) {
      const { startTime, currentTime } = state.gameState;
      const msElapsed = currentTime - startTime;

      const dateWithMsElapsed = new Date(0);
      dateWithMsElapsed.setMilliseconds(msElapsed);
      return dateWithMsElapsed.toISOString().substr(14, 5);
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
    [actions.startGameClock]({ commit }) {
      commit(mutations.setStartTime, new Date().getTime());
      commit(mutations.setCurrentTime, new Date().getTime());
    },
    [actions.updateGameTime]({ commit }) {
      commit(mutations.setCurrentTime, new Date().getTime());
    },
    [actions.targetClicked]({ commit }) {
      commit(mutations.incrementScore);
    },
    [actions.targetExpired]({ commit }) {
      commit(mutations.decrementLives);
    },
    [actions.clickMissed]({ commit }) {
      commit(mutations.incrementClicksMissed);
    },
    [actions.endGame]({ commit }) {
      commit(mutations.setLives, 0);
    },
    [actions.resetGameConfig]({ commit }) {
      commit(mutations.setGameConfig, getDefaultGameConfig());
    },
    [actions.updateTargetsPerSecond]({ commit }, value) {
      commit(mutations.setTargetsPerSecond, value);
    },
    [actions.updateTargetWidth]({ commit }, value) {
      commit(mutations.setTargetWidth, value);
    },
    [actions.updateAccelerationEnabled]({ commit }, value) {
      commit(mutations.setAccelerationEnabled, value);
    },
  },
  mutations: {
    [mutations.resetGameState](state) {
      state.gameState.score = 0;
      state.gameState.lives = state.gameConfig.lives;
      state.gameState.clicksMissed = 0;
    },
    [mutations.setCurrentView](state, view: Views) {
      state.currentView = view;
    },
    [mutations.setStartTime](state, time: number) {
      state.gameState.startTime = time;
    },
    [mutations.setCurrentTime](state, time: number) {
      state.gameState.currentTime = time;
    },
    [mutations.incrementScore](state) {
      state.gameState.score++;
    },
    [mutations.decrementLives](state) {
      state.gameState.lives--;
    },
    [mutations.setLives](state, lives: number) {
      state.gameState.lives = lives;
    },
    [mutations.incrementClicksMissed](state) {
      state.gameState.clicksMissed++;
    },
    [mutations.setTargetsPerSecond](state, targetsPerSecond) {
      state.gameConfig.targetsPerSecond = targetsPerSecond;
    },
    [mutations.setTargetWidth](state, targetWidth) {
      state.gameConfig.targetWidth = targetWidth;
    },
    [mutations.setAccelerationEnabled](state, accelerationEnabled) {
      state.gameConfig.accelerationEnabled = accelerationEnabled;
    },
    [mutations.setGameConfig](state, gameConfig) {
      Vue.set(state, 'gameConfig', gameConfig);
    },
  },
});
