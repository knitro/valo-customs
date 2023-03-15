<template>
  <div>
    <v-img
      :src="backgroundImage"
      :min-height="windowHeight"
      :max-height="windowHeight"
    >
      <app-bar-valo-custom title="Team Select"></app-bar-valo-custom>

      <v-row v-show="state === 0" no-gutters>
        <v-col cols="6">
          <v-card class="grid-margin card-curved" :color="cardBackgroundColour">
            <div class="background-color-white-transparent">
              <v-img
                :src="playerListImage"
                :gradient="'to top right, rgba(116, 0, 184, 0.8), rgba(25,32,72,.7)'"
                height="112"
                class="card-curved"
              >
                <v-card-text>
                  <div class="text-h4 title-text">Player List</div>
                  <div class="subtitle-text">
                    Player Count:
                    <b>{{ playerNames.length }}</b>
                  </div>
                </v-card-text>
              </v-img>
            </div>
            <v-list
              :color="cardBackgroundColour"
              class="overflow-y-auto"
              max-height="600"
            >
              <v-list-item v-show="playerNames.length === 0">
                <i>
                  No players added yet! To add a player, enter a player name in
                  the text field on the right.
                </i>
              </v-list-item>
              <v-list-item v-for="(item, index) in playerNames" :key="index">
                <v-list-item-avatar>
                  <v-icon class="purple lighten-1" dark>mdi-account</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="removePlayer(index)">
                    <v-icon color="red">mdi-close</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card class="grid-margin card-curved" :color="cardBackgroundColour">
            <v-text-field
              append-outer-icon="mdi-send"
              v-model="inputValue"
              height="60"
              class="team-select-text-input"
              label="Player Name"
              color="purple"
              @keydown.enter="addNewPlayer"
              @click:append-outer="addNewPlayer"
              clear-icon="mdi-close-circle"
              clearable
              filled
              hide-details="auto"
            >
            </v-text-field>
          </v-card>
          <v-row class="grid-margin">
            <v-col>
              <v-btn
                x-large
                block
                @click="clearPlayerList"
                color="warning"
                rounded
              >
                <v-icon left dark> mdi-trash-can-outline </v-icon>
                Clear Player List
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                x-large
                block
                @click="createTeams"
                color="deep-purple"
                dark
                rounded
              >
                <v-icon left dark> mdi-account-group </v-icon>
                Create Teams
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row v-show="state === 1" no-gutters>
        <v-col cols="4">
          <team-card
            title="Team 1"
            subtitle="Attacker Side"
            color="#EF5351"
            :players="teamOne"
            class="grid-margin"
            :headerImage="backgroundTeamOne"
            :overflowCheck="false"
          ></team-card>
        </v-col>
        <v-col cols="4">
          <team-card
            title="Team 2"
            subtitle="Defender Side"
            color="#16E5B4"
            :players="teamTwo"
            class="grid-margin"
            :headerImage="backgroundTeamTwo"
            :overflowCheck="false"
          ></team-card>
        </v-col>
        <v-col cols="4">
          <team-card
            title="Spectators"
            subtitle="Observers"
            color="grey"
            :players="spectators"
            class="grid-margin"
            :headerImage="backgroundSpectator"
            :overflowCheck="true"
          ></team-card>

          <v-row no-gutters>
            <v-col>
              <v-btn
                x-large
                @click="createTeams"
                color="warning"
                rounded
                class="grid-margin"
              >
                <v-icon left dark> mdi-redo </v-icon>
                Recreate Teams
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                x-large
                @click="addPlayersView"
                color="deep-purple"
                dark
                rounded
                class="grid-margin"
              >
                <v-icon left dark> mdi-arrow-left </v-icon>
                Change Player List
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row v-show="state === 1"> </v-row>
    </v-img>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppBarValoCustom from "@/components/AppBar/AppBarValoCustom.vue";
import TeamCard from "@/components/Card/TeamCard/TeamCard.vue";

enum TeamSelectMode {
  PLAYER_ADD = 0,
  TEAM_VIEW = 1,
}

export default Vue.extend({
  name: "TeamSelectView",
  components: { AppBarValoCustom, TeamCard },
  data() {
    return {
      inputValue: "",
      playerNames: [] as string[],
      state: TeamSelectMode.PLAYER_ADD,

      teamOne: [] as string[],
      teamTwo: [] as string[],
      spectators: [] as string[],

      playerListImage: require("@/assets/images/target-practice.png"),
      backgroundTeamOne: require("@/assets/images/range-attack.png"),
      backgroundTeamTwo: require("@/assets/images/range-defense.png"),
      backgroundSpectator: require("@/assets/images/outside.png"),
      backgroundImage: require("@/assets/backgrounds/range-bots.png"),

      windowHeight: window.innerHeight,
      cardBackgroundColour: "rgba(255, 255, 255, 0.5)",
    };
  },
  methods: {
    addNewPlayer(): void {
      const player = this.inputValue;
      this.playerNames.push(player);
      this.inputValue = "";
    },
    removePlayer(index: number): void {
      this.playerNames.splice(index, 1);
    },
    createTeams(): void {
      // Create Copy of PlayerName Array
      const teamCopy = [...this.playerNames];

      //Shuffle via Schwartzian Transform, Complexity O(N Log(N))
      let shuffledArray = teamCopy
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      // Split into 2 Teams
      if (shuffledArray.length <= 10) {
        const indexSplit = Math.ceil(shuffledArray.length / 2);
        this.teamOne = shuffledArray.slice(0, indexSplit);
        this.teamTwo = shuffledArray.slice(indexSplit);
      } else {
        this.teamOne = shuffledArray.slice(0, 5);
        this.teamTwo = shuffledArray.slice(5, 10);
        this.spectators = shuffledArray.slice(10);
      }

      this.state = TeamSelectMode.TEAM_VIEW;
    },
    addPlayersView(): void {
      this.state = TeamSelectMode.PLAYER_ADD;
      this.resetArrays();
    },
    resetArrays(): void {
      this.teamOne = [];
      this.teamTwo = [];
      this.spectators = [];
    },
    clearPlayerList(): void {
      this.playerNames = [];
    },
  },
});
</script>

<style scoped lang="scss">
.online-view-center {
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
}
.team-select-text-input {
  font-size: 24px;
  padding-right: 8px;
}
.grid-margin {
  margin: 10px;
}
.card-curved {
  border-radius: 12px;
}
.background-color-white-transparent {
  background-color: rgba(255, 255, 255, 0.5);
}
.title-text {
  // color: rgba(114, 72, 188, 1);
  color: rgba(255, 255, 255, 1);
}
.subtitle-text {
  color: rgba(255, 255, 255, 1);
  // color: rgba(180, 180, 180, 0.9);
}
</style>
