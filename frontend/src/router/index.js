import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import ProductManager from "../components/ProductManager.vue";
import CategoryManager from "../components/CategoryManager.vue";
import CategoryDetail from "../components/CategoryDetail.vue";
import ImpressumComponente from "../components/ImpressumComponente.vue";
import DatenschutzErklaerung from "../components/DatenschutzErklaerung.vue";
import KontaktComponente from "../components/KontaktComponente.vue";
import SignIn from "../components/SignIn.vue";
import RegisterComponente from "../components/RegisterComponente.vue";
import UserList from "../components/UserList.vue";
import MessageList from "../components/MessageList.vue";
import MessageDetail from "../components/MessageDetail.vue";
import ProductDetail from "../components/ProductDetail.vue";
import TransactionManager from "../components/TransactionManager.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/products",
    name: "ProductManager",
    component: ProductManager,
  },
  {
    path: "/category",
    name: "CategoryManager",
    component: CategoryManager,
    meta: { requiresAdmin: true },
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
  {
    path: "/kontakt",
    name: "KontaktComponente",
    component: KontaktComponente,
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/register",
    name: "RegisterComponente",
    component: RegisterComponente,
  },
  {
    path: "/users",
    name: "UserList",
    component: UserList,
    meta: { requiresAdmin: true }, // Meta-Flag für Admin-Zugriff
  },
  {
    path: "/message",
    name: "MessageList",
    component: MessageList,
    meta: { requiresAdmin: true }, // Meta-Flag für Admin-Zugriff
  },
  {
    path: "/message/:messageId",
    name: "MessageDetail",
    component: MessageDetail,
    props: true,
  },
  {
    path: "/products/:productId",
    name: "ProductDetail",
    component: ProductDetail,
  },
  {
    path: "/category/:categoryId",
    name: "CategoryDetail",
    component: CategoryDetail,
    props: true,
  },
  {
    path: "/transactions",
    name: "TransactionManager",
    component: TransactionManager,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route-Guard für Admin-Check
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAdmin) {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1])); // payload definieren
        if (payload.role === "admin") {
          next();
        } else {
          next({
            path: "/",
            query: {
              error:
                "Zugriff verweigert. Nur Admins haben Zugriff auf diese Seite.",
            },
          });
        }
      } catch (error) {
        console.error("Fehler beim Auslesen des Tokens:", error);
        next("/signin");
      }
    } else {
      next("/signin");
    }
  } else {
    next();
  }
});

export default router;
