<template>
  <div class="body">
    <div class="main-content">
      <Transition name="background" :duration="{ enter: 500, leave: 800 }">
        <v-img
          class="pick-ban-selector-background"
          :src="backgroundImage"
          :key="backgroundImage"
          :min-height="windowHeight"
          :max-height="windowHeight"
        ></v-img>
      </Transition>
      <v-row>
        <v-col cols="12">
          <v-container>
            <v-row align="center" justify="center">
              <v-slide-y-transition>
                <v-card
                  :height="80"
                  :width="700"
                  :color="isBan() ? 'rgba(255,0,0,0.5)' : 'rgba(0,255,0,0.3)'"
                  class="team-action-card"
                >
                  <v-card-title class="team-action-card-text">
                    {{
                      isComplete
                        ? "Map Selection Complete"
                        : (isTeamOneTurn() ? teamOneName : teamTwoName) +
                          (isBan() ? " to Ban" : " to Pick")
                    }}
                  </v-card-title>
                </v-card>
              </v-slide-y-transition>
            </v-row>
            <v-row align="center" justify="center">
              <div
                v-for="(map, index) in maps"
                v-bind:key="index + '-' + map.side + '-' + map.status"
              >
                <v-slide-x-transition>
                  <v-card class="selection-card">
                    <pick-ban-card
                      v-show="!pickBanSelections.includes(map)"
                      class="pick-ban-selector-spacer"
                      :id="'choose-card-' + index"
                      :height="cardHeightSelect"
                      :width="cardWidthSelect"
                      :label="map.data.label"
                      :background-image-url="map.data.image"
                      :status="map.status"
                      :teamSide="map.side"
                      @click.native="clickMap(map)"
                      :key="
                        'choose-' +
                        map.data.label +
                        '-' +
                        map.side +
                        '-' +
                        map.status
                      "
                    ></pick-ban-card>
                  </v-card>
                </v-slide-x-transition>
              </div>
            </v-row>
            <!-- <v-row align="center" justify="center">
            <v-img
              contain
              :src="minimapImage"
              :key="minimapImage"
              :height="windowHeight / 2"
              :width="windowHeight / 2"
              class="minimap-image"
            >
            </v-img>
          </v-row> -->
          </v-container>
        </v-col>
        <v-col cols="3"></v-col>
      </v-row>

      <div class="pick-ban-selector-center">
        <v-dialog v-model="showTeamSelect" persistent max-width="500">
          <v-card>
            <v-card-title class="text-h5"
              >Choose the Starting Side</v-card-title
            >
            <v-card-text>
              Map Selected by {{ teamOneName }} is
              {{
                pickBanSelections.length >= 1
                  ? pickBanSelections[pickBanSelections.length - 1].data.label
                  : ""
              }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="teamSideSelectedPress(true)"
              >
                Attacker
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="teamSideSelectedPress(false)"
              >
                Defender
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
    <div class="bottom-area">
      <v-container>
        <v-row no-gutters justify="center">
          <div class="pick-ban-selector-button-area">
            <v-btn
              x-large
              color="deep-purple"
              dark
              class="pick-ban-selector-bottom-button"
              :min-height="70"
              :max-height="70"
              :min-width="600"
              :max-width="600"
              :disabled="!currentSelected"
              @click="selectMap()"
            >
              {{
                isBo1
                  ? buttonLabelsBanOrderBo1[pickBanSelections.length]
                  : buttonLabelsBanOrderBo3[pickBanSelections.length]
              }}
              {{ currentSelected ? currentSelected.data.label : "Map" }}
            </v-btn>
            <v-btn
              x-large
              color="deep-purple"
              dark
              class="pick-ban-selector-bottom-button"
              :min-height="70"
              :max-height="70"
              v-show="pickBanSelections.length == 7"
              @click="reset()"
            >
              Reset
            </v-btn>
          </div>
        </v-row>
      </v-container>
      <v-container class="bottom-bar" fluid>
        <v-row no-gutters justify="center" class="transparent-background">
          <v-col
            v-for="n in 7"
            v-bind:key="'select-card-' + (n - 1)"
            justify="center"
            class="transparent-background"
          >
            <PickBanSelectionDisplay
              :index="n - 1"
              :isDisplayBlank="n - 1 >= pickBanSelections.length"
              :cardHeight="cardHeightPickBan"
              :cardWidth="cardWidthPickBan"
              :mapName="pickBanSelections[n - 1]?.data.label"
              :mapImage="pickBanSelections[n - 1]?.data.image"
              :mapStatus="pickBanSelections[n - 1]?.status"
              :mapTeamSide="pickBanSelections[n - 1]?.side"
              :isTeamOneTurn="isTeamOneTurn(n - 1)"
              :isBan="isBan(n - 1)"
              :teamOneName="teamOneName"
              :teamTwoName="teamTwoName"
            ></PickBanSelectionDisplay>
            <div v-if="n < 7"></div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from "node_modules/vue/types/v3-component-props";
import Vue from "vue";
import {
  VIcon,
  VImg,
  VRow,
  VCol,
  VCard,
  VSlideXTransition,
  VCardTitle,
  VContainer,
  VBtn,
  VDialog,
  VCardText,
  VCardActions,
  VSpacer,
} from "vuetify/lib";
import {
  PickBanData,
  PickBanItem,
  PickBanMapStatus,
  PickBanTeamSide,
} from "./PickBan";
import PickBanCard from "./PickBanCard.vue";
import PickBanSelectionDisplay from "./PickBanSelectionDisplay.vue";

export default Vue.extend({
  components: {
    PickBanCard,
    PickBanSelectionDisplay,
    VImg,
    VRow,
    VCol,
    VCard,
    VSlideXTransition,
    VCardTitle,
    VContainer,
    VBtn,
    VDialog,
    VCardText,
    VCardActions,
    VSpacer,
  },
  name: "PickBanSelector",
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
      type: Array as PropType<PickBanData[]>, // use PropType
      default: () => [], // use a factory function
    },
    background: {
      type: String,
      required: true,
    },
    isBo1: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    return {
      buttonLabelsBanOrderBo1: [
        "Ban",
        "Ban",
        "Ban",
        "Ban",
        "Ban",
        "Ban",
        "Pick",
      ],
      buttonLabelsBanOrderBo3: [
        "Ban",
        "Ban",
        "Pick",
        "Pick",
        "Ban",
        "Ban",
        "Pick",
      ],
    };
  },
  data() {
    const maps: PickBanItem[] = this.items.map(
      (item: PickBanData, index: number) => {
        const returnItem: PickBanItem = {
          data: item,
          status: PickBanMapStatus.UNSELECTED,
          side: PickBanTeamSide.NOT_APPLICABLE,
          index: index,
        };
        return returnItem;
      }
    );

    // Get Window Height
    // See: https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript
    const body = document.body;
    const html = document.documentElement;
    const pageHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    return {
      cardHeightSelect: 100,
      cardWidthSelect: 400,

      cardHeightPickBan: 100,
      cardWidthPickBan: 200,

      backgroundImage: this.background,
      // windowHeight: window.innerHeight,
      // windowHeight: document.body.scrollHeight,
      windowHeight: pageHeight,
      minimapImage: "",

      maps: maps,
      pickBanSelections: [] as PickBanItem[],
      currentSelected: null as PickBanItem | null,

      teamOneName: "Team 1",
      teamTwoName: "Team 2",

      showTeamSelect: false,
      teamSelectCallback: (isAttacker: boolean) => {
        // Empty Function
      },

      isComplete: false,
    };
  },
  methods: {
    containsMap(map: PickBanItem): boolean {
      let returnValue = false;
      this.maps.forEach((current) => {
        if (current.data === map.data) {
          returnValue = true;
        }
      });
      return returnValue;
    },

    clickMap(map: PickBanItem) {
      const wasSelectedPreviously = map === this.currentSelected;
      this.currentSelected = null;

      // Deselect all other maps
      this.maps.forEach((item: PickBanItem) => {
        if (item.status === PickBanMapStatus.SELECTED) {
          item.status = PickBanMapStatus.UNSELECTED;
        }
      });

      if (!wasSelectedPreviously) {
        map.status = PickBanMapStatus.SELECTED;
        this.currentSelected = map;
        this.backgroundImage = map.data.image;
        this.minimapImage = map.data.minimap;
      } else {
        this.backgroundImage = this.background;
        this.minimapImage = "";
      }
    },

    selectMap() {
      if (this.currentSelected == null) {
        return;
      }
      this.pickBanSelections.push(this.currentSelected);

      if (this.isBo1) {
        this.currentSelected.status = PickBanMapStatus.BANNED;
        if (this.pickBanSelections.length == 6) {
          // Get Map that isn't banned, and make it the picked map
          this.maps.forEach((currentMap: PickBanItem) => {
            if (!this.pickBanSelections.includes(currentMap)) {
              this.currentSelected = currentMap;
              currentMap.status = PickBanMapStatus.PICKED;
              this.pickBanSelections.push(currentMap);
              this.backgroundImage = currentMap.data.image;
            }
          });
          this.pickTeamSide(false);
        }
      } else {
        // Assume Bo3
        const numberOfMapsPickedOrBanned = this.pickBanSelections.length;
        if (
          numberOfMapsPickedOrBanned == 1 ||
          numberOfMapsPickedOrBanned == 2 ||
          numberOfMapsPickedOrBanned == 5
        ) {
          this.currentSelected.status = PickBanMapStatus.BANNED;
        } else if (numberOfMapsPickedOrBanned == 6) {
          this.currentSelected.status = PickBanMapStatus.BANNED;

          // Get Map that isn't selected, and recursive call for Map 7 Selection
          this.maps.forEach((currentMap: PickBanItem) => {
            if (!this.pickBanSelections.includes(currentMap)) {
              this.currentSelected = currentMap;
            }
          });
          this.selectMap();
        } else {
          // At this stage, you are dealing with Picking a Map
          switch (numberOfMapsPickedOrBanned) {
            case 3: {
              this.pickTeamSide(false);
              break;
            }
            case 4: {
              this.pickTeamSide(true);
              break;
            }
            case 7: {
              this.pickTeamSide(false);
              break;
            }
          }
        }
      }

      this.currentSelected = null;
    },

    pickTeamSide(isTeamOneToPick: boolean) {
      // Bring up Team Selection Card
      const teamSelectFunction = (isAttacker: boolean) => {
        const lastPickBanSelection =
          this.pickBanSelections[this.pickBanSelections.length - 1];

        lastPickBanSelection.side = isAttacker
          ? PickBanTeamSide.ATTACK_SIDE
          : PickBanTeamSide.DEFEND_SIDE;

        // Flip if this is team 2 selection
        if (!isTeamOneToPick) {
          if (lastPickBanSelection.side == PickBanTeamSide.ATTACK_SIDE) {
            lastPickBanSelection.side = PickBanTeamSide.DEFEND_SIDE;
          } else {
            lastPickBanSelection.side = PickBanTeamSide.ATTACK_SIDE;
          }
        }
        lastPickBanSelection.status = PickBanMapStatus.PICKED;
        this.currentSelected = null;
        this.showTeamSelect = false;
        if (this.pickBanSelections.length === 7) {
          this.isComplete = true;
        }
      };
      this.teamSelectCallback = teamSelectFunction;
      if (this.currentSelected) {
        this.currentSelected.side = PickBanTeamSide.UNSELECTED;
      }
      this.showTeamSelect = true;
    },

    reset() {
      this.currentSelected = null;
      this.pickBanSelections = [];
      this.isComplete = false;
      this.backgroundImage = this.background;
      this.maps.forEach((currentMap: PickBanItem) => {
        currentMap.status = PickBanMapStatus.UNSELECTED;
        currentMap.side = PickBanTeamSide.NOT_APPLICABLE;
      });
    },

    teamSideSelectedPress(isAttacker: boolean) {
      this.teamSelectCallback(isAttacker);
      this.showTeamSelect = false;
    },

    isTeamOneTurn(providedIndex?: number): boolean {
      const length = providedIndex
        ? providedIndex
        : this.pickBanSelections.length;
      if (length === 0 || length === 2 || length === 4 || length === 6) {
        return true;
      } else {
        return false;
      }
    },

    isBan(providedIndex?: number): boolean {
      const index = providedIndex
        ? providedIndex
        : this.pickBanSelections.length;
      if (this.isBo1) {
        if (index >= this.buttonLabelsBanOrderBo1.length) {
          return false;
        }
        const label = this.buttonLabelsBanOrderBo1[index];
        return label.toLowerCase() === "ban";
      } else {
        if (index >= this.buttonLabelsBanOrderBo3.length) {
          return false;
        }
        const label = this.buttonLabelsBanOrderBo3[index];
        return label.toLowerCase() === "ban";
      }
    },
  },
});
</script>

<style scoped lang="scss">
///////////////////////////////////////////////
// Page Layout Styles
///////////////////////////////////////////////
.body {
  display: flex;
  flex-direction: column;
}
.main-content {
  flex: 1 0 auto;
}

.bottom-area {
  flex-shrink: 0;
  width: 100%;
  z-index: 1; // Needs to be greater than background
}

.bottom-bar {
  position: absolute;
  bottom: 0;
  background: rgba(103, 58, 183, 0.4);
}

.center-content {
  display: block;
  margin: auto;
}

///////////////////////////////////////////////
// General Styles
///////////////////////////////////////////////

.transparent-background {
  background: rgba(0, 0, 0, 0);
}

///////////////////////////////////////////////
// Background
///////////////////////////////////////////////

.pick-ban-selector-background {
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

///////////////////////////////////////////////
// Top Bar Styles
///////////////////////////////////////////////

.team-action-card {
  margin-top: 10px;
  margin-bottom: 20px;
}

.team-action-card-text {
  display: flow-root;
  padding-top: 24px;
  font-size: 32px;
  text-align: center;
  color: white;
  text-shadow: 0 0 5px #000000;
}

.pick-ban-selector-bottom-button {
  margin-left: 10px;
  margin-right: 10px;
}

.pick-ban-selector-center {
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
}

///////////////////////////////////////////////
// Selection Card Styles
///////////////////////////////////////////////

.selection-card {
  margin: 5px;
}

///////////////////////////////////////////////
// Minimap
///////////////////////////////////////////////

.minimap-enter-from,
.minimap-leave-to {
  opacity: 0;
}

.minimap-image {
  margin-top: 48px;
}
</style>
