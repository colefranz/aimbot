<template>
  <div class="target-stats">
    <Target :animated="false" :customWidth="150" class="target-stats__target">
      <div
        class="target-stats__hit-marker"
        v-for="(click, index) in clickStats"
        :key="index"
        :style="getStyle(click)"
      ></div>
    </Target>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Target from "@components/target.vue";
import { ClickStats } from "@stores/game-state-store";

@Component({ components: { Target } })
export default class TargetStats extends Vue {
  getStyle(click: ClickStats) {
    return {
      left: `${click.xOffsetPercentage * 100}%`,
      top: `${click.yOffsetPercentage * 100}%`,
    };
  }

  get clickStats() {
    return this.$store.state.gameState.clickStats;
  }
}
</script>

<style lang="scss">
.target-stats {
  position: relative;
  display: grid;
  align-items: center;
  justify-items: center;
}

.target-stats__hit-marker {
  position: absolute;
  background: $hit-marker-color;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  z-index: 1;
}

.target-stats__target {
  width: 150px;
  height: 150px;
}
</style>
