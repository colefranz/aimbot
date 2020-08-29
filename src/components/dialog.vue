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
$dialog-green: $green;
.slotted-dialog {
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
  background: $background-color;
  box-shadow: 0px 5px 20px $background-accent;
}
</style>
