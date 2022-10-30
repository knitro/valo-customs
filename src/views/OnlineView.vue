<template>
  <div>
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
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card color="#385F73" dark>
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
            <v-card color="#385F73" dark>
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
  </div>
</template>
ye

<script lang="ts">
import {
  createOnlineSeries,
  requestJoinSeries,
} from "@/firebase/database/database";
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
      console.log("Press");
      this.isJoining = true;
      if (this.joinCodeValid && this.teamName.length <= 20) {
        requestJoinSeries(this.joinCode, this.teamName).then(
          (isRequestSuccess: boolean) => {
            console.log("passed" + isRequestSuccess);
            if (isRequestSuccess) {
              // TODO:: Make popup on this view to say waiting. Opponent Name: ___ \n Join Code: __
              // this.$router.push({
              //   name: "onlinePickBan",
              //   params: { id: this.joinCode },
              // });
            } else {
              this.isJoining = false;
            }
          }
        );
      } else {
        console.log("invalid");
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
