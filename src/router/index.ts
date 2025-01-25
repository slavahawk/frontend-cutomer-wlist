import AppLayout from "@/layout/AppLayout.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import DefaultLayout from "@/layout/DefaultLayout.vue";

export enum AppRoutes {
  MAIN = "Main",
  LOGIN = "Login",
  TABS = "Tabs",
  WINES = "Wines",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.LOGIN]: "/auth/login",
  [AppRoutes.TABS]: "/tabs",
  [AppRoutes.WINES]: "/wines",
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: RoutePath.Main,
          name: AppRoutes.MAIN,
          component: () => import("@/views/Main.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/",
          component: AppLayout,
          children: [
            {
              path: RoutePath.Tabs,
              name: AppRoutes.TABS,
              component: () => import("@/views/TabsView.vue"),
              meta: { requiresAuth: true },
            },
            {
              path: RoutePath.Wines,
              name: AppRoutes.WINES,
              component: () => import("@/views/Wines.vue"),
              meta: { requiresAuth: true },
            },
          ],
        },
      ],
    },

    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: () => import("@/views/pages/NotFound.vue"),
    },

    {
      path: RoutePath.Login,
      name: AppRoutes.LOGIN,
      component: () => import("@/views/pages/auth/Login.vue"),
    },
    {
      path: "/auth/access",
      name: "accessDenied",
      component: () => import("@/views/pages/auth/Access.vue"),
    },
    {
      path: "/auth/error",
      name: "error",
      component: () => import("@/views/pages/auth/Error.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  // Обновляем состояние аутентификации
  authStore.checkAuth();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      next({ name: AppRoutes.LOGIN });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
