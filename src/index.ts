import Vue from "vue";
import Vuex from "vuex";
import Aimbot from "@components/aimbot.vue";
import { mainStore } from "@stores/main-store";

new Vue({
  el: "#aimbot",
  render: (createElement) => createElement(Aimbot),
  store: mainStore
});
