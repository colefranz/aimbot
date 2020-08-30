<template>
  <div class="post-game-dialog">
    <div class="post-game-dialog__game-over-banner"></div>
    <div class="post-game-dialog__stats">
      <p>Score: {{ $store.state.gameState.score }}</p>
      <p>Lives: {{ $store.state.gameState.lives }}</p>
      <p>Accuracy: {{ $store.getters.accuracy }}</p>
      <p>Time: {{ $store.getters.gameTime }}</p>
    </div>
    <AbButtonGroup>
      <AbButton @click="backToMainMenu()">Back to main menu</AbButton>
      <AbButton @click="restartGame()" :primary="true">Play again?</AbButton>
    </AbButtonGroup>
  </div>
</template>

<script lang="ts">
import { actions } from "@stores/main-store";
import { Vue, Component, Watch } from "vue-property-decorator";
import Target from "@components/target.vue";
import AbButton from "@components/button.vue";
import AbButtonGroup from "@components/button-group.vue";

@Component({
  components: { AbButton, AbButtonGroup },
})
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
