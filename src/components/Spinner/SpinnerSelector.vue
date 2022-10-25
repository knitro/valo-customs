<template>
  <div>
    <Transition name="background" :duration="{ enter: 500, leave: 800 }">
      <v-img
        class="spinner-selector-background"
        :src="backgroundImage"
        :key="backgroundImage"
        :min-height="windowHeight - 64"
        :max-height="windowHeight - 64"
      ></v-img>
    </Transition>
    <v-row>
      <v-col>
        <v-slide-x-transition>
          <v-card
            :minHeight="cardHeight"
            :minWidth="cardWidth"
            :maxHeight="cardHeight"
            :max-width="cardWidth"
            v-show="state == 2"
            color="rgba(0,0,0,0.5)"
            class="spinner-selector-header-card-spacer"
          >
            <v-card-title class="spinner-selector-card-label-large">
              {{ items[currentSelected] ? items[currentSelected].label : "" }}
            </v-card-title>
          </v-card>
        </v-slide-x-transition>

        <div v-for="(item, index) in items" v-bind:key="index + '-' + item">
          <v-slide-x-transition>
            <spinner-card
              v-show="
                (state == 0 || state == 1) && selectedMapIndices.includes(index)
              "
              :height="cardHeight"
              :width="cardWidth"
              :label="item.label"
              :background-image-url="item.image"
              :isSelected="currentSelected === index"
              class="spinner-selector-spacer"
            ></spinner-card>
          </v-slide-x-transition>
        </div>
      </v-col>
      <v-col>
        <v-container>
          <v-btn
            elevation="3"
            fab
            large
            absolute
            right
            color="rgba(206, 121, 107, 1)"
            dark
            @click="showMapsFilter = !showMapsFilter"
            v-show="state == 0"
          >
            <v-icon v-if="showMapsFilter">mdi-window-close</v-icon>
            <v-icon v-else>mdi-filter-variant</v-icon>
          </v-btn>
          <v-expand-transition>
            <v-card
              max-width="150"
              v-show="showMapsFilter"
              id="spinner-selector-filters"
            >
              <v-card-text>
                <h2 class="text-h6 mb-2">Maps</h2>
                <v-chip-group v-model="selectedMapIndices" column multiple>
                  <v-chip
                    v-for="(item, index) in items"
                    v-bind:key="'chip-' + index + '-' + item"
                    filter
                    outlined
                  >
                    {{ item.label }}
                  </v-chip>
                </v-chip-group>
              </v-card-text>
            </v-card>
          </v-expand-transition>

          <v-btn
            x-large
            color="deep-purple"
            dark
            @click="pickRandomItem"
            class="spinner-selector-random-button"
            :min-height="70"
            :max-height="70"
            :min-width="600"
            :max-width="600"
            v-show="state == 0"
            :disabled="selectedMapIndices.length <= 1"
          >
            Pick a Random Map
          </v-btn>
          <v-btn
            x-large
            color="deep-purple"
            dark
            @click="setToDefault"
            class="spinner-selector-random-button"
            :min-height="70"
            :max-height="70"
            :min-width="600"
            :max-width="600"
            v-show="state == 2"
          >
            Re-Roll
          </v-btn>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { PropType } from "node_modules/vue/types/v3-component-props";
import Vue from "vue";
import { SpinnerItem } from "./Spinner";
import SpinnerCard from "./SpinnerCard.vue";

export default Vue.extend({
  components: {
    SpinnerCard,
  },
  name: "SpinnerSelector",
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    items: {
      type: Array as PropType<SpinnerItem[]>, // use PropType
      default: () => [], // use a factory function
    },
    background: {
      type: String,
      required: true,
    },
  },
  data() {
    const initialPickedArray = [] as number[];
    this.items.forEach((value: SpinnerItem, index: number) => {
      if (value.active) {
        initialPickedArray.push(index);
      }
    });

    return {
      cardHeight: 100,
      cardWidth: 500,
      backgroundImage: this.background,
      windowHeight: window.innerHeight,

      showMapsFilter: false,
      selectedMapIndices: initialPickedArray,
      currentSelected: -1,
      state: 0, // 0 == Stand-By, 1 == Rolling, 2 == Finished, 3 == Show only Selected

      minimumCycleLoops: 4,
      maximumCycleLoopMultiplier: 6,
      cycleDelay: 1000,
    };
  },
  methods: {
    pickRandomItem() {
      if (this.state == 1) {
        return;
      }
      this.state = 1;
      this.showMapsFilter = false;

      // Sort Selection Array to Avoid Weird Animation Patterns
      this.selectedMapIndices.sort();

      // Perform Rolling Animation
      const cycleLoops =
        Math.floor(Math.random() * this.maximumCycleLoopMultiplier) +
        this.minimumCycleLoops;

      // Ignore if the number of selected items is less than 2 (no need for random)
      if (this.selectedMapIndices.length < 2) {
        return;
      }

      // Generate the Random Index Selection (excluding deselected items)
      const numberOfChoices = this.selectedMapIndices.length;
      let randomNumber = Math.floor(Math.random() * numberOfChoices);

      let numberOfCyclesLeft =
        cycleLoops * this.selectedMapIndices.length + randomNumber;
      let selectedIndex =
        this.selectedMapIndices[this.selectedMapIndices.length - 1];

      // Create Roll Timeout Function and Execute
      const roll = (numberOfCyclesLeft: number) => {
        // Select Corresponding Index to Highlight
        selectedIndex++;
        if (selectedIndex >= this.selectedMapIndices.length) {
          selectedIndex = 0;
        }
        this.currentSelected = this.selectedMapIndices[selectedIndex];

        // Slow Down Cycle Speed in relation to the number of cycles left
        const cycleSpeed = this.cycleDelay / numberOfCyclesLeft;

        if (numberOfCyclesLeft > 0) {
          setTimeout(roll, cycleSpeed, numberOfCyclesLeft - 1);
        } else {
          this.state = 3;
          this.backgroundImage = this.items[this.currentSelected].image;
          setTimeout(this.setSelected, 250, this.currentSelected);
        }
      };
      roll(numberOfCyclesLeft);
    },
    setSelected(arrayIndex: number) {
      this.state = 2;
    },
    setToDefault() {
      this.state = 3;
      const callback = () => {
        this.state = 0;
        this.backgroundImage = this.background;
      };
      setTimeout(callback, 250);
    },
  },
});
</script>

<style scoped lang="scss">
.spinner-selector-header-card-spacer {
  margin-top: 40px;
}
.spinner-selector-spacer {
  padding-top: 5px;
}
.spinner-selector-background {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
}

.background-enter-active {
  transition: all 0.3s ease-out;
}

.background-leave-active {
  transition: all 1.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.background-enter-from,
.background-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.filter-fab-enter-active,
.filter-fab-leave-active {
  transition: all 0.25s ease-out;
}

.filter-fab-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.filter-fab-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

#spinner-selector-filters {
  position: absolute;
  top: 80px;
  right: 10px;
}

.spinner-selector-random-button {
  position: fixed;
  bottom: 50px;
}

.spinner-selector-card-label-large {
  display: flow-root;
  padding-top: 35px;
  font-size: 64px;
  text-align: right;
  color: white;
  text-shadow: 0 0 5px #000000;
}
</style>
