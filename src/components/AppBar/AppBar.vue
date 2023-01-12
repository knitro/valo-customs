<template>
  <div>
    <v-app-bar color="deep-purple" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="profileButtonPress">
        <v-icon large>mdi-account-circle</v-icon>
      </v-btn>
      <div class="app-bar-rhs-padding"></div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            v-for="(currentItem, index) in items"
            v-bind:key="'AppBarItem-' + index + '-' + currentItem.label"
            @click="sideBarButtonPress(currentItem.link)"
          >
            <v-list-item-icon>
              <v-icon>{{ currentItem.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ currentItem.label }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
// import { auth } from "@/firebase/firebase";
import router from "@/router";
import Vue from "vue";
import { PropType } from "vue/types/v3-component-props";
import { AppBarItem } from "./AppBarInterfaces";

export default Vue.extend({
  name: "AppBar",
  props: {
    title: String,
    items: Array as PropType<AppBarItem[]>,
  },
  data: () => ({
    drawer: false,
    group: null,
    accountIcon: "mdi-login",
  }),
  methods: {
    sideBarButtonPress(link: string) {
      router.push(link);
    },
    profileButtonPress() {
      router.push("/profile");
    },
  },
  // mounted() {
  //   const modifyAccountIcon = (newIcon: string) => {
  //     this.accountIcon = newIcon;
  //   };

  //   auth.onAuthStateChanged(function (user) {
  //     if (user) {
  //       modifyAccountIcon("mdi-account-circle");
  //     } else {
  //       modifyAccountIcon("mdi-login");
  //     }
  //   });
  // },
});
</script>

<style scoped lang="scss">
.app-bar-rhs-padding {
  // Padding is already added with the div addition for some reason
  padding-right: 0px; //8px;
}
</style>
