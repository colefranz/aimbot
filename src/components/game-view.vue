<template>
  <div class="game-view">
    <div class="game-view__game-area">
      <Target
        v-for="targetId in targetIds"
        :key="targetId"
        v-on:expired="handleTargetExpired"
        v-on:clicked="handleTargetClicked"
        :targetId="targetId"
      ></Target>
    </div>
    <div class="game-view__footer">
      <p>Score: {{ $store.state.score }}</p>
      <p>Lives: {{ $store.state.lives }}</p>
      <button v-on:click.stop="endGame()">Quit</button>
    </div>
  </div>
</template>

<script lang="ts">
import { actions } from "@stores/main-store";
import { Vue, Component } from "vue-property-decorator";
import Target from "./target.vue";

@Component({
  components: { Target },
})
export default class GameView extends Vue {
  targetIds: string[] = [];
  timeout = null; // what's wrong with types?? No `Timeout`

  created() {
    this.$store.dispatch(actions.startGame);
    this.spawnTarget();
  }

  beforeDestroy() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  spawnTarget() {
    const accelerationEnabled = this.$store.state.gameConfig
      .accelerationEnabled;
    const timeElapsed = new Date().getTime() - this.$store.state.startTime;
    const ratioForTime = accelerationEnabled ? 1 : 1; // figure out a good ratio for acceleration
    const currentTimeBetween =
      1000 / this.$store.state.gameConfig.targetsPerSecond;
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
      this.spawnTarget();
    }, currentTimeBetween);
  }

  endGame() {
    this.$store.dispatch(actions.goToMainMenu);
  }

  handleTargetClicked(targetId: string) {
    this.$store.dispatch(actions.targetClicked);
    this.spliceTarget(targetId);
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
}
</script>

<style lang="scss">
.game-view {
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
  grid-auto-flow: column;
}
</style>
