<template>
  <div id="game-view">
      <button v-on:click.stop="endGame()">Quit</button>
  </div>
</template>

<script lang="ts">
import { actions } from "@stores/main-store";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class GameView extends Vue {
  endGame() {
    this.$store.dispatch(actions.endGame);
  }
}
</script>

<style lang="scss">
</style>
