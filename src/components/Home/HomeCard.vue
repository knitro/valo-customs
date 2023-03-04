<template>
  <v-card
    class="mx-auto home-card"
    max-width="600"
    height="100%"
    @click="linkToPage(link)"
  >
    <v-img class="card-image" :aspect-ratio="16 / 14" :src="image"></v-img>
    <div class="home-card-bottom">
      <v-card-text class="pt-6" style="position: relative">
        <div
          class="text-h6 font-weight-light mb-2 card-text card-text-light-grey"
        >
          {{ subheader }}
        </div>
        <div class="text-h4 font-weight-light mb-2 card-text card-text-purple">
          {{ header }}
        </div>
      </v-card-text>
      <div class="corner-bottom-right">
        <v-icon class="continue-arrow-icon">mdi-arrow-right-thin</v-icon>
      </div>
      <div class="fill-on-hover"></div>
    </div>
  </v-card>
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

.home-card {
  background-color: #f5f5f5;
  transition: 0.2s; /* Animation */
  .card-text-light-grey {
    color: #a89796;
  }
  .card-text-purple {
    color: #9c27b0;
  }
  overflow: hidden;
  .fill-on-hover {
    position: absolute;
    z-index: -10;
    bottom: 0px;
    right: 0px;
    background: rgba(242, 97, 87, 1);
    height: 16px;
    width: 16px;
    border-radius: 16px;
    transform-origin: 50% 50%;
    transition: transform 0.25s ease-out;
  }
}

.home-card:hover {
  transform-origin: 50% 50%;
  transform: scale(1.05);

  .card-text {
    transition: all 0.3s ease-out;
    color: rgba(255, 255, 255, 0.8);
  }

  .fill-on-hover {
    z-index: -10;
    transform: scale(50);
  }
}

.corner-bottom-right {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 32px;
  height: 32px;
  overflow: hidden;
  bottom: 0;
  right: 0;
  background-color: rgba(242, 97, 87, 1);
  border-radius: 32px 0px 0px 0px;
  z-index: 10;
}

.continue-arrow-icon {
  margin-top: 4px;
  margin-right: -8px;
  color: white;
  font-family: courier, sans;
  z-index: 9;
}
</style>
