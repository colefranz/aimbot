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
      <AbButton @click="resetConfig()">Reset Config</AbButton>
      <AbButton @click="$emit('close')" :primary="true"
        >Back to main menu</AbButton
      >
    </AbButtonGroup>
  </div>
</template>

<script lang="ts">
import { actions } from "@stores/main-store";
import { Vue, Component, Watch } from "vue-property-decorator";
import SettingsInput from "@components/settings-input.vue";
import AbButton from "@components/button.vue";
import AbButtonGroup from "@components/button-group.vue";

@Component({
  components: { AbButton, AbButtonGroup, SettingsInput },
})
export default class SettingsDialog extends Vue {
  resetConfig() {
    this.$store.dispatch(actions.resetGameConfig);
  }

  get settings() {
    return [
      {
        attribute: "targetsPerSecond",
        storeAction: actions.updateTargetsPerSecond,
        inputType: "number",
        name: "Targets Per Second",
      },
      {
        attribute: "targetWidth",
        storeAction: actions.updateTargetWidth,
        inputType: "number",
        name: "Target Width (px)",
      },
      {
        attribute: "accelerationEnabled",
        storeAction: actions.updateAccelerationEnabled,
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
  color: #fff;
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
