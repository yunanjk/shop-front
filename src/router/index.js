import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/views/home/Home.vue");
const Product = () => import("@/views/product/Product.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/product",
    name: "product",
    component: Product,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
