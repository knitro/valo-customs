<template>
  <div>
    <pick-ban-selector-bo1></pick-ban-selector-bo1>
  </div>
</template>

<script lang="ts">
import PickBanSelectorBo1 from "@/components/PickBan/PickBanSelectorBo1.vue";
import Vue from "vue";

export default Vue.extend({
  name: "BestOfOneView",

  components: { PickBanSelectorBo1 },
});
</script>
