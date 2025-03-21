<template>
  <div class="tabs">
    <div class="tab-list">
      <div
        v-for="(tab, index) in tabs"
        :key="tab"
        class="tab"
        :class="{ active: isActive(index) }"
        @click="setActiveTab(index)"
      >
        {{ tab }}
      </div>
    </div>
    <div class="tab-content">
      <slot :activeTab="activeTab"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
});

const activeTab = ref(0);

const setActiveTab = (index) => {
  activeTab.value = index;
};

const isActive = (index) => {
  return index === activeTab.value;
};
</script>

<style scoped>
.tabs {
  border-bottom: 1px solid #ccc;
}

.tab-list {
  display: flex;
  cursor: pointer;
}

.tab {
  padding: 10px 20px;
  margin-right: 10px;
}

.tab.active {
  font-weight: bold;
  border-bottom: 2px solid var(--primary-color);
}

.tab-content {
  padding: 20px;
}
</style>
