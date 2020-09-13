<template>
  <div class="game-stats">
    <p class="game-stats__entry">Score: {{ $store.state.gameState.score }}</p>
    <p class="game-stats__entry">Lives: {{ $store.state.gameState.lives }}</p>
    <p class="game-stats__entry">Accuracy: {{ $store.getters[gameStateKeys.getters.accuracy] }}</p>
    <p class="game-stats__entry">Time: {{ $store.getters[gameStateKeys.getters.gameTime] }}</p>
    <p class="game-stats__entry">Targets/s: {{ $store.getters[gameStateKeys.getters.targetsPerSecond] }}</p>
  </div>
</template>

<script lang="ts">
import { gameStateKeys } from "@stores/game-state-store";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class GameStats extends Vue {
  gameStateKeys = gameStateKeys;
}
</script>
