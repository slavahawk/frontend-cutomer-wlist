import AppLayout from "@/layout/AppLayout.vue";
import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layout/DefaultLayout.vue";

export enum AppRoutes {
  MAIN = "Main",
  TABS = "Tabs",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/:id",
  [AppRoutes.TABS]: "/:id/tabs",
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
        },
        {
          path: "/",
          component: AppLayout,
          children: [
            {
              path: RoutePath.Tabs,
              name: AppRoutes.TABS,
              component: () => import("@/views/TabsView.vue"),
            },
          ],
        },
      ],
    },

    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});
//
// router.beforeEach((to, from, next) => {
//   console.log(!to.params?.id);
//   //
//   // if (!to.params?.id) {
//   //   // next("/1");
//   //   return;
//   // }
// });

export default router;
