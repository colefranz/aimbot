<template>
  <div class="settings-input">
    <label :for="name">{{ name }}</label>
    <input :name="name" :type="inputType" v-model="value" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Target from "@components/target.vue";

// ya so this is gonna need some work/total redo but it'll work for now
@Component
export default class SettingsInput extends Vue {
  @Prop(String) attribute: string;
  @Prop(String) storeAction: string;
  @Prop(String) inputType: string;
  @Prop(String) name: string;

  get value() {
    return this.$store.state.gameConfig[this.attribute];
  }

  set value(value) {
    // if it's an empty string set it to null
    value = value !== "" ? value : null;
    this.$store.dispatch(this.storeAction, this.TypeConstructor(value));
  }

  get TypeConstructor() {
    if (this.inputType === "number") return Number;
    if (this.inputType === "checkbox") return Boolean;

    throw new Error(`unhandled inputType ${this.inputType}`);
  }
}
</script>

<style lang="scss">
.settings-input {
  display: grid;
  align-items: center;
  grid-auto-flow: column;
}

.settings-input input {
  width: 70px;
  justify-self: end;
}

.settings-input input[type="checkbox"] {
  height: 24px;
}
</style>
