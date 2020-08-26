import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

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
});
