<script setup lang="ts">
import { RoutePath } from "@/router";
</script>

<template>
  <div class="flex items-center justify-center min-h-screen overflow-hidden">
    <div class="flex flex-col items-center justify-center">
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color) 10%,
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="w-full bgSurface0 dark:bg-surface-900 py-20 px-8 sm:px-20 flex flex-col items-center"
          style="border-radius: 53px"
        >
          <span class="text-primary font-bold text-3xl">404</span>
          <h1
            class="text-surface-900 dark:text-surface-0 font-bold text-3xl lg:text-5xl mb-2"
          >
            Страница не найдена
          </h1>

          <router-link
            to="/"
            class="w-full flex items-center py-8 border-surface-300 dark:border-surface-500 border-b"
          >
            <span
              class="flex justify-center items-center border-2 border-primary text-primary rounded-border"
              style="height: 3.5rem; width: 3.5rem"
            >
              <i class="pi pi-fw pi-table !text-2xl"></i>
            </span>
            <span class="ml-6 flex flex-col">
              <span
                class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0 block"
                >Frequently Asked Questions</span
              >
              <span class="text-surface-600 dark:text-surface-200 lg:text-xl"
                >Ultricies mi quis hendrerit dolor.</span
              >
            </span>
          </router-link>
          <router-link
            to="/"
            class="w-full flex items-center py-8 border-surface-300 dark:border-surface-500 border-b"
          >
            <span
              class="flex justify-center items-center border-2 border-primary text-primary rounded-border"
              style="height: 3.5rem; width: 3.5rem"
            >
              <i class="pi pi-fw pi-question-circle !text-2xl"></i>
            </span>
            <span class="ml-6 flex flex-col">
              <span
                class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0"
                >Solution Center</span
              >
              <span class="text-surface-600 dark:text-surface-200 lg:text-xl"
                >Phasellus faucibus scelerisque eleifend.</span
              >
            </span>
          </router-link>
          <router-link
            to="/"
            class="w-full flex items-center mb-8 py-8 border-surface-300 dark:border-surface-500 border-b"
          >
            <span
              class="flex justify-center items-center border-2 border-primary text-primary rounded-border"
              style="height: 3.5rem; width: 3.5rem"
            >
              <i class="pi pi-fw pi-unlock !text-2xl"></i>
            </span>
            <span class="ml-6 flex flex-col">
              <span
                class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0"
                >Permission Manager</span
              >
              <span class="text-surface-600 dark:text-surface-200 lg:text-xl"
                >Accumsan in nisl nisi scelerisque</span
              >
            </span>
          </router-link>
          <Button
            as="router-link"
            label="Перейти к винной карте"
            :to="RoutePath.Main"
          />
        </div>
      </div>
    </div>
  </div>
</template>
