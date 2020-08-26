<template>
  <div id="aimbot">
    <!-- Ghetto router -->
    <GameView v-if="inGame()"></GameView>
    <StartView v-else></StartView>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import GameView from "@components/game-view.vue";
import StartView from "@components/start-view.vue";

@Component({
  components: { GameView, StartView }
})
export default class Aimbot extends Vue {
  inGame() {
    return this.$store.state.inGame;
  }
}
</script>

<style lang="scss">
#aimbot {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #c2a2a2;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
