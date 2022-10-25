<template>
  <div>
    <pick-ban-selector
      :height="500"
      :width="500"
      :items="items"
      :background="background"
      :isBo1="true"
    ></pick-ban-selector>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { PickBanData } from "./PickBan";
import PickBanSelector from "./PickBanSelector.vue";

export default Vue.extend({
  name: "PickBanSelectorBo1",
  components: {
    PickBanSelector,
  },
  data() {
    const mapPool: PickBanData[] = [
      {
        label: "Ascent",
        image: require("@/assets/maps/ascent.webp"),
      },
      {
        label: "Bind",
        image: require("@/assets/maps/bind.webp"),
      },
      {
        label: "Breeze",
        image: require("@/assets/maps/breeze.webp"),
      },
      {
        label: "Fracture",
        image: require("@/assets/maps/fracture.webp"),
      },
      {
        label: "Haven",
        image: require("@/assets/maps/haven.webp"),
      },
      {
        label: "Icebox",
        image: require("@/assets/maps/icebox.webp"),
      },
      {
        label: "Pearl",
        image: require("@/assets/maps/pearl.webp"),
      },
    ];

    return {
      items: mapPool,
      background: require("@/assets/maps/range.webp"),
    };
  },
});
</script>
