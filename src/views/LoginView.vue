<template>
  <div>
    <v-img
      class="login-view-background"
      :src="backgroundImage"
      :key="backgroundImage"
      :min-height="windowHeight - 64"
      :max-height="windowHeight - 64"
    >
      <div class="login-view-center">
        <v-card dark color="rgba(103, 58, 183, 0.95)" width="500">
          <v-card-title class="text-h5"> Login into Valo Customs </v-card-title>

          <v-card-subtitle>
            Login or Register to Valo Customs to enable online Pick/Ban
            capabilities!
          </v-card-subtitle>

          <v-card-text>
            <div id="firebaseui-auth-container"></div>
          </v-card-text>
        </v-card>
      </div>
    </v-img>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

// Compat Firebase Initialisation used for FirebaseUI
import { firebaseConfig } from "@/firebase/firebase";

export default Vue.extend({
  name: "LoginView",
  components: {},
  data() {
    return {
      backgroundImage: require("@/assets/backgrounds/range-portal.png"),
      windowHeight: window.innerHeight,
    };
  },
  mounted() {
    firebase.initializeApp(firebaseConfig);
    var uiConfig = {
      signInFlow: "popup",
      signInSuccessUrl: "#/online",
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url/callback.
      tosUrl: "/tos",
      // Privacy policy url/callback.
      privacyPolicyUrl: "/privacy",
    };

    // Initialize the FirebaseUI Widget using Firebase.
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", uiConfig);
  },
});
</script>

<style scoped lang="scss">
.login-view-center {
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login-view-background {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
}
</style>
