<template>
  <div class="game-view">
    <div class="game-view__game-area" v-on:click.stop.prevent="targetMissed()">
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
      <p>Accuracy: {{ $store.getters.accuracy }}</p>
      <p>Time: {{ $store.getters.gameTime }}</p>
      <button v-on:click.stop.prevent="endGame()">Quit</button>
    </div>
    <PostGameDialog v-if="gameEnded" v-on:restart="startGame"></PostGameDialog>
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
  // what's wrong with types?? No `Timeout`
  targetProductionTimeout = null;
  clockTickTimeout = null;

  created() {
    document.addEventListener("keydown", this.onKeyDown);
    this.startGame();
  }

  beforeDestroy() {
    this.stopIntervals();
  }

  async startGame() {
    this.targetIds = [];
    await this.startClock();
    await this.$store.dispatch(actions.resetGame);
    this.produceTarget();
  }

  async startClock() {
    await this.$store.dispatch(actions.startGameClock);
    this.tickClock();
  }

  tickClock() {
    // should really only need to check every second but that could lead
    // to ugly behaviour as we miss by ms each time
    this.clockTickTimeout = setTimeout(() => {
      this.$store.dispatch(actions.updateGameTime);
      this.tickClock();
    }, 64);
  }

  produceTarget() {
    const accelerationEnabled = this.$store.state.gameConfig.accelerationEnabled;
    const timeElapsed = new Date().getTime() - this.$store.state.gameState.startTime;
    const extraTargetsPerSecond = accelerationEnabled ? (timeElapsed / 30000) * 0.5 : 0;
    const currentTimeBetween = 1000 / (this.$store.state.gameConfig.targetsPerSecond + extraTargetsPerSecond);
    this.targetProductionTimeout = setTimeout(() => {
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

  stopIntervals() {
    if (this.targetProductionTimeout) {
      clearTimeout(this.targetProductionTimeout);
    }
    if (this.clockTickTimeout) {
      clearTimeout(this.clockTickTimeout);
    }
  }

  endGame() {
    this.$store.dispatch(actions.endGame);
  }

  goToMainMenu() {
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

  targetMissed() {
    if (!this.gameEnded) {
      this.$store.dispatch(actions.clickMissed);
    }
  }

  spliceTarget(targetId: string) {
    const index = this.targetIds.indexOf(targetId);

    if (index !== -1) {
      const index = this.targetIds.indexOf(targetId);
      this.targetIds.splice(index, 1);
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.endGame();
    }
  }

  get gameEnded() {
    return this.$store.state.gameState.lives <= 0;
  }

  @Watch("gameEnded")
  onGameEndedChanged(gameEnded: boolean) {
    if (gameEnded) {
      this.stopIntervals();
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
