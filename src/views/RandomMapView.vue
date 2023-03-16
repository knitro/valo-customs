<template>
  <div>
    <app-bar-valo-custom title="Home"></app-bar-valo-custom>
    <spinner-valorant></spinner-valorant>
  </div>
</template>

<script lang="ts">
import SpinnerValorant from "@/components/Spinner/SpinnerValorant.vue";
import Vue from "vue";
import AppBarValoCustom from "@/components/AppBar/AppBarValoCustom.vue";

export default Vue.extend({
  name: "RandomMapView",

  components: { SpinnerValorant, AppBarValoCustom },
});
</script>
