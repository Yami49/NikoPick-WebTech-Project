import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import ProductManager from "../components/ProductManager.vue";
import CategoryManager from "../components/CategoryManager.vue";
import ImpressumComponente from "../components/ImpressumComponente.vue";
import DatenschutzErklaerung from "../components/DatenschutzErklaerung.vue";
import KontaktComponente from "../components/KontaktComponente.vue";

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
  {
    path: "/impressum",
    name: "ImpressumComponente",
    component: ImpressumComponente,
  },
  {
    path: "/datenschutzerklaerung",
    name: "DatenschutzErklaerung",
    component: DatenschutzErklaerung,
  },
  { path: "/kontakt", name: "KontaktComponente", component: KontaktComponente },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
