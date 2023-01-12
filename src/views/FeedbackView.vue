<template>
  <div>
    <v-img
      class="spinner-selector-background"
      :src="backgroundImage"
      :key="backgroundImage"
      :min-height="windowHeight - 64"
      :max-height="windowHeight - 64"
    >
      <v-row no-gutters>
        <v-col cols="6">
          <v-card class="image-card-margins">
            <v-img :src="backgroundImage"></v-img>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="6">
          <v-card class="info-card-margins">
            <v-card-title> Feedback </v-card-title>
            <v-card-subtitle>Contact Knitro#0001 on Discord</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-img>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "FeedbackView",
  components: {},
  data() {
    return {
      backgroundImage: require("@/assets/backgrounds/range-outside.png"),
      windowHeight: window.innerHeight,

      userEmailAddress: "n/a",
    };
  },
});
</script>

<style scoped lang="scss">
.image-card-margins {
  margin: 20px;
}

.info-card-margins {
  margin: 20px;
}

.buttons-card-margins {
  margin-left: 10vw;
  margin-right: 20px;
}
</style>
