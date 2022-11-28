<template>
  <div class="center">
    <div class="top-text" :style="{ width: cardWidth + 'px' }">
      {{ topLabel }}
    </div>
    <v-card
      :height="cardHeight"
      :width="cardWidth"
      class="center-content transparent-background"
    >
      <pick-ban-card-blank
        v-if="isDisplayBlank"
        :height="cardHeight"
        :width="cardWidth"
        :label="''"
      ></pick-ban-card-blank>
      <pick-ban-card
        v-if="!isDisplayBlank"
        :id="'select-card-' + index"
        :height="cardHeight"
        :width="cardWidth"
        :label="mapName"
        :background-image-url="mapImage"
        :status="mapStatus"
        :teamSide="mapTeamSide"
        :key="'select-' + mapName + '-' + mapStatus + '-' + mapTeamSide"
      ></pick-ban-card>
    </v-card>
    <div class="bottom-text" :style="{ width: cardWidth + 'px' }">
      {{ bottomLabel }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { PropType } from "vue/types/v3-component-props";
import { VCard } from "vuetify/lib";
import { PickBanItem, PickBanMapStatus, PickBanTeamSide } from "./PickBan";
import PickBanCardBlank from "./PickBanCardBlank.vue";
import PickBanCard from "./PickBanCard.vue";

export default Vue.extend({
  components: {
    VCard,
    PickBanCardBlank,
    PickBanCard,
  },
  name: "PickBanSelectionDisplay",
  props: {
    index: {
      type: Number,
      required: true,
    },
    isDisplayBlank: {
      type: Boolean,
      required: true,
    },
    cardHeight: {
      type: Number,
      required: true,
    },
    cardWidth: {
      type: Number,
      required: true,
    },
    mapName: {
      type: String,
      default: "",
    },
    mapImage: {
      type: String,
      default: "",
    },
    mapStatus: {
      type: Number as PropType<PickBanMapStatus>,
      default: -1,
    },
    mapTeamSide: {
      type: Number as PropType<PickBanTeamSide>,
      default: -1,
    },
    isTeamOneTurn: {
      type: Boolean,
      required: true,
    },
    isBan: {
      type: Boolean,
      required: true,
    },
    teamOneName: {
      type: String,
      required: true,
    },
    teamTwoName: {
      type: String,
      required: true,
    },
  },
  data() {
    // Determine Top Label
    let topLabel = this.index + 1 + ". ";
    if (this.index === 6) {
      topLabel += "Remaining Map";
    } else {
      topLabel += this.isTeamOneTurn ? this.teamOneName : this.teamTwoName;
      topLabel += " to ";
      topLabel += this.isBan ? "Ban" : "Pick";
    }

    // Determine Bottom Label
    let bottomLabel = this.isTeamOneTurn ? this.teamOneName : this.teamTwoName;
    switch (this.mapTeamSide) {
      case PickBanTeamSide.ATTACK_SIDE: {
        bottomLabel += " to Attack";
        break;
      }
      case PickBanTeamSide.DEFEND_SIDE: {
        bottomLabel += " to Defend";
        break;
      }
      case PickBanTeamSide.UNSELECTED: {
        bottomLabel += " is choosing which side to start";
        break;
      }
      case PickBanTeamSide.NOT_APPLICABLE: {
        bottomLabel = "";
        break;
      }
      default: {
        bottomLabel = "-";
        break;
      }
    }

    return {
      topLabel: topLabel,
      bottomLabel: bottomLabel,
    };
  },
  watch: {
    mapTeamSide: function () {
      let updatedBottomLabel = this.isTeamOneTurn
        ? this.teamOneName
        : this.teamTwoName;
      switch (this.mapTeamSide) {
        case PickBanTeamSide.ATTACK_SIDE: {
          updatedBottomLabel += " to Attack";
          break;
        }
        case PickBanTeamSide.DEFEND_SIDE: {
          updatedBottomLabel += " to Defend";
          break;
        }
        case PickBanTeamSide.UNSELECTED: {
          updatedBottomLabel += " is choosing which side to start";
          break;
        }
        case PickBanTeamSide.NOT_APPLICABLE: {
          updatedBottomLabel = "";
          break;
        }
        default: {
          updatedBottomLabel = "-";
          break;
        }
      }
      this.bottomLabel = updatedBottomLabel;
    },
  },
});
</script>

<style scoped lang="scss">
.center-content {
  display: block;
  margin: auto;
}

.top-text {
  display: block;
  margin: auto;
  text-align: left;
  color: white;
  text-shadow: 0 0 5px #000000;
}

.bottom-text {
  display: block;
  margin: auto;
  text-align: right;
  color: white;
  text-shadow: 0 0 5px #000000;
}
</style>
