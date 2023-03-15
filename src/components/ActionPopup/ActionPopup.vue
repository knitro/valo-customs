<template>
  <Transition name="fade">
    <div class="backdrop" v-if="show">
      <div class="center-screen">
        <v-card class="mx-auto" max-width="344">
          <v-img :src="image" height="200px"></v-img>

          <v-card-title> {{ title }} </v-card-title>
          <v-card-subtitle> {{ subtitle }} </v-card-subtitle>

          <v-card-actions>
            <v-btn
              v-for="option in options"
              :key="option.label"
              variant="text"
              :color="option.color"
              @click="option.clickFunction"
              :dark="option.dark"
            >
              <v-icon left> {{ option.icon }} </v-icon>
              {{ option.label }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import router from "@/router";
import { ActionPopupOptions } from "./ActionPopupInterfaces";

export default Vue.extend({
  name: "ActionPopup",

  components: {},
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    options: {
      type: Array as PropType<ActionPopupOptions[]>,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    linkToPage(href: string) {
      router.push(href);
    },
  },
});
</script>

<style scoped lang="scss">
.center-screen {
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
}

.backdrop {
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  align-content: center;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
