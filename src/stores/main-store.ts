import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const mainStore = new Vuex.Store({
    state: {
        helloWorld: 'hello world!'
    },
});