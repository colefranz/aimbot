import Vue from 'vue';
import Vuex from 'vuex';
import { namespaceify } from './namespaceify';

Vue.use(Vuex);

const DEFAULT_LIVES = 3;

export type ClickStats = {
  xOffsetPercentage: number;
  yOffsetPercentage: number;
};

export enum getters {
  accuracy = 'accuracy',
  gameTime = 'gameTime',
}

export enum actions {
  resetGame = 'resetGame',
  startGameClock = 'startGameClock',
  updateGameTime = 'updateGameTime',
  targetClicked = 'targetClicked',
  targetExpired = 'targetExpired',
  clickMissed = 'clickMissed',
  endGame = 'endGame',
  newClickStats = 'addClickStats',
}

export enum mutations {
  resetGameState = 'resetGameState',
  setStartTime = 'setStartTime',
  setCurrentTime = 'setCurrentTime',
  incrementScore = 'incrementScore',
  decrementLives = 'decrementLives',
  setLives = 'setLives',
  incrementClicksMissed = 'incrementClicksMissed',
  addClickStats = 'addClickStats',
}

const namespace = 'gameState';
const keys = {
  getters,
  actions,
  mutations,
};

export const gameStateKeys = namespaceify(namespace, keys);

export const gameState = {
  namespaced: true,
  state: {
    score: 0,
    lives: DEFAULT_LIVES,
    startTime: 0,
    currentTime: 0,
    clicksMissed: 0,
    clickStats: [] as ClickStats[],
  },
  getters: {
    [getters.accuracy](state) {
      const hit = state.score;
      const missed = state.clicksMissed;
      const totalClicks = hit + missed;
      let accuracy = (hit / totalClicks) * 100;
      if (!Number.isFinite(accuracy)) {
        accuracy = 100;
      }
      return `${accuracy.toFixed(2)}%`;
    },
    [getters.gameTime](state) {
      const { startTime, currentTime } = state;
      const msElapsed = currentTime - startTime;

      const dateWithMsElapsed = new Date(0);
      dateWithMsElapsed.setMilliseconds(msElapsed);
      return dateWithMsElapsed.toISOString().substr(14, 5);
    },
  },
  actions: {
    [actions.resetGame]({ commit, rootState }) {
      commit(mutations.resetGameState);
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
    [actions.newClickStats]({ commit }, clickStats) {
      commit(mutations.addClickStats, clickStats);
    },
  },
  mutations: {
    [mutations.resetGameState](state) {
      state.score = 0;
      state.lives = DEFAULT_LIVES;
      state.clicksMissed = 0;
      state.clickStats = [];
    },
    [mutations.setStartTime](state, time: number) {
      state.startTime = time;
    },
    [mutations.setCurrentTime](state, time: number) {
      state.currentTime = time;
    },
    [mutations.incrementScore](state) {
      state.score++;
    },
    [mutations.decrementLives](state) {
      state.lives--;
    },
    [mutations.setLives](state, lives: number) {
      state.lives = lives;
    },
    [mutations.incrementClicksMissed](state) {
      state.clicksMissed++;
    },
    [mutations.addClickStats](state, clickStats: ClickStats) {
      state.clickStats.push(clickStats);
    },
  },
};
