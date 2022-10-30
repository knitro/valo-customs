<template>
  <div>
    <div class="online-view-pick-ban-center">
      <v-card class="mx-auto" max-width="344" :loading="waitingForOpponent">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
        ></v-img>

        <v-card-title> Waiting for your Opponent ... </v-card-title>

        <v-card-subtitle>
          Your code is: <b>{{ id }}</b>
        </v-card-subtitle>

        <v-expand-transition>
          <div
            v-show="
              currentSeries?.requests && currentSeries?.requests.length > 0
            "
          >
            <v-divider></v-divider>
            <v-card-text>
              <v-list subheader>
                <v-subheader>Opponent Requests</v-subheader>

                <v-list-item
                  v-for="(request, index) in currentSeries?.requests"
                  v-bind:key="index + '-' + request.name"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="request.name"
                    ></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-icon>
                    <v-icon color="deep-purple accent-4">
                      mdi-message-outline
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-icon>
                    <v-icon color="deep-purple accent-4">
                      mdi-message-outline
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { getOnlineSeriesListener } from "@/firebase/database/database";
import { Series, SeriesUser } from "@/firebase/database/database-interfaces";
import Vue from "vue";
import {
  VCard,
  VImg,
  VCardTitle,
  VCardSubtitle,
  VExpandTransition,
  VDivider,
  VCardText,
} from "vuetify/lib";

export default Vue.extend({
  name: "OnlinePickBanView",

  components: {
    VCard,
    VImg,
    VCardTitle,
    VCardSubtitle,
    VExpandTransition,
    VDivider,
    VCardText,
  },
  props: {
    id: String,
  },
  data() {
    return {
      currentSeries: null as Series | null,
      waitingForOpponent: true,
      showListOfRequestedOpponents: false,
    };
  },
  methods: {
    getSeries() {
      const updater = (a: Series) => {
        this.currentSeries = a;
      };
      const accessDenied = () => {
        this.$router.push({ name: "onlineFail" });
      };
      getOnlineSeriesListener(this.id, updater, accessDenied);
    },
  },
  mounted() {
    this.getSeries();
  },
});
</script>

<style scoped lang="scss">
.online-view-pick-ban-center {
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
}
</style>
