import Vue from 'vue';
import Vuex from 'vuex';
import { gameState } from '@stores/game-state-store';
import { gameConfig } from '@stores/game-config-store';
import { view } from '@stores/view-store';

Vue.use(Vuex);

export const mainStore = new Vuex.Store({
  modules: {
    gameState,
    view,
    gameConfig,
  },
});
