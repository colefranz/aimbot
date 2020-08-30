import { namespaceify } from './namespaceify';

export enum Views {
  MainMenu = 'MainMenu',
  GameView = 'GameView',
}

export enum actions {
  goToGameView = 'goToGameView',
  goToMainMenu = 'goToMainMenu',
}

export enum mutations {
  setCurrentView = 'setCurrentView',
}

const namespace = 'view';
const keys = {
  actions,
  mutations,
};
export const viewKeys = namespaceify(namespace, keys);

export const view = {
  namespaced: true,
  state: {
    currentView: Views.MainMenu,
  },
  actions: {
    [actions.goToGameView]({ commit }) {
      commit(mutations.setCurrentView, Views.GameView);
    },
    [actions.goToMainMenu]({ commit }) {
      commit(mutations.setCurrentView, Views.MainMenu);
    },
  },
  mutations: {
    [mutations.setCurrentView](state, view: Views) {
      state.currentView = view;
    },
  },
};
