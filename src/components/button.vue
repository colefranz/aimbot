<template>
  <button v-on:click.stop.prevent="$emit('click')" class="ab-button" :class="{ 'ab-button--primary': primary }">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { actions } from "@stores/main-store";
import { Vue, Component, Prop } from "vue-property-decorator";
import Target from "@components/target.vue";

@Component
export default class AbButton extends Vue {
  @Prop(Boolean) primary: boolean;
}
</script>

<style lang="scss">
$primary-button-color: $gold;

.ab-button {
  cursor: pointer;
  outline: none;
  border: none;
  height: 36px;
  line-height: 16px;
  padding: 10px;
  font-size: 16px;
  color: $text-color;
}

.ab-button--primary {
  background: $primary-button-color;
}
</style>
