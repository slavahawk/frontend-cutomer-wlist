<template>
  <div>
    <div
      @click="toggle"
      class="accordion-header"
      :class="{ active: isOpen }"
      v-if="false"
    >
      <slot name="header"></slot>
      <Button
        :icon="isOpen ? 'pi pi-arrow-circle-down' : 'pi pi-arrow-circle-up'"
        variant="text"
      />
    </div>
    <div v-if="false">
      <div v-if="isOpen" class="accordion-content" :class="{ active: isOpen }">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped lang="scss">
.accordion-header {
  cursor: pointer;
  padding: 10px;
  background-color: var(--surface-card);
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

//.accordion-header.active {
//  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
//}

.accordion-content {
  //padding: 10px;
  background: #fff;
  //&.active {
  //  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  //}
}
</style>
