<template>
  <div class="target" :class="{ 'target--animated': animated }" v-bind:style="targetStyle">
    <svg
      ref="svg"
      class="target__svg"
      version="1.1"
      v-on:animationend="expired()"
      v-on:click.stop.prevent="clicked($event)"
      :width="width"
      viewBox="0 0 32 32"
    >
      <circle ref="outerCircle" class="target__outer-circle" cx="16" cy="16" />
      <circle ref="innerCircle" class="target__inner-circle" cx="16" cy="16" />
    </svg>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ClickStats } from "@stores/game-state-store";

@Component
export default class Target extends Vue {
  @Prop(String) targetId: string;
  @Prop(Boolean) gameEnded: boolean;
  @Prop({ type: Boolean, default: true }) animated: boolean;
  @Prop(Number) customWidth: number;
  top: number = 0;
  left: number = 0;

  $refs: {
    innerCircle: HTMLElement;
    outerCircle: HTMLElement;
    svg: HTMLElement;
  };

  mounted() {
    const parentHeight = this.$parent.$el.clientHeight;
    const parentWidth = this.$parent.$el.clientWidth;
    this.top = Math.random() * (parentHeight - this.width - 80); // fixme 80 magic number
    this.left = Math.random() * (parentWidth - this.width - 80); // fixme 80 magic number
  }

  clicked(event: MouseEvent) {
    const { x: elementX, y: elementY, width, height } = this.$refs.svg.getBoundingClientRect();
    const { x: eventX, y: eventY } = event;
    const clickStats: ClickStats = {
      xOffsetPercentage: (eventX - elementX) / width,
      yOffsetPercentage: (eventY - elementY) / height,
    };
    this.$emit("clicked", this.targetId, clickStats);
  }

  expired() {
    this.$emit("expired", this.targetId);
  }

  get width() {
    return this.customWidth || this.$store.state.gameConfig.targetWidth;
  }

  get targetStyle() {
    if (this.animated) {
      return {
        top: `${this.top}px`,
        left: `${this.left}px`,
      };
    }
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
$target-outside: $peach;
$target-inside: $light;

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
  position: relative;
  pointer-events: none;
  overflow: visible;
}

.target--animated {
  position: absolute;
  z-index: 1;

  .target__inner-circle {
    animation: inner-explosion 3s linear;
  }

  .target__outer-circle {
    animation: outer-explosion 3s linear;
  }
}

.target__svg {
  overflow: visible;
}

.target__inner-circle {
  r: 20%;
  pointer-events: initial;
  fill: $target-inside;
  stroke: $target-inside;
  stroke-width: 0px;
}

.target__outer-circle {
  r: 50%;
  pointer-events: initial;
  fill: $target-outside;
  stroke: $target-inside;
  stroke-width: 0px;
}
</style>
