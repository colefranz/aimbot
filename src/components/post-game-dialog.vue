<template>
  <div class="post-game-dialog">
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
.post-game-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-auto-rows: column;
  justify-items: center;
  align-items: center;
  width: 80%;
  height: 80%;
  background: aquamarine;
}
</style>
