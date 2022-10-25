<template>
  <div>
    <spinner-selector
      :height="500"
      :width="500"
      :items="items"
      :background="background"
    ></spinner-selector>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SpinnerSelector from "./SpinnerSelector.vue";

export default Vue.extend({
  name: "SpinnerValorant",
  components: {
    SpinnerSelector,
  },
  data() {
    return {
      items: [
        {
          label: "Ascent",
          image: require("@/assets/maps/ascent.webp"),
          active: true,
        },
        {
          label: "Bind",
          image: require("@/assets/maps/bind.webp"),
          active: true,
        },
        {
          label: "Breeze",
          image: require("@/assets/maps/breeze.webp"),
          active: true,
        },
        {
          label: "Fracture",
          image: require("@/assets/maps/fracture.webp"),
          active: true,
        },
        {
          label: "Haven",
          image: require("@/assets/maps/haven.webp"),
          active: true,
        },
        {
          label: "Icebox",
          image: require("@/assets/maps/icebox.webp"),
          active: true,
        },
        {
          label: "Pearl",
          image: require("@/assets/maps/pearl.webp"),
          active: true,
        },
        {
          label: "Split",
          image: require("@/assets/maps/split.webp"),
          active: false,
        },
      ],
      background: require("@/assets/maps/range.webp"),
    };
  },
});
</script>
