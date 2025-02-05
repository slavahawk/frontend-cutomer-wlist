import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import HomeView from "@/views/HomeView.vue";

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
      component: HomeView, // Используем отдельный компонент HomeView для страницы("/")
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
router.beforeEach((to, from, next) => {
  if (to.name === AppRoutes.HOME) {
    // Используем window.location.replace() для редиректа на внешний URL
    window.location.replace("https://w-list.ru/");
    // next() не нужен, так как мы выполняем редирект
  } else {
    next(); // Продолжаем навигацию для остальных маршрутов
  }
});

export default router;
