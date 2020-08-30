<template>
  <svg viewBox="00 0 32 20" class="ab-logo">
    <rect rx="2" ry="2" y="2" x="0" height="12" width="4" transform="rotate(25, 2, 6)" />
    <rect rx="2" ry="2" y="5" x="3" height="12" width="4" transform="rotate(25, 2, 6)" />
    <rect rx="2" ry="2" y="4" x="8" height="12" width="4" transform="rotate(25, 2, 6)" />
    <rect rx="2" ry="2" y="2" x="13.5" height="12" width="4" transform="rotate(25, 2, 6)" />
    <rect rx="2" ry="2" y="4" x="17" height="12" width="4" transform="rotate(25, 2, 6)" />
    <rect rx="2" ry="2" y="2" x="22.5" height="12" width="4" transform="rotate(25, 2, 6)" />
  </svg>
</template>

<script lang="ts">
import { actions } from "@stores/main-store";
import { Vue, Component, Prop } from "vue-property-decorator";
import Target from "@components/target.vue";

@Component
export default class AbButton extends Vue {
  @Prop(Number) width: number; // maybe just small/medium/large?
  @Prop(Number) height: number;
}
</script>

<style lang="scss">
.ab-logo {
  width: 480px;
}

.ab-logo rect {
  transform-box: fill-box;
  transform-origin: center;
  stroke: $peach;
  fill: $peach;
  fill-opacity: 1;
  opacity: 1;
  stroke-width: 0.5;
  stroke-opacity: 1;

  &:nth-child(1) {
    fill: $light;
  }

  &:nth-child(2) {
    fill: $accent;
  }

  &:nth-child(3) {
    fill: $navy;
  }

  &:nth-child(4) {
    fill: $peach;
  }

  &:nth-child(5) {
    fill: $light;
  }

  &:nth-child(6) {
    fill: $navy;
  }
}
</style>
