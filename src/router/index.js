import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/views/home/Home.vue");

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
