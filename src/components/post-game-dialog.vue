<template>
  <div class="post-game-dialog">
    <!-- It would be cool to put skull and crossbones here! -->
    <div class="post-game-dialog__game-over-banner">Game Over!</div>
    <div class="post-game-dialog__text-stats">
      <p class="post-game-dialog__stats-entry">Score: {{ $store.state.gameState.score }}</p>
      <p class="post-game-dialog__stats-entry">Lives: {{ $store.state.gameState.lives }}</p>
      <p class="post-game-dialog__stats-entry">Accuracy: {{ $store.getters[gameStateKeys.getters.accuracy] }}</p>
      <p class="post-game-dialog__stats-entry">Time: {{ $store.getters[gameStateKeys.getters.gameTime] }}</p>
    </div>
    <TargetStats class="post-game-dialog__target-stats"></TargetStats>
    <AbButtonGroup class="post-game-dailog__actions">
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
import TargetStats from "@components/target-stats.vue";
import HomeSvg from "@svg/icon-home.svg";
import ResetSvg from "@svg/icon-reset.svg";

@Component({
  components: { AbButton, AbButtonGroup, HomeSvg, ResetSvg, TargetStats },
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
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "text-stats target-stats"
    "footer footer";
}

.post-game-dialog__game-over-banner {
  grid-area: header;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 27px;
  border-bottom: 1px solid #fff;
}

.post-game-dialog__text-stats {
  grid-area: text-stats;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-auto-rows: min-content;
}

.post-game-dialog__target-stats {
  grid-area: target-stats;
}

.post-game-dialog .button-group {
  align-self: end;
}

.post-game-dialog__stats-entry {
  margin: 10px;
}

.post-game-dailog__actions {
  grid-area: footer;
}
</style>
