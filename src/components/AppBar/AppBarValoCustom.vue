<template>
  <div>
    <app-bar
      :title="title"
      :items="items"
      :isProminent="isProminent"
      isFixed
    ></app-bar>
    <div
      :class="isProminent ? 'header-spacer-prominent' : 'header-spacer'"
    ></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppBar from "./AppBar.vue";
import { AppBarItem } from "./AppBarInterfaces";

export default Vue.extend({
  name: "AppBarValoCustom",
  components: { AppBar },
  props: {
    title: {
      type: String,
      required: false,
      default: "Valorant Map Picker",
    },
    isProminent: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    items: [
      { label: "Home", icon: "mdi-home", link: "/home" },
      { label: "Random Map", icon: "mdi-dice-6", link: "/random" },
      {
        label: "Pick/Ban: Best of 1 ",
        icon: "mdi-trophy-award",
        link: "/bestOfOne",
      },
      {
        label: "Pick/Ban: Best of 3",
        icon: "mdi-trophy",
        link: "/bestOfThree",
      },
      { label: "Online", icon: "mdi-web", link: "/online" },
      { label: "Random Teams", icon: "mdi-account-switch", link: "/teams" },
    ] as AppBarItem[],
  }),
});
</script>

<style scoped lang="scss">
.header-spacer-prominent {
  padding: 70px;
}
.header-spacer {
  padding: 40px;
}
</style>
