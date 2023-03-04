<template>
  <div>
    <app-bar-valo-custom title="Home" isProminent></app-bar-valo-custom>
    <v-container id="home-page">
      <v-row>
        <v-col
          v-for="(cardData, index) in homeCardData"
          v-bind:key="index + '-' + cardData.header"
          cols="4"
        >
          <HomeCard
            :image="cardData.image"
            :header="cardData.header"
            :subheader="cardData.subheader"
            :link="cardData.link"
          ></HomeCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HomeCard from "@/components/Home/HomeCard.vue";
import { HomeCardItem } from "@/components/Home/HomeCardInterfaces";
import AppBarValoCustom from "@/components/AppBar/AppBarValoCustom.vue";

export default Vue.extend({
  name: "HomeView",
  components: {
    HomeCard,
    AppBarValoCustom,
  },
  data() {
    const homeCardData: HomeCardItem[] = [
      {
        image: require("@/assets/images/bottom-stairs.png"),
        header: "Random Map",
        subheader: "Quickly pick a random map.",
        link: "/random",
      },
      {
        image: require("@/assets/images/top-office.png"),
        header: "BO1 PickBan",
        subheader: "Can't agree on a map? Use a Pick Ban!",
        link: "/bestOfOne",
      },
      {
        image: require("@/assets/images/under-office.png"),
        header: "BO3 PickBan",
        subheader:
          "Show off which 5 stack is better in an up to a 3 match series.",
        link: "/bestOfThree",
      },
      {
        image: require("@/assets/images/distance-land.png"),
        header: "Online",
        subheader: "Use the Pick Ban System against people online!",
        link: "/online",
      },
      {
        image: require("@/assets/images/icebox-breach.png"),
        header: "Team Select",
        subheader: "Create your teams using fully or semi-randomly.",
        link: "/teams",
      },
    ];
    return {
      homeCardData: homeCardData,
    };
  },
});
</script>
