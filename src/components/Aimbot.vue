<template>
  <div id="aimbot">
    {{ helloWorld() }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default class Aimbot extends Vue {
  helloWorld() {
    return this.$store.state.lives;
  }
}
</script>

<style lang="scss">
#aimbot {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #c2a2a2;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
