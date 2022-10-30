<template>
  <div>
    <div class="online-view-center"></div>
    <online-view></online-view>
  </div>
</template>
ye

<script lang="ts">
import Vue from "vue";
import OnlineView from "./OnlineView.vue";

export default Vue.extend({
  name: "OnlineFailView",
  components: { OnlineView },
});
</script>

<style scoped lang="scss">
.online-view-center {
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
}
</style>
