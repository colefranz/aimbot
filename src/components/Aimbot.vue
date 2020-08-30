<template>
  <div id="aimbot">
    <GameView v-if="displayGameView()"></GameView>
    <MainMenu v-else></MainMenu>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import GameView from "@components/game-view.vue";
import MainMenu from "@components/main-menu.vue";
import { Views } from "@stores/view-store";

@Component({
  components: { GameView, MainMenu },
})
export default class Aimbot extends Vue {
  displayGameView() {
    return this.$store.state.view.currentView === Views.GameView;
  }
}
</script>

<style lang="scss">
:root {
  font-family: Roboto, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: $background-color;

  --app-height: 600px;
  --app-width: 600px;
}

body {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  justify-items: center;
  align-items: center;
}

* {
  box-sizing: border-box;
}

#aimbot {
  display: grid;
  justify-items: center;
  align-items: center;
  // how do we want to control this?
  height: var(--app-height);
  width: var(--app-width);
}

svg {
  fill: $navy;
}
</style>
