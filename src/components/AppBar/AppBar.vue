<template>
  <div>
    <v-app-bar
      color="#F26157"
      dark
      fixed
      :shrink-on-scroll="isProminent"
      :prominent="isProminent"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          :src="background"
          gradient="to top right, rgba(242,97,87,.5), rgba(242,97,87,.9)"
          position="0% 35%"
        >
        </v-img>
      </template>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-app-bar-title>
        <div id="title-text" @click="homeButtonPress">{{ title }}</div>
      </v-app-bar-title>
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
    isProminent: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    drawer: false,
    group: null,
    accountIcon: "mdi-login",
    background:
      "https://cdnportal.mobalytics.gg/production/2021/10/49cd9c4b-dos-and-donts-of-valorant.jpg",
  }),
  methods: {
    homeButtonPress() {
      router.push("/home");
    },
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

#title-text:hover {
  cursor: pointer;
}

.v-toolbar.v-toolbar--absolute {
  width: auto !important;
  // position: fixed;
}
</style>
