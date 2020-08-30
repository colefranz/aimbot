<template>
  <div class="main-menu">
    <AbLogo></AbLogo>
    <AbButtonGroup>
      <AbButton @click="openSettings()">Customize Settings</AbButton>
      <AbButton @click="goToGameView()" :primary="true">Time Trial</AbButton>
    </AbButtonGroup>
    <AbDialog v-if="settingsVisible">
      <SettingsDialog v-on:close="closeSettings()"></SettingsDialog>
    </AbDialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { actions } from "@stores/main-store";
import AbDialog from "@components/dialog.vue";
import SettingsDialog from "@components/settings-dialog.vue";
import AbButton from "@components/button.vue";
import AbButtonGroup from "@components/button-group.vue";
import AbLogo from "@components/logo.vue";

@Component({
  components: { AbButton, AbButtonGroup, AbLogo, SettingsDialog, AbDialog },
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
