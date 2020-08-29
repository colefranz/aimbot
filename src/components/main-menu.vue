<template>
  <div class="main-menu">
    <div class="start-view__buttons">
      <button v-on:click.stop="goToGameView()">Time Trial</button>
      <button v-on:click.stop="openSettings()">Customize Settings</button>
    </div>
    <SlottedDialog v-if="settingsVisible">
      <SettingsDialog v-on:close="closeSettings()"></SettingsDialog>
    </SlottedDialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { actions } from "@stores/main-store";
import SlottedDialog from "@components/slotted-dialog.vue";
import SettingsDialog from "@components/settings-dialog.vue";

@Component({
  components: { SettingsDialog, SlottedDialog },
})
export default class MainMenu extends Vue {
  settingsVisible = false;

  goToGameView() {
    this.$store.dispatch(actions.goToGameView);
  }

  openSettings() {
    this.settingsVisible = true;
  }

  closeSettings() {
    this.settingsVisible = false;
  }
}
</script>

<style lang="scss">
.main-menu {
  position: relative;
  height: 100%;
  width: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-auto-flow: column;
}
</style>
