import AppLayout from "@/layout/AppLayout.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

export enum AppRoutes {
  MAIN = "Main",
  LOGIN = "Login",
  REG = "Reg",
  COMMON = "Common",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.LOGIN]: "/auth/login",
  [AppRoutes.REG]: "/auth/reg",
  [AppRoutes.COMMON]: "/common",
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: AppLayout,
      children: [
        {
          path: RoutePath.Main,
          name: AppRoutes.MAIN,
          component: () => import("@/views/Dashboard.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: RoutePath.Common,
          name: AppRoutes.COMMON,
          component: () => import("@/views/Common.vue"),
          meta: { requiresAuth: true },
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
      path: RoutePath.Reg,
      name: AppRoutes.REG,
      component: () => import("@/views/pages/auth/Reg.vue"),
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
