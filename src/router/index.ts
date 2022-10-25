import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RandomView from "@/views/RandomView.vue";
import BestOfOneView from "@/views/BestOfOneView.vue";
import BestOfThreeView from "@/views/BestOfThreeView.vue";
import OnlineView from "@/views/OnlineView.vue";
import OnlinePickBanView from "@/views/OnlinePickBanView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/random",
    name: "random",
    component: RandomView,
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
    path: "/online",
    name: "online",
    component: OnlineView,
  },
  {
    path: "/online/:id",
    name: "onlinePickBan",
    component: OnlinePickBanView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
