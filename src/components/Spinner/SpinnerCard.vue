<template>
  <div>
    <v-card :maxHeight="height" :max-width="width">
      <v-img :height="height" :width="width" :src="backgroundImageUrl">
        <v-card-title class="spinner-card-label">{{ label }}</v-card-title>
        <div
          v-if="isSelected"
          :id="'spinner-card-div-' + label"
          class="spinner-card-gradient-selected"
        ></div>
        <div
          v-else
          :id="'spinner-card-div-' + label"
          class="spinner-card-gradient"
        ></div>
      </v-img>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SpinnerCard",
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    backgroundImageUrl: {
      type: String,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    return {};
  },
  mounted() {
    const divBackground = document.getElementById(
      "spinner-card-div-" + this.label
    );
    if (divBackground) {
      divBackground.style.height = this.height + "px";
      divBackground.style.width = this.width + "px";
    }
  },
});
</script>

<style scoped lang="scss">
.spinner-card-label {
  text-align: right;
  position: absolute;
  bottom: 0;
  right: 0;
  color: white;
  text-shadow: 0 0 5px #000000;
}

.spinner-card-gradient {
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.6)
  );
}

.spinner-card-gradient-selected {
  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0) 0%,
    rgba(184, 0, 255, 0.3) 100%
  );
}
</style>
