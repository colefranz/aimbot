<template>
  <div class="button-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class AbButtonGroup extends Vue {}
</script>

<style lang="scss">
.button-group {
  display: grid;
  grid-auto-flow: column;
}
</style>
