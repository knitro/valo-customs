<template>
  <div>
    <spinner-selector
      height="500"
      width="500"
      :items="items"
    ></spinner-selector>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SpinnerSelector from "./SpinnerSelector.vue";

export default Vue.extend({
  name: "SpinnerTest",
  components: {
    SpinnerSelector,
  },
  data() {
    return {
      items: [
        {
          label: "Test 1",
          image:
            "https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg",
        },
        {
          label: "Test 2",
          image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
        },
        {
          label: "Test 3",
          image: "https://cdn.vuetifyjs.com/images/cards/cooking.jpg",
        },
      ],
    };
  },
});
</script>
