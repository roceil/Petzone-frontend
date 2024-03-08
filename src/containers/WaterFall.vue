<script setup>
import { defineAsyncComponent } from 'vue'
const WaterFallContent = defineAsyncComponent(() => import('../components/waterFall/WaterFallContent.vue'))
</script>

<template>
  <Suspense>
    <template #default>
      <WaterFallContent />
    </template>
    <template #fallback>
      <div>正在加載數據...</div>
    </template>
  </Suspense>
</template>
