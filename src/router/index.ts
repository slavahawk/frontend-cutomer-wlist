import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layout/DefaultLayout.vue";

export enum AppRoutes {
  MAIN = "Main",
  TABS = "Tabs",
  HOME = "Home",
  NOT_FOUND = "Not Found",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/:id",
  [AppRoutes.TABS]: "/:id/tabs",
  [AppRoutes.HOME]: "/", // Используем "/:id" в path
  [AppRoutes.NOT_FOUND]: "/:pathMatch(.*)*",
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: RoutePath[AppRoutes.HOME], // Переименуем path "/home" в "/"
      name: AppRoutes.HOME,
      component: () => import("@/views/HomeView.vue"), // Используем отдельный компонент HomeView для страницы("/")
    },
    {
      path: "/:id",
      component: DefaultLayout, // Используем AppLayout для страницы "/:id"
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
