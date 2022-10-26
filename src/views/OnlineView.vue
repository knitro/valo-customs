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
                <v-btn text @click="createButtonPress">Create Game</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col>
            <v-card color="#385F73" dark>
              <v-card-title class="text-h5">Create</v-card-title>
              <v-card-subtitle>
                Enter the code that the opponent has sent you
              </v-card-subtitle>
              <v-card-text>
                <v-text-field v-model="joinCode" outlined label="Join Code">
                </v-text-field
              ></v-card-text>
              <v-card-actions>
                <v-btn text @click="joinButtonPress">Join Game</v-btn>
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
import Vue from "vue";

export default Vue.extend({
  name: "OnlineView",

  components: {},
  data() {
    return {
      teamName: "",
      createBo3Switch: false,
      joinCode: "",
    };
  },
  methods: {
    createButtonPress() {
      //
    },
    joinButtonPress() {
      //
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
  font-size: 36px;
}
</style>
