<template>
  <div class="slotted-dialog">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class AbDialog extends Vue {}
</script>

<style lang="scss">
$dialog-green: $peach;
.slotted-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-auto-rows: column;
  padding: 30px;
  width: 80%;
  height: 80%;
  background: $game-background-color;
  box-shadow: 0px 5px 20px $background-accent;
  color: #fff;
  border: 1px solid $light;
  border-radius: 10px;
}
</style>
