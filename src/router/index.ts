import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RandomMapView from "@/views/RandomMapView.vue";
import TeamSelectView from "@/views/TeamSelectView.vue";
import BestOfOneView from "@/views/BestOfOneView.vue";
import BestOfThreeView from "@/views/BestOfThreeView.vue";
import OnlineView from "@/views/OnlineView.vue";
import OnlineFailView from "@/views/OnlineFailView.vue";
import OnlinePickBanView from "@/views/OnlinePickBanView.vue";
import LoginView from "@/views/LoginView.vue";
import { auth } from "@/firebase/firebase";
import ProfileView from "@/views/ProfileView.vue";
import LogoutView from "@/views/LogoutView.vue";
import FeedbackView from "@/views/FeedbackView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/random",
    name: "random",
    component: RandomMapView,
  },
  {
    path: "/teams",
    name: "teams",
    component: TeamSelectView,
  },
  {
    path: "/bestOfOne",
    name: "bestOfOne",
    component: BestOfOneView,
  },
  {
    path: "/bestOfThree",
    name: "bestOfThree",
    component: BestOfThreeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      hideForAuth: true,
    },
  },
  {
    path: "/online",
    name: "online",
    component: OnlineView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/online-fail",
    name: "onlineFail",
    component: OnlineFailView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/online/:id",
    name: "onlinePickBan",
    component: OnlinePickBanView,
    meta: {
      requiresAuth: true,
    },
    props: true,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/feedback",
    name: "feedback",
    component: FeedbackView,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

// Router Guard for Authentication
router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged(function (user) {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!user) {
        next({ path: "/login" });
      } else {
        next();
      }
    } else {
      next();
    }

    if (to.matched.some((record) => record.meta.hideForAuth)) {
      if (user) {
        next({ path: "/online" });
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

export default router;
