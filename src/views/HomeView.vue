<template>
  <div>
    <v-container>
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

export default Vue.extend({
  name: "HomeView",
  components: {
    HomeCard,
  },
  data() {
    const homeCardData: HomeCardItem[] = [
      {
        image: "https://cdn.vuetifyjs.com/images/cards/kitchen.png",
        header: "Random Map",
        subheader: "Quickly pick a random map",
        link: "/random",
      },
      {
        image: "https://cdn.vuetifyjs.com/images/cards/kitchen.png",
        header: "Local PickBan",
        subheader: "Find the perfect map for your customs",
        link: "/bestOfOne",
      },
      {
        image: "https://cdn.vuetifyjs.com/images/cards/kitchen.png",
        header: "Online",
        subheader: "Use the Pick Ban System with people online",
        link: "/online",
      },
    ];
    return {
      homeCardData: homeCardData,
    };
  },
});
</script>
