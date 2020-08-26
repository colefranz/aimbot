<template>
  <div
    class="target"
    v-bind:style="{
      top: `${this.top}px`,
      left: `${this.left}px`,
    }"
  >
    <svg
      ref="svg"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      v-on:animationend="finish('expired')"
      v-on:click.stop="finish('clicked')"
      :width="width"
      viewBox="0 0 32 32"
    >
      <circle class="target__outer-circle" cx="16" cy="16" r="14.5" />
      <circle class="target__inner-circle" cx="16" cy="16" r="5" />
    </svg>
  </div>
</template>

<script lang="ts">
import { actions } from "@stores/main-store";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Target extends Vue {
  @Prop(String) targetId: string;
  top: number = 0;
  left: number = 0;

  mounted() {
    const parentHeight = this.$parent.$el.clientHeight;
    const parentWidth = this.$parent.$el.clientWidth;
    this.top = Math.random() * (parentHeight - this.width - 80);
    this.left = Math.random() * (parentWidth - this.width - 80);
  }

  finish(event: string) {
    this.$emit(event, this.targetId);
  }

  get width() {
    return this.$store.state.gameConfig.targetWidth;
  }

  get targetStyle() {
    return {
      top: `${this.top}px`,
      left: `${this.left}px`,
    };
  }
}
</script>

<style lang="scss">
$target-green: green;

@keyframes inner-explosion {
  0%,
  100% {
    r: 0;
  }
  50% {
    r: 20%;
  }
}

@keyframes outer-explosion {
  0%,
  100% {
    r: 0;
  }
  50% {
    r: 50%;
  }
}

.target {
  position: absolute;
  z-index: 17000;
  pointer-events: none;
}

.target__inner-circle {
  pointer-events: initial;
  animation: inner-explosion 4s linear;
  fill: darken($target-green, 30%);
  stroke: darken($target-green, 30%);
}

.target__outer-circle {
  pointer-events: initial;
  animation: outer-explosion 4s linear;
  fill: $target-green;
  stroke: darken($target-green, 30%);
}
</style>
