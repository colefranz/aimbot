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
      class="target__svg"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      v-on:animationend="finish('expired')"
      v-on:click.stop="finish('clicked')"
      :width="width"
      viewBox="0 0 32 32"
    >
      <circle ref="outerCircle" class="target__outer-circle" cx="16" cy="16" />
      <circle ref="innerCircle" class="target__inner-circle" cx="16" cy="16" />
    </svg>
  </div>
</template>

<script lang="ts">
import { actions } from "@stores/main-store";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class Target extends Vue {
  @Prop(String) targetId: string;
  @Prop(Boolean) gameEnded: boolean;
  top: number = 0;
  left: number = 0;

  $refs: {
    innerCircle;
    outerCircle;
    svg;
  };

  mounted() {
    const parentHeight = this.$parent.$el.clientHeight;
    const parentWidth = this.$parent.$el.clientWidth;
    this.top = Math.random() * (parentHeight - this.width - 80); // fixme 80 magic number
    this.left = Math.random() * (parentWidth - this.width - 80); // fixme 80 magic number
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

  @Watch("gameEnded")
  onLivesChanged(gameEnded: boolean) {
    if (gameEnded) {
      this.$refs.innerCircle.style.animationPlayState = "paused";
      this.$refs.outerCircle.style.animationPlayState = "paused";
    }
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
  pointer-events: none;
  overflow: visible;
}

.target__svg {
  overflow: visible;
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
