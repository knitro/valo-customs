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
import { ALL_MAPS } from "@/data/map-data";
import { SpinnerItem } from "./Spinner";
import { PickBanData } from "../PickBan/PickBan";

export default Vue.extend({
  name: "SpinnerValorant",
  components: {
    SpinnerSelector,
  },
  data() {
    return {
      items: ALL_MAPS.map((currentMap: PickBanData) => {
        const returnItem: SpinnerItem = {
          label: currentMap.label,
          image: currentMap.image,
          active: currentMap.activeInComp,
        };
        return returnItem;
      }),
      background: require("@/assets/maps/range.webp"),
    };
  },
});
</script>
