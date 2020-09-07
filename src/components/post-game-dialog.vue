<template>
  <div class="post-game-dialog">
    <!-- It would be cool to put skull and crossbones here! -->
    <div class="post-game-dialog__game-over-banner">Game Over!</div>
    <div class="post-game-dialog__stats">
      <p>Score: {{ $store.state.gameState.score }}</p>
      <p>Lives: {{ $store.state.gameState.lives }}</p>
      <p>Accuracy: {{ $store.getters[gameStateKeys.getters.accuracy] }}</p>
      <p>Time: {{ $store.getters[gameStateKeys.getters.gameTime] }}</p>
    </div>
    <AbButtonGroup>
      <AbButton @click="backToMainMenu()"><HomeSvg class="icon"></HomeSvg>Main Menu</AbButton>
      <AbButton @click="restartGame()" :primary="true"><ResetSvg class="icon"></ResetSvg>Play again</AbButton>
    </AbButtonGroup>
  </div>
</template>

<script lang="ts">
import { viewKeys } from "@stores/view-store";
import { gameStateKeys } from "@stores/game-state-store";
import { Vue, Component, Watch } from "vue-property-decorator";
import Target from "@components/target.vue";
import AbButton from "@components/button.vue";
import AbButtonGroup from "@components/button-group.vue";
import HomeSvg from "@svg/icon-home.svg";
import ResetSvg from "@svg/icon-reset.svg";

@Component({
  components: { AbButton, AbButtonGroup, HomeSvg, ResetSvg },
})
export default class PostGameDialog extends Vue {
  gameStateKeys = gameStateKeys;
  restartGame() {
    this.$emit("restart");
  }

  backToMainMenu() {
    this.$store.dispatch(viewKeys.actions.goToMainMenu);
  }
}
</script>

<style lang="scss">
.post-game-dialog {
  display: grid;
}

.post-game-dialog__stats {
  display: grid;
  grid-auto-rows: column;
  align-items: center;
  justify-items: center;
}

.post-game-dialog .button-group {
  align-self: end;
}

.post-game-dialog__game-over-banner {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 27px;
  border-bottom: 1px solid #fff;
}
</style>
