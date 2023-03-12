<template>
  <v-card>
    <v-app-bar
      :color="color"
      dark
      prominent
      short
      src="https://picsum.photos/1920/1080?random"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          :gradient="'to top right, ' + color + ', rgba(25,32,72,.7)'"
        ></v-img>
      </template>
      <v-card-text>
        <div>{{ subtitle }}</div>
        <div class="text-h4 text--primary">
          {{ title }}
        </div>
      </v-card-text>
    </v-app-bar>

    <v-list>
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
  },
});
</script>

<style scoped lang="scss">
.team-card-bar {
  border-radius: 10px;
}
</style>
