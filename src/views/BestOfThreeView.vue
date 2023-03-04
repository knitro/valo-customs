<template>
  <div>
    <app-bar-valo-custom title="Home"></app-bar-valo-custom>
    <pick-ban-selector-bo3></pick-ban-selector-bo3>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PickBanSelectorBo3 from "@/components/PickBan/PickBanSelectorBo3.vue";
import AppBarValoCustom from "@/components/AppBar/AppBarValoCustom.vue";

export default Vue.extend({
  name: "BestOfThreeView",
  components: { PickBanSelectorBo3, AppBarValoCustom },
});
</script>
