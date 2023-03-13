<template>
  <v-card :color="backgroundColour">
    <div class="background-color-white-transparent">
      <v-img
        :src="headerImage"
        :gradient="'to top right, ' + color + ', rgba(25,32,72,.7)'"
        height="112"
        class="bottom-border-radius"
      >
        <v-card-text>
          <div>{{ subtitle }}</div>
          <div class="text-h4 text--primary">
            {{ title }}
          </div>
        </v-card-text>
      </v-img>
    </div>
    <v-list :color="backgroundColour">
      <v-list-item v-show="players.length === 0">
        <i>No players</i>
      </v-list-item>

      <v-list-item v-for="(item, index) in players" :key="index">
        <v-list-item-avatar :color="color">
          <v-icon class="lighten-1">mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TeamCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    players: {
      type: Array,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    headerImage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      backgroundColour: "rgba(255, 255, 255, 0.5)",
    };
  },
});
</script>

<style scoped lang="scss">
.bottom-border-radius {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-end-start-radius: 12px;
  border-end-end-radius: 12px;
}

.background-color-white-transparent {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
