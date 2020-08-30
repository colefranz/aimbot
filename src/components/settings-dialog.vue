<template>
  <div class="settings-dialog">
    <div class="settings-dialog__settings">
      <!-- infinite lives option? -->
      <SettingsInput
        v-for="setting in settings"
        :key="setting.name"
        :attribute="setting.attribute"
        :storeAction="setting.storeAction"
        :inputType="setting.inputType"
        :name="setting.name"
      ></SettingsInput>
    </div>
    <AbButtonGroup>
      <AbButton @click="saveAsDefaults()" title="Save as Defaults">Save as Defaults</AbButton>
      <AbButton @click="resetConfig()" title="Reset Config"><ResetSvg />Reset Config</AbButton>
      <AbButton @click="$emit('close')" :primary="true"><HomeSvg />Main Menu</AbButton>
    </AbButtonGroup>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { gameConfigKeys, GAME_CONFIG_KEY } from "@stores/game-config-store";
import SettingsInput from "@components/settings-input.vue";
import AbButton from "@components/button.vue";
import AbButtonGroup from "@components/button-group.vue";
import HomeSvg from "@svg/icon-home.svg";
import ResetSvg from "@svg/icon-reset.svg";

@Component({
  components: { AbButton, AbButtonGroup, HomeSvg, ResetSvg, SettingsInput },
})
export default class SettingsDialog extends Vue {
  resetConfig() {
    this.$store.dispatch(gameConfigKeys.actions.resetGameConfig);
  }

  saveAsDefaults() {
    window.localStorage.setItem(GAME_CONFIG_KEY, JSON.stringify(this.$store.state.gameConfig));
  }

  get settings() {
    return [
      {
        attribute: "targetsPerSecond",
        storeAction: gameConfigKeys.actions.updateTargetsPerSecond,
        inputType: "number",
        name: "Targets/Second",
      },
      {
        attribute: "targetWidth",
        storeAction: gameConfigKeys.actions.updateTargetWidth,
        inputType: "number",
        name: "Target Width (px)",
      },
      {
        attribute: "accelerationEnabled",
        storeAction: gameConfigKeys.actions.updateAccelerationEnabled,
        inputType: "checkbox",
        name: "Acceleration Enabled",
      },
    ];
  }
}
</script>

<style lang="scss">
.settings-dialog {
  display: grid;
}

.settings-dialog .button-group {
  align-self: end;
}

.settings-dialog .ab-button {
  box-shadow: 0px 2px 5px black;
}

.settings-dialog__settings {
  display: grid;
  grid-auto-flow: row;
}
</style>
