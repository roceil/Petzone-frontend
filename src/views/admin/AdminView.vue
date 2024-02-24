<script setup>
import Sidebar from '@/components/Sidebar.vue'
</script>
<template>
  <div class="grid grid-cols-12">
    <Sidebar></Sidebar>
    <RouterView></RouterView>
  </div>
</template>
<style scoped></style>
