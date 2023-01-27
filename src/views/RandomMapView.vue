<template>
  <div>
    <spinner-valorant></spinner-valorant>
  </div>
</template>

<script lang="ts">
import SpinnerValorant from "@/components/Spinner/SpinnerValorant.vue";
import Vue from "vue";

export default Vue.extend({
  name: "RandomMapView",

  components: { SpinnerValorant },
});
</script>
