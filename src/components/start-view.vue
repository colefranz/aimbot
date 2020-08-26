<template>
  <div id="start-view">
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
export default class StartView extends Vue {
  startGame() {
    this.$store.dispatch(actions.startGame);
  }

  displayCustomSettings() {
    console.log('displayCustomSettings');
  }
}
</script>

<style lang="scss">
.start-view {
  display: flex;
  flex-direction: column;
}
.start-view__buttons {
  display: flex;
  flex-direction: column;
}
</style>
