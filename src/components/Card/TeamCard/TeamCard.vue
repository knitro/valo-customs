<template>
  <v-card>
    <v-card-text>
      <div>{{ subtitle }}</div>
      <p class="text-h4 text--primary">
        {{ title }}
      </p>
    </v-card-text>
    <v-list>
      <v-list-item v-for="(item, index) in players" :key="index">
        <v-list-item-avatar>
          <v-icon class="lighten-1" :class="color">mdi-account</v-icon>
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

<style scoped lang="scss"></style>
