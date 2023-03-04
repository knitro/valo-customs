<template>
  <div>
    <app-bar-valo-custom title="Home"></app-bar-valo-custom>
    <v-img
      class="spinner-selector-background"
      :src="backgroundImage"
      :key="backgroundImage"
      :min-height="windowHeight"
      :max-height="windowHeight"
    >
      <v-row no-gutters>
        <v-col cols="6">
          <v-card class="image-card-margins">
            <v-img :src="backgroundImage"></v-img>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="6">
          <v-card class="info-card-margins">
            <v-card-title> Basic Information </v-card-title>
            <v-card-subtitle>Email: {{ userEmailAddress }}</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="buttons-card-margins">
            <v-card-title> Options </v-card-title>
            <v-list>
              <div
                v-for="option in optionsButtons"
                v-bind:key="option.label + '_' + option.link"
              >
                <v-list-item @click="goToPage(option.link)">
                  <v-list-item-action>
                    <v-icon>{{ option.icon }}</v-icon>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title> {{ option.label }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider inset></v-divider>
              </div>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-img>
  </div>
</template>

<script lang="ts">
import { getUserEmail } from "@/firebase/auth/auth";
import Vue from "vue";
import router from "@/router";
import AppBarValoCustom from "@/components/AppBar/AppBarValoCustom.vue";

export default Vue.extend({
  name: "ProfileView",
  components: { AppBarValoCustom },
  setup() {
    return {
      optionsButtons: [
        { icon: "mdi-message-alert", label: "Feedback", link: "/feedback" },
        { icon: "mdi-logout", label: "Logout", link: "/logout" },
      ],
    };
  },
  data() {
    return {
      backgroundImage: require("@/assets/backgrounds/range-outside.png"),
      windowHeight: window.innerHeight,

      userEmailAddress: "n/a",
    };
  },
  mounted() {
    const retrievedUserEmail = getUserEmail();
    if (retrievedUserEmail !== null) {
      this.userEmailAddress = retrievedUserEmail;
    }
  },
  methods: {
    goToPage(link: string) {
      router.push(link);
    },
  },
});
</script>

<style scoped lang="scss">
.image-card-margins {
  margin: 20px;
}

.info-card-margins {
  margin: 20px;
}

.buttons-card-margins {
  margin-left: 10vw;
  margin-right: 20px;
}
</style>
