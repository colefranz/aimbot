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
    <div class="settings-dialog__buttons">
      <button v-on:click.stop="$emit('close')">Back to main menu</button>
    </div>
  </div>
</template>

<script lang="ts">
import { actions } from "@stores/main-store";
import { Vue, Component, Watch } from "vue-property-decorator";
import SettingsInput from "@components/settings-input.vue";

@Component({
  components: { SettingsInput },
})
export default class SettingsDialog extends Vue {
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
  display: contents;
}
</style>
