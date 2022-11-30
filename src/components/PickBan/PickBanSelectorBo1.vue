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
import { COMP_MAPS } from "@/data/map-data";
import Vue from "vue";
import PickBanSelector from "./PickBanSelector.vue";

export default Vue.extend({
  name: "PickBanSelectorBo1",
  components: {
    PickBanSelector,
  },
  data() {
    return {
      items: COMP_MAPS,
      background: require("@/assets/maps/range.webp"),
    };
  },
});
</script>
