import Vue from "vue";
import Vuex from "vuex";
// @ts-ignore
import Aimbot from "@components/Aimbot";
import { mainStore } from "@stores/main-store";

new Vue({
  el: "#aimbot",
  render: (createElement) => createElement(Aimbot),
  store: mainStore
});
