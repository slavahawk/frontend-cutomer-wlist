<script setup lang="ts">
import CardWine from "@/components/Wine/CardWine.vue";
import {useWineStore} from "@/stores/useWineStore.ts";
import {storeToRefs} from "pinia";

const {getWines} = useWineStore()
const {wines, isLoad} = storeToRefs(useWineStore())

</script>

<template>
  <Button class="mb-4" :loading="isLoad" label="Получить вина" @click="getWines"/>
  <div v-if="wines.length" class="flex justify-space-between flex-wrap gap-2" >
    <CardWine v-for="wine in wines" :key="wine.id" :wine="wine" />
  </div>
</template>
