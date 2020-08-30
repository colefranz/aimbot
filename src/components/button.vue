<template>
  <button
    v-on:click.stop.prevent="$emit('click')"
    class="ab-button"
    :class="{ 'ab-button--primary': primary }"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Target from "@components/target.vue";

@Component
export default class AbButton extends Vue {
  @Prop(Boolean) primary: boolean;
}
</script>

<style lang="scss">
$button-color: $background-color;
$primary-button-color: $peach;

.ab-button {
  cursor: pointer;
  outline: none;
  border: none;
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
  height: 36px;
  color: $text-color;
  background: $button-color;
  box-shadow: 0px 2px 5px $border-color;
  margin: 8px;
  box-sizing: content-box;
  padding: 10px;
  border-radius: 5px;
}

.ab-button--primary {
  background: $primary-button-color;
}
</style>
