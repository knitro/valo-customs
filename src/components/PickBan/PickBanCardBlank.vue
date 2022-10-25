<template>
  <div>
    <v-card
      :maxHeight="height"
      :max-width="width"
      :min-height="height"
      :min-width="width"
      class="pick-ban-card-blank-gradient"
    >
      <v-card-title>{{ label }}</v-card-title>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PickBanCardBlank",
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.pick-ban-card-blank-gradient {
  background: rgb(255, 255, 255, 0);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
}
</style>
