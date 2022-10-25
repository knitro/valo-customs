<template>
  <v-app>
    <app-bar :title="appBarTitle" :items="appBarItems"></app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppBar from "./components/AppBar/AppBar.vue";
import { AppBarItem } from "./components/AppBar/AppBarInterfaces";

export default Vue.extend({
  name: "App",
  data: () => ({
    appBarTitle: "Valorant Map Picker",
    appBarItems: [
      { label: "Home", icon: "mdi-home", link: "/home" },
      { label: "Random", icon: "mdi-dice-6", link: "/random" },
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
    ] as AppBarItem[],
  }),
  components: { AppBar },
});
</script>
