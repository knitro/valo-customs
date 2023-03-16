<template>
  <div>
    <app-bar-valo-custom title="Home"></app-bar-valo-custom>
    <v-img
      class="login-view-background"
      :src="backgroundImage"
      :key="backgroundImage"
      :min-height="windowHeight"
      :max-height="windowHeight"
    >
      <div class="online-view-pick-ban-center" v-if="!isGaming">
        <v-card class="mx-auto" max-width="344" :loading="waitingForOpponent">
          <v-img :src="waitingImage" height="200px"></v-img>

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

                    <v-list-item-icon @click="acceptRequest(request)">
                      <v-icon color="green"> mdi-check </v-icon>
                    </v-list-item-icon>
                    <v-list-item-icon @click="declineRequest(request)">
                      <v-icon color="red"> mdi-close </v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </div>
      <div v-if="isGaming">
        <pick-ban-selector-online
          :items="maps"
          :background="backgroundImage"
          :isBo1="!currentSeries?.isBo3"
          :teamOneName="currentSeries?.t1?.name"
          :teamTwoName="currentSeries?.t2?.name"
          :id="id"
        ></pick-ban-selector-online>
      </div>
    </v-img>
  </div>
</template>

<script lang="ts">
import { COMP_MAPS, DEFAULT_BACKGROUND } from "@/data/map-data";
import {
  getOnlineSeriesListener,
  updateRequestsOnlineSeries,
} from "@/firebase/database/database";
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
import PickBanSelectorOnline from "@/components/PickBan/PickBanSelectorOnline.vue";
import AppBarValoCustom from "@/components/AppBar/AppBarValoCustom.vue";

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
    PickBanSelectorOnline,
    AppBarValoCustom,
  },
  props: {
    id: String,
  },
  data() {
    return {
      currentSeries: null as Series | null,
      waitingForOpponent: true,
      showListOfRequestedOpponents: false,
      isGaming: false,
      unsubscribeFunction: () => undefined,

      maps: COMP_MAPS,
      windowHeight: window.innerHeight,
      waitingImage: require("@/assets/images/outhouse.png"),
      backgroundImage: DEFAULT_BACKGROUND,
    };
  },
  methods: {
    acceptRequest(request: SeriesUser) {
      if (this.currentSeries) {
        const updatedRequests = this.currentSeries.requests;
        const indexOfRequest = updatedRequests.indexOf(request);
        updatedRequests.splice(indexOfRequest, 1);
        updateRequestsOnlineSeries(
          this.currentSeries.code,
          updatedRequests,
          request
        );
        this.unsubscribeFunction();
      }
    },
    declineRequest(request: SeriesUser) {
      if (this.currentSeries) {
        const updatedRequests = this.currentSeries.requests;
        const indexOfRequest = updatedRequests.indexOf(request);
        updatedRequests.splice(indexOfRequest, 1);
        updateRequestsOnlineSeries(this.currentSeries.code, updatedRequests);
      }
    },
    async getSeries() {
      const updater = (a: Series) => {
        this.currentSeries = a;
        if (this.currentSeries.t2) {
          this.isGaming = true;
        }
      };
      const accessDenied = () => {
        this.$router.push({ name: "onlineFail" });
      };
      this.unsubscribeFunction = await getOnlineSeriesListener(
        this.id,
        updater,
        accessDenied
      );
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
