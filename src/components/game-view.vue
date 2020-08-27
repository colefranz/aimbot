<template>
  <div class="game-view">
    <div class="game-view__game-area">
      <Target
        v-for="targetId in targetIds"
        :key="targetId"
        v-on:expired="handleTargetExpired"
        v-on:clicked="handleTargetClicked"
        :targetId="targetId"
        :gameEnded="gameEnded"
      ></Target>
    </div>
    <div class="game-view__footer">
      <p>Score: {{ $store.state.gameState.score }}</p>
      <p>Lives: {{ $store.state.gameState.lives }}</p>
      <button v-on:click.stop="endGame()">Quit</button>
    </div>
    <PostGameDialog
      v-if="gameEnded"
      v-on:restart="restartGame"
    ></PostGameDialog>
  </div>
</template>

<script lang="ts">
import { actions } from "@stores/main-store";
import { Vue, Component, Watch } from "vue-property-decorator";
import Target from "./target.vue";
import PostGameDialog from "./post-game-dialog.vue";

@Component({
  components: { PostGameDialog, Target },
})
export default class GameView extends Vue {
  targetIds: string[] = [];
  timeout = null; // what's wrong with types?? No `Timeout`

  created() {
    this.startGame();
  }

  beforeDestroy() {
    this.stopProduction();
  }

  async startGame() {
    await this.$store.dispatch(actions.startGame);
    this.produceTarget();
  }

  async restartGame() {
    this.targetIds = [];
    await this.$store.dispatch(actions.resetGame);
    await this.startGame();
  }

  produceTarget() {
    const accelerationEnabled = this.$store.state.gameConfig
      .accelerationEnabled;
    const timeElapsed =
      new Date().getTime() - this.$store.state.gameState.startTime;
    const extraTargetsPerSecond = accelerationEnabled
      ? (timeElapsed / 30000) * 0.5
      : 0;
    const currentTimeBetween =
      1000 /
      (this.$store.state.gameConfig.targetsPerSecond + extraTargetsPerSecond);
    this.timeout = setTimeout(() => {
      function guid() {
        var s4 = function() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        };

        return s4() + s4();
      }
      this.targetIds.push(guid());
      this.produceTarget();
    }, currentTimeBetween);
  }

  stopProduction() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  endGame() {
    this.$store.dispatch(actions.goToMainMenu);
  }

  handleTargetClicked(targetId: string) {
    if (!this.gameEnded) {
      this.$store.dispatch(actions.targetClicked);
      this.spliceTarget(targetId);
    }
  }

  handleTargetExpired(targetId: string) {
    this.$store.dispatch(actions.targetExpired);
    this.spliceTarget(targetId);
  }

  spliceTarget(targetId: string) {
    const index = this.targetIds.indexOf(targetId);

    if (index !== -1) {
      const index = this.targetIds.indexOf(targetId);
      this.targetIds.splice(index, 1);
    }
  }

  get gameEnded() {
    return this.$store.state.gameState.lives <= 0;
  }

  @Watch("gameEnded")
  onLivesChanged(gameEnded: boolean) {
    if (gameEnded) {
      this.stopProduction();
    }
  }
}
</script>

<style lang="scss">
.game-view {
  position: relative;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: auto 80px;
  grid-template-areas:
    "game-area"
    "footer";
}

.game-view__game-area {
  position: relative;
  height: 100%;
  width: 100%;
  background: #a2a2c3;
  grid-area: game-area;
}

.game-view__footer {
  grid-area: footer;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-auto-flow: column;
}

.game-view__post-game-dialog {
  display: grid;
  grid-auto-rows: column;
  justify-items: center;
  align-items: center;
  width: 80%;
  height: 80%;
}
</style>
