<template>
  <div class="post-game-dialog">
    <div class="post-game-dialog__game-over-banner"></div>
    <div class="post-game-dialog__stats">
      <p>Score: {{ $store.state.gameState.score }}</p>
      <p>Lives: {{ $store.state.gameState.lives }}</p>
      <p>Accuracy: {{ $store.getters.accuracy }}</p>
      <p>Time: {{ $store.getters.gameTime }}</p>
    </div>
    <button v-on:click.stop="restartGame()">Play again?</button>
    <button v-on:click.stop="backToMainMenu()">Back to main menu</button>
  </div>
</template>

<script lang="ts">
import { actions } from "@stores/main-store";
import { Vue, Component, Watch } from "vue-property-decorator";
import Target from "./target.vue";

@Component
export default class PostGameDialog extends Vue {
  restartGame() {
    this.$emit("restart");
  }

  backToMainMenu() {
    this.$store.dispatch(actions.goToMainMenu);
  }
}
</script>

<style lang="scss">
.post-game-dialog__stats {
  display: grid;
  grid-auto-rows: column;
  justify-items: center;
  align-items: center;
}
</style>
