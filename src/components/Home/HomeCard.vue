<template>
  <v-hover v-slot="{ hover }">
    <v-card
      class="mx-auto"
      color="grey lighten-4"
      max-width="600"
      @click="linkToPage(link)"
    >
      <v-img :aspect-ratio="16 / 14" :src="image"></v-img>
      <v-card-text class="pt-6" style="position: relative">
        <div class="font-weight-light grey--text text-h6 mb-2">
          {{ subheader }}
        </div>
        <h3 class="text-h4 font-weight-light purple--text mb-2">
          {{ header }}
        </h3>
      </v-card-text>
      <v-expand-transition>
        <div
          v-if="hover"
          class="d-flex transition-fast-in-fast-out purple darken-2 v-card--reveal text-h2 white--text"
          style="height: 100%"
        ></div>
      </v-expand-transition>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import Vue from "vue";
import router from "@/router";

export default Vue.extend({
  name: "HomeCard",

  components: {},
  props: {
    image: {
      type: String,
      required: true,
    },
    header: {
      type: String,
      required: true,
    },
    subheader: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  methods: {
    linkToPage(href: string) {
      router.push(href);
    },
  },
});
</script>

<style scoped lang="scss">
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
