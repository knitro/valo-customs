<template>
  <div></div>
</template>

<script lang="ts">
import { auth } from "@/firebase/firebase";
import Vue from "vue";

export default Vue.extend({
  name: "LogoutView",
  components: {},
  mounted() {
    auth.signOut();
  },
});
</script>
