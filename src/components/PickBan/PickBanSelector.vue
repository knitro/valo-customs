<template>
  <div>
    <Transition name="background" :duration="{ enter: 500, leave: 800 }">
      <v-img
        class="pick-ban-selector-background"
        :src="backgroundImage"
        :key="backgroundImage"
        :min-height="windowHeight - 64"
        :max-height="windowHeight - 64"
      ></v-img>
    </Transition>
    <v-row>
      <v-col cols="3">
        <v-slide-x-transition>
          <v-card :height="80" :width="cardWidthSelect" color="rgba(0,0,0,0.5)">
            <v-card-title class="lhs-column-header-text"> Maps </v-card-title>
          </v-card>
        </v-slide-x-transition>

        <div
          v-for="(map, index) in maps"
          v-bind:key="index + '-' + map.side + '-' + map.status"
        >
          <v-slide-x-transition>
            <v-card>
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
                  'choose-' + map.data.label + '-' + map.side + '-' + map.status
                "
              ></pick-ban-card>
            </v-card>
          </v-slide-x-transition>
        </div>
      </v-col>
      <v-col cols="6">
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
                  {{ isTeamOneTurn() ? teamOneName : teamTwoName }} to
                  {{ isBan() ? "Ban" : "Pick" }}
                </v-card-title>
              </v-card>
            </v-slide-y-transition>
          </v-row>
          <v-row align="center" justify="center">
            <v-img
              contain
              :src="minimapImage"
              :key="minimapImage"
              :height="windowHeight / 2"
              :width="windowHeight / 2"
              class="minimap-image"
            >
            </v-img>
          </v-row>
          <v-row>
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
      </v-col>
      <v-col cols="3">
        <v-card :height="windowHeight - 96" class="rhs-column">
          <pick-ban-card-blank
            v-if="pickBanSelections.length < 1"
            :height="cardHeightPickBan"
            :width="cardWidthPickBan"
            :label="teamOneName + ' to Ban'"
          ></pick-ban-card-blank>
          <pick-ban-card
            v-if="pickBanSelections.length >= 1"
            id="select-card-1"
            :height="cardHeightPickBan"
            :width="cardWidthPickBan"
            :label="pickBanSelections[0].data.label"
            :background-image-url="pickBanSelections[0].data.image"
            :status="pickBanSelections[0].status"
            :teamSide="pickBanSelections[0].side"
            :key="
              'select-' +
              pickBanSelections[0].data.label +
              '-' +
              pickBanSelections[0].side +
              '-' +
              pickBanSelections[0].status
            "
          ></pick-ban-card>
          <pick-ban-card-blank
            v-if="pickBanSelections.length < 2"
            :height="cardHeightPickBan"
            :width="cardWidthPickBan"
            :label="teamTwoName + ' to Ban'"
          ></pick-ban-card-blank>
          <pick-ban-card
            v-if="pickBanSelections.length >= 2"
            id="select-card-2"
            :height="cardHeightPickBan"
            :width="cardWidthPickBan"
            :label="pickBanSelections[1].data.label"
            :background-image-url="pickBanSelections[1].data.image"
            :status="pickBanSelections[1].status"
            :teamSide="pickBanSelections[1].side"
            :key="
              'select-' +
              pickBanSelections[1].data.label +
              '-' +
              pickBanSelections[1].side +
              '-' +
              pickBanSelections[1].status
            "
          ></pick-ban-card>
          <pick-ban-card-blank
            v-if="pickBanSelections.length < 3"
            :height="cardHeightPickBan"
            :width="cardWidthPickBan"
            :label="teamOneName + ' to ' + (isBo1 ? 'Ban' : 'Pick')"
          ></pick-ban-card-blank>
          <pick-ban-card
            v-if="pickBanSelections.length >= 3"
            id="select-card-3"
            :height="cardHeightPickBan"
            :width="cardWidthPickBan"
            :label="pickBanSelections[2].data.label"
            :background-image-url="pickBanSelections[2].data.image"
            :status="pickBanSelections[2].status"
            :teamSide="pickBanSelections[2].side"
            :key="
              'select-' +
              pickBanSelections[2].data.label +
              '-' +
              pickBanSelections[2].side +
              '-' +
              pickBanSelections[2].status
            "
          ></pick-ban-card>
          <pick-ban-card-blank
            v-if="pickBanSelections.length < 4"
            :height="cardHeightPickBan"
            :width="cardWidthPickBan"
            :label="teamTwoName + ' to ' + (isBo1 ? 'Ban' : 'Pick')"
          ></pick-ban-card-blank>
          <pick-ban-card
            v-if="pickBanSelections.length >= 4"
            id="select-card-4"
            :height="cardHeightPickBan"
            :width="cardWidthPickBan"
            :label="pickBanSelections[3].data.label"
            :background-image-url="pickBanSelections[3].data.image"
            :status="pickBanSelections[3].status"
            :teamSide="pickBanSelections[3].side"
            :key="
              'select-' +
              pickBanSelections[3].data.label +
              '-' +
              pickBanSelections[3].side +
              '-' +
              pickBanSelections[3].status
            "
          ></pick-ban-card>
          <pick-ban-card-blank
            v-if="pickBanSelections.length < 5"
            :height="cardHeightPickBan"
            :width="cardWidthPickBan"
            :label="teamOneName + ' to Ban'"
          ></pick-ban-card-blank>
          <pick-ban-card
            v-if="pickBanSelections.length >= 5"
            id="select-card-5"
            :height="cardHeightPickBan"
            :width="cardWidthPickBan"
            :label="pickBanSelections[4].data.label"
            :background-image-url="pickBanSelections[4].data.image"
            :status="pickBanSelections[4].status"
            :teamSide="pickBanSelections[4].side"
            :key="
              'select-' +
              pickBanSelections[4].data.label +
              '-' +
              pickBanSelections[4].side +
              '-' +
              pickBanSelections[4].status
            "
          ></pick-ban-card>
          <pick-ban-card-blank
            v-if="pickBanSelections.length < 6"
            :height="cardHeightPickBan"
            :width="cardWidthPickBan"
            :label="teamTwoName + ' to Ban'"
          ></pick-ban-card-blank>
          <pick-ban-card
            v-if="pickBanSelections.length >= 6"
            id="select-card-6"
            :height="cardHeightPickBan"
            :width="cardWidthPickBan"
            :label="pickBanSelections[5].data.label"
            :background-image-url="pickBanSelections[5].data.image"
            :status="pickBanSelections[5].status"
            :teamSide="pickBanSelections[5].side"
            :key="
              'select-' +
              pickBanSelections[5].data.label +
              '-' +
              pickBanSelections[5].side +
              '-' +
              pickBanSelections[5].status
            "
          ></pick-ban-card>
          <pick-ban-card-blank
            v-if="pickBanSelections.length < 7"
            :height="cardHeightPickBan"
            :width="cardWidthPickBan"
            :label="'Remaining Map'"
          ></pick-ban-card-blank>
          <pick-ban-card
            v-if="pickBanSelections.length >= 7"
            id="select-card-7"
            :height="cardHeightPickBan"
            :width="cardWidthPickBan"
            :label="pickBanSelections[6].data.label"
            :background-image-url="pickBanSelections[6].data.image"
            :status="pickBanSelections[6].status"
            :teamSide="pickBanSelections[6].side"
            :key="
              'select-' +
              pickBanSelections[6].data.label +
              '-' +
              pickBanSelections[6].side +
              '-' +
              pickBanSelections[6].status
            "
          ></pick-ban-card>
        </v-card>
      </v-col>
    </v-row>

    <div class="pick-ban-selector-center">
      <v-dialog v-model="showTeamSelect" persistent max-width="500">
        <v-card>
          <v-card-title class="text-h5">Choose the Starting Side</v-card-title>
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
import PickBanCardBlank from "./PickBanCardBlank.vue";

export default Vue.extend({
  components: {
    PickBanCard,
    PickBanCardBlank,
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

    return {
      cardHeightSelect: 100,
      cardWidthSelect: 500,

      cardHeightPickBan: 100,
      cardWidthPickBan: 500,

      backgroundImage: this.background,
      windowHeight: window.innerHeight,
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
    isTeamOneTurn(): boolean {
      const length = this.pickBanSelections.length;
      if (length === 0 || length === 2 || length === 4 || length === 6) {
        return true;
      } else {
        return false;
      }
    },
    isBan(): boolean {
      const index = this.pickBanSelections.length;
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
.pick-ban-selector-spacer {
  margin-top: 5px;
}
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

.filter-fab-enter-active,
.filter-fab-leave-active {
  transition: all 0.25s ease-out;
}

.minimap-enter-from,
.minimap-leave-to {
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

#pick-ban-selector-filters {
  position: absolute;
  top: 80px;
  right: 10px;
}

.pick-ban-selector-button-area {
  position: fixed;
  bottom: 50px;
}

.pick-ban-selector-card-label-large {
  display: flow-root;
  padding-top: 35px;
  font-size: 32px;
  text-align: left;
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

.lhs-column {
  background-color: rgba(0, 0, 0, 0);
}

.rhs-column {
  background-color: rgba(28, 11, 25, 0.9);
  border-left: 4px solid gray;
  border-bottom: 4px solid gray;
}

.title-icon {
  vertical-align: text-bottom;
}

.lhs-column-header-text {
  display: flow-root;
  padding-top: 24px;
  font-size: 28px;
  text-align: left;
  color: white;
  text-shadow: 0 0 5px #000000;
}
.team-action-card {
  margin-top: 10px;
}

.team-action-card-text {
  display: flow-root;
  padding-top: 24px;
  font-size: 32px;
  text-align: center;
  color: white;
  text-shadow: 0 0 5px #000000;
}

.transparent-background {
  background: rgba(0, 0, 0, 0);
}

.minimap-image {
  margin-top: 48px;
}
</style>
