<template>
  <div>
    <v-card :height="height" :width="width" class="background">
      <div class="inner-box">
        <v-card-title class="title-text">{{ label }}</v-card-title>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PickBanCardBlank",
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
  },
});
</script>

<style scoped lang="scss">
.background {
  background: rgb(67, 0, 91);
  background: radial-gradient(
    circle,
    rgba(67, 0, 91, 0.6) 0%,
    rgba(40, 7, 76, 0.8) 100%
  );
  vertical-align: middle;
  text-align: center;
  position: relative;
}

.title-text {
  color: rgba(255, 255, 255, 1);
}

.inner-box {
  --b: 2px; /* thickness of the border */
  --c: repeating-linear-gradient(45deg, red, blue); /* color of the border */
  --w: 20px; /* width of border */

  padding: var(--b); /* space for the border */
  height: 95%;
  width: 98%;
  position: absolute;
  top: 2.5%;
  left: 1%;
}

.inner-box::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--c, red);
  --_g: #0000 90deg, #000 0;
  --_p: var(--w) var(--w) no-repeat;
  --mask: conic-gradient(from 90deg at top var(--b) left var(--b), var(--_g)) 0
      0 / var(--_p),
    conic-gradient(from 180deg at top var(--b) right var(--b), var(--_g)) 100% 0 /
      var(--_p),
    conic-gradient(from 0deg at bottom var(--b) left var(--b), var(--_g)) 0 100% /
      var(--_p),
    conic-gradient(from -90deg at bottom var(--b) right var(--b), var(--_g))
      100% 100% / var(--_p);
  -webkit-mask: var(--mask);
  mask: var(--mask);
}
</style>
