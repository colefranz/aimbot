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
      <div class="game-view__lives">
        <HeartSVG
          v-for="heartNumber in 3"
          class="game-view__life"
          :key="heartNumber"
          :class="{ 'game-view__life--missing': heartNumber > currentLives }"
        ></HeartSVG>
      </div>
    </div>
    <footer class="game-view__footer">
      <p>Score: {{ $store.state.gameState.score }}</p>
      <p>Lives: {{ $store.state.gameState.lives }}</p>
      <p>Accuracy: {{ $store.getters[gameStateKeys.getters.accuracy] }}</p>
      <p>Time: {{ $store.getters[gameStateKeys.getters.gameTime] }}</p>
      <p>Targets/s: {{ $store.getters[gameStateKeys.getters.targetsPerSecond] }}</p>
    </footer>
    <AbDialog v-if="gameEnded">
      <PostGameDialog v-on:restart="startGame"></PostGameDialog>
    </AbDialog>
  </div>
</template>

<script lang="ts">
import { gameStateKeys } from "@stores/game-state-store";
import { viewKeys } from "@stores/view-store";
import { Vue, Component, Watch } from "vue-property-decorator";
import Target from "./target.vue";
import PostGameDialog from "./post-game-dialog.vue";
import AbDialog from "./dialog.vue";
import AbButton from "@components/button.vue";
import HeartSVG from "@svg/icon-heart.svg";
import popWav from "@sounds/pop.wav";
import wooshWav from "@sounds/woosh.wav";

@Component({
  components: { AbButton, PostGameDialog, AbDialog, HeartSVG, Target },
})
export default class GameView extends Vue {
  targetIds: string[] = [];
  // what's wrong with types?? No `Timeout`
  targetProductionTimeout = null;
  clockTickTimeout = null;
  gameStateKeys = gameStateKeys;

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
    await this.$store.dispatch(gameStateKeys.actions.resetGame);
    this.produceTarget();
  }

  async startClock() {
    await this.$store.dispatch(gameStateKeys.actions.startGameClock);
    this.tickClock();
  }

  tickClock() {
    // should really only need to check every second but that could lead
    // to ugly behaviour as we miss by ms each time
    this.clockTickTimeout = setTimeout(() => {
      this.$store.dispatch(gameStateKeys.actions.updateGameTime);
      this.tickClock();
    }, 64);
  }

  produceTarget() {
    const accelerationEnabled = this.$store.state.gameConfig.accelerationEnabled;
    const timeElapsed = new Date().getTime() - this.$store.state.gameState.startTime;
    const extraTargetsPerSecond = accelerationEnabled ? (timeElapsed / 30000) * 0.5 : 0;
    const targetsPerSecond = this.$store.state.gameConfig.targetsPerSecond + extraTargetsPerSecond;
    this.$store.dispatch(gameStateKeys.actions.updateTargetsPerSecond, targetsPerSecond); // TODO redo this !! yucK!! eww!!
    const currentTimeBetween = 1000 / targetsPerSecond;
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
    this.$store.dispatch(gameStateKeys.actions.endGame);
  }

  goToMainMenu() {
    this.$store.dispatch(viewKeys.actions.goToMainMenu);
  }

  handleTargetClicked(targetId: string, clickStats) {
    if (!this.gameEnded) {
      const popSound = new Audio(popWav as any);
      popSound.play();

      this.$store.dispatch(gameStateKeys.actions.targetClicked);
      this.$store.dispatch(gameStateKeys.actions.newClickStats, clickStats);
      this.spliceTarget(targetId);
    }
  }

  handleTargetExpired(targetId: string) {
    this.$store.dispatch(gameStateKeys.actions.targetExpired);
    this.spliceTarget(targetId);
  }

  targetMissed() {
    if (!this.gameEnded) {
      const wooshSound = new Audio(wooshWav as any);
      wooshSound.play();
      this.$store.dispatch(gameStateKeys.actions.clickMissed);
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
      event.preventDefault();
      this.endGame();
    }
  }

  get currentLives() {
    return this.$store.state.gameState.lives;
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
  * {
    user-select: none;
  }
}

.game-view__game-area {
  position: relative;
  height: 100%;
  width: 100%;
  background: $game-background-color;
  grid-area: game-area;
  background-size: 40px 40px;
  background-image: linear-gradient(to right, rgba($light, 0.3), transparent 1px),
    linear-gradient(to bottom, rgba($light, 0.3) 1px, transparent 1px);
}

.game-view__footer {
  grid-area: footer;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-auto-flow: column;
}

.game-view__lives {
  position: absolute;
  z-index: 0;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
}

.game-view__life {
  width: 48px;
  height: 48px;
  opacity: 0.5;
  margin: 5px;
  path {
    stroke: $light;
    fill: $light;
  }
}

.game-view__life--missing {
  path {
    fill: none;
  }
}
</style>
