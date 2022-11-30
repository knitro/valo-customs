<template>
  <div>
    <v-img
      class="login-view-background"
      :src="backgroundImage"
      :key="backgroundImage"
      :min-height="windowHeight - 64"
      :max-height="windowHeight - 64"
    >
      <div class="online-view-center">
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                v-model="teamName"
                outlined
                height="100"
                class="online-view-text-input"
                label="Team Name"
                hint="This will be seen by your opponent to confirm that they have the right opponent."
                counter="20"
                :rules="[rules.required, rules.teamNameCount]"
                color="purple"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card color="rgb(206, 121, 107)" dark>
                <v-card-title class="text-h5">Create</v-card-title>

                <v-card-subtitle> Game Settings </v-card-subtitle>

                <v-card-text>
                  <v-switch
                    v-model="createBo3Switch"
                    inset
                    :label="`Series Type: ${
                      createBo3Switch ? 'Best of Three' : 'Best of One'
                    }`"
                  ></v-switch>
                </v-card-text>

                <v-card-actions>
                  <v-btn text @click="createButtonPress" :loading="isCreating">
                    Create Game
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col>
              <v-card color="rgb(206, 121, 107)" dark>
                <v-card-title class="text-h5">Join</v-card-title>
                <v-card-subtitle>
                  Enter the code that the opponent has sent you
                </v-card-subtitle>
                <v-card-text>
                  <v-text-field
                    v-model="joinCode"
                    outlined
                    label="Join Code"
                    @input="joinCodeInput"
                    maxlength="5"
                    :rules="[rules.required, rules.validJoinCode]"
                  >
                  </v-text-field
                ></v-card-text>
                <v-card-actions>
                  <v-btn
                    text
                    @disabled="joinCodeValid"
                    @click="joinButtonPress"
                    :loading="isJoining"
                  >
                    Join Game
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-overlay :z-index="0" :value="showJoinLoadingOverlay">
        <v-card class="mx-auto" max-width="500" loading>
          <v-img :src="waitingImage"></v-img>
          <v-card-title>Waiting to Join Game...</v-card-title>

          <v-card-text>
            You have requested to join <b>{{ opponentsName }}</b
            >'s game. Please wait as they choose to either accept or decline
            your request.
          </v-card-text>
        </v-card>
      </v-overlay>
    </v-img>
  </div>
</template>

<script lang="ts">
import {
  createOnlineSeries,
  getOnlineSeriesListener,
  requestJoinSeries,
} from "@/firebase/database/database";
import { Series, SeriesUser } from "@/firebase/database/database-interfaces";
import { auth } from "@/firebase/firebase";
import Vue from "vue";

export default Vue.extend({
  name: "OnlineView",

  components: {},
  data() {
    return {
      teamName: "",
      createBo3Switch: false,
      joinCode: "",
      joinCodeValid: false,
      isCreating: false,
      isJoining: false,
      rules: {
        required: (value: string) => !!value || "Required.",
        validJoinCode: (value: string) => {
          const pattern = /[A-Z][A-Z][0-9][0-9][0-9]/;
          return pattern.test(value) || "Invalid Join Code";
        },
        teamNameCount: (value: string) =>
          value.length <= 20 || "Max 20 characters",
      },
      showJoinLoadingOverlay: false,
      opponentsName: "",

      waitingImage: require("@/assets/images/outside.png"),
      backgroundImage: require("@/assets/backgrounds/range-outside.png"),
      windowHeight: window.innerHeight,
    };
  },
  methods: {
    createButtonPress() {
      if (!this.isCreating) {
        this.isCreating = true;
        createOnlineSeries(this.teamName, this.createBo3Switch).then(
          (joinCode: string) => {
            this.$router.push({
              name: "onlinePickBan",
              params: { id: joinCode },
            });
          }
        );
      }
    },
    joinButtonPress() {
      this.isJoining = true;
      if (this.joinCodeValid && this.teamName.length <= 20) {
        requestJoinSeries(this.joinCode, this.teamName).then(
          async (isRequestSuccess: boolean) => {
            console.log("passed" + isRequestSuccess);
            if (isRequestSuccess) {
              this.showJoinLoadingOverlay = true;
              const updater = (a: Series) => {
                if (a === null || a === undefined) {
                  return;
                }
                this.opponentsName = a.t1.name;
                const selfSeriesUser: SeriesUser = {
                  id: auth.currentUser ? auth.currentUser.uid : "",
                  name: this.teamName,
                };
                if (a.t2 && a.t2.id === selfSeriesUser.id) {
                  this.$router.push({
                    name: "onlinePickBan",
                    params: { id: this.joinCode },
                  });
                  return;
                }
                if (
                  !this.checkIfRequestsIncludeCurrent(
                    a.requests,
                    selfSeriesUser
                  )
                ) {
                  console.log("not contained");
                  this.showJoinLoadingOverlay = false;
                  this.isJoining = false;
                  unsubscribe();
                }
              };
              const accessDenied = () => {
                console.log("access denied");
                this.showJoinLoadingOverlay = false;
                this.isJoining = false;
              };
              const unsubscribe = await getOnlineSeriesListener(
                this.joinCode,
                updater,
                accessDenied
              );
            } else {
              this.isJoining = false;
            }
          }
        );
      } else {
        this.isJoining = false;
      }
    },
    joinCodeInput() {
      this.joinCode = this.joinCode.toUpperCase();
      if (this.rules.validJoinCode(this.joinCode) !== "Invalid Join Code") {
        this.joinCodeValid = true;
      } else {
        this.joinCodeValid = false;
      }
    },
    checkIfRequestsIncludeCurrent(
      requests: SeriesUser[],
      current: SeriesUser
    ): boolean {
      if (requests === null || requests === undefined) {
        return false;
      }
      let output = false;
      requests.forEach((value: SeriesUser) => {
        if (current.id === value.id) {
          output = true;
        }
      });
      return output;
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

.online-view-text-input {
  font-size: 28px;
}
</style>
