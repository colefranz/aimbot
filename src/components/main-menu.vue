<template>
  <div class="main-menu">
    <div class="start-view__buttons">
      <button v-on:click.stop="startGame()">Time Trial</button>
      <button v-on:click.stop="displayCustomSettings()">Custom Mode</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { actions } from "@stores/main-store";

@Component
export default class MainMenu extends Vue {
  startGame() {
    this.$store.dispatch(actions.goToGameView);
  }
}
</script>

<style lang="scss">
.main-menu {
  display: flex;
  flex-direction: column;
}
.start-view__buttons {
  display: flex;
  flex-direction: column;
}
</style>
