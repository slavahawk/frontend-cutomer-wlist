import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layout/DefaultLayout.vue";

// Определение маршрутов приложения
export enum AppRoutes {
  MAIN = "Main",
  TABS = "Tabs",
  HOME = "Home",
  NOT_FOUND = "NotFound",
}

// Определение пути для каждого маршрута
export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/:id",
  [AppRoutes.TABS]: "/:id/tabs",
  [AppRoutes.HOME]: "/",
  [AppRoutes.NOT_FOUND]: "/:pathMatch(.*)*",
};

// Создание экземпляра роутера
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: RoutePath[AppRoutes.HOME],
      name: AppRoutes.HOME,
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/:id",
      component: DefaultLayout,
      children: [
        {
          path: RoutePath[AppRoutes.MAIN],
          name: AppRoutes.MAIN,
          component: () => import("@/views/MainView.vue"),
        },
        {
          path: RoutePath[AppRoutes.TABS],
          name: AppRoutes.TABS,
          component: () => import("@/views/TabsView.vue"),
        },
      ],
    },
    {
      path: RoutePath[AppRoutes.NOT_FOUND],
      name: AppRoutes.NOT_FOUND,
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

export default router;
