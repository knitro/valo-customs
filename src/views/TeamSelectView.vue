<template>
  <div>
    <app-bar-valo-custom title="Team Select"></app-bar-valo-custom>

    <v-row v-show="state === 0" no-gutters>
      <v-col>
        <v-card class="grid-margin">
          <v-card-title>Player List</v-card-title>
          <v-card-subtitle>
            Player Count:
            <b>{{ playerNames.length }}</b>
          </v-card-subtitle>
          <v-list>
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

      <v-col>
        <v-text-field
          append-outer-icon="mdi-send"
          v-model="inputValue"
          outlined
          height="50"
          class="team-select-text-input grid-margin"
          label="Player Name"
          color="purple"
          @keydown.enter="addNewPlayer"
          @click:append-outer="addNewPlayer"
          clear-icon="mdi-close-circle"
          clearable
        >
        </v-text-field>
        <v-row class="grid-margin">
          <v-col>
            <v-btn x-large block @click="clearPlayerList" color="warning">
              <v-icon left dark> mdi-trash-can-outline </v-icon>
              Clear Player List
            </v-btn>
          </v-col>
          <v-col>
            <v-btn x-large block @click="createTeams" color="deep-purple" dark>
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
        ></team-card>
      </v-col>
      <v-col cols="4">
        <team-card
          title="Team 2"
          subtitle="Defender Side"
          color="#16E5B4"
          :players="teamTwo"
          class="grid-margin"
        ></team-card>
      </v-col>
      <v-col cols="4">
        <team-card
          title="Spectators"
          subtitle="Observers"
          color="grey"
          :players="spectators"
          class="grid-margin"
        ></team-card>
        <v-row>
          <v-col class="grid-margin">
            <v-btn x-large block @click="createTeams" color="warning">
              <v-icon left dark> mdi-redo </v-icon>
              Recreate Teams
            </v-btn>
          </v-col>
          <v-col class="grid-margin">
            <v-btn
              x-large
              block
              @click="addPlayersView"
              color="deep-purple"
              dark
            >
              <v-icon left dark> mdi-arrow-left </v-icon>
              Change Player List
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-show="state === 1"> </v-row>
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
  font-size: 14px;
}

.grid-margin {
  margin: 10px;
}
</style>
