<template>
  <v-img :height="height" :width="width" :src="backgroundImageUrl">
    <div
      :id="'pick-ban-card-div-' + label + '-' + id"
      :class="cardHighlightClass"
    > 
      <v-card-title class="pick-ban-card-top-left">{{
        pickBanLabel
      }}</v-card-title>
      <v-card-title class="pick-ban-card-bottom-left">{{
        teamSideString
      }}</v-card-title>
      <v-card-title class="pick-ban-card-bottom-right">{{
        label
      }}</v-card-title>
    </div>
  </v-img>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PickBanCard",
  props: {
    id: {
      type: String,
      required: true,
    },
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
    status: {
      type: Number,
      // -1< = =Error Status,
      // 0 == Unselected,
      // 1 == Selected,
      // 2 == Picked,
      // 3 == Banned
      required: true,
    },
    teamSide: {
      type: Number,
      // ATTACK_SIDE = 0, Team 1 on Attacker Side
      // DEFEND_SIDE = 1, Team 1 on Defender Side
      // UNSELECTED = 2, Team is still selecting side
      // NOT_APPLICABLE = 3, Map is Banned therefore side is N/A
      required: true,
    },
  },
  data() {
    // Establish Class for Highlighting and Pick/Ban Label
    let cardHighlightClass = "pick-ban-card-gradient-";
    let pickBanLabel = "";
    switch (this.status) {
      case 0: {
        cardHighlightClass += "unselected";
        break;
      }
      case 1: {
        cardHighlightClass += "selected";
        break;
      }
      case 2: {
        cardHighlightClass += "picked";
        pickBanLabel = "Pick";
        break;
      }
      case 3: {
        cardHighlightClass += "banned";
        pickBanLabel = "Ban";
        break;
      }
      default: {
        cardHighlightClass += "error";
        break;
      }
    }

    // Establish Label for Team Side
    let teamSideString = "";
    let nameOfTeam1 = "Team 1";
    switch (this.teamSide) {
      case 0: {
        teamSideString = nameOfTeam1 + " is Attacking";
        break;
      }
      case 1: {
        teamSideString = nameOfTeam1 + " is Defending";
        break;
      }
      case 2: {
        teamSideString = nameOfTeam1 + " is choosing which side to start";
        break;
      }
      case 3: {
        teamSideString = "";
        break;
      }
      default: {
        teamSideString = "Error";
        break;
      }
    }

    return {
      pickBanLabel: pickBanLabel,
      cardHighlightClass: cardHighlightClass,
      teamSideString: teamSideString,
    };
  },
  mounted() {
    const divBackground = document.getElementById(
      "pick-ban-card-div-" + this.label + "-" + this.id
    );

    if (divBackground) {
      divBackground.style.height = this.height + "px";
      divBackground.style.width = this.width + "px";
    }
  },
});
</script>

<style scoped lang="scss">
.pick-ban-card-top-left {
  text-align: left;
  color: white;
  text-shadow: 0 0 5px #000000;
}

.pick-ban-card-bottom-left {
  text-align: left;
  position: absolute;
  bottom: 0;
  color: white;
  text-shadow: 0 0 5px #000000;
}

.pick-ban-card-bottom-right {
  text-align: right;
  position: absolute;
  bottom: 0;
  right: 0;
  color: white;
  text-shadow: 0 0 5px #000000;
}

.pick-ban-card-gradient-unselected {
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.6)
  );
}

.pick-ban-card-gradient-selected {
  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0) 0%,
    rgba(184, 0, 255, 0.3) 100%
  );
}

.pick-ban-card-gradient-picked {
  background: rgb(11, 236, 22);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 255, 34, 0.3) 100%
  );
}

.pick-ban-card-gradient-banned {
  background: rgb(238, 178, 174);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 0, 0, 0.3) 100%
  );
}

.pick-ban-card-gradient-error {
  background: rgb(0, 17, 255);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0) 0%,
    rgba(49, 46, 253, 0.3) 100%
  );
}
</style>
