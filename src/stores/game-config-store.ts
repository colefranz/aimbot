import Vue from 'vue';
import { namespaceify } from '@stores/namespaceify';

const DEFAULT_TARGETS_PER_SECOND = 2;
export const GAME_CONFIG_KEY = 'aimbot-game-config';

type GameConfig = {
  targetsPerSecond: number;
  accelerationEnabled: boolean;
  targetWidth: number;
};

function getSavedGameConfig(): GameConfig {
  return Object.assign(
    {
      targetsPerSecond: DEFAULT_TARGETS_PER_SECOND,
      accelerationEnabled: true,
      targetWidth: 70,
    },
    JSON.parse(window.localStorage.getItem(GAME_CONFIG_KEY))
  );
}

function getDefaultGameConfig(): GameConfig {
  return {
    targetsPerSecond: DEFAULT_TARGETS_PER_SECOND,
    accelerationEnabled: true,
    targetWidth: 70,
  };
}

export enum actions {
  goToGameView = 'goToGameView',
  goToMainMenu = 'goToMainMenu',
  resetGameConfig = 'resetGameConfig',
  updateTargetsPerSecond = 'updateTargetsPerSecond',
  updateTargetWidth = 'updateTargetWidth',
  updateAccelerationEnabled = 'updateAccelerationEnabled',
}

export enum mutations {
  setCurrentView = 'setCurrentView',
  setTargetsPerSecond = 'setTargetsPerSecond',
  setTargetWidth = 'setTargetWidth',
  setAccelerationEnabled = 'setAccelerationEnabled',
  setGameConfig = 'setGameConfig',
}

const namespace = 'gameConfig';
const keys = {
  actions,
  mutations,
};
export const gameConfigKeys = namespaceify(namespace, keys);

export const gameConfig = {
  namespaced: true,
  state: getSavedGameConfig(),
  actions: {
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
    [mutations.setTargetsPerSecond](state, targetsPerSecond) {
      state.targetsPerSecond = targetsPerSecond;
    },
    [mutations.setTargetWidth](state, targetWidth) {
      state.targetWidth = targetWidth;
    },
    [mutations.setAccelerationEnabled](state, accelerationEnabled) {
      state.accelerationEnabled = accelerationEnabled;
    },
    [mutations.setGameConfig](state, gameConfig) {
      Object.keys(gameConfig).forEach(key => {
        Vue.set(state, key, gameConfig[key]);
      });
    },
  },
};
