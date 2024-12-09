import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import ProductManager from "../components/ProductManager.vue";
import CategoryManager from "../components/CategoryManager.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/product",
    name: "ProductManager",
    component: ProductManager,
  },
  {
    path: "/category",
    name: "CategoryManager",
    component: CategoryManager,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
