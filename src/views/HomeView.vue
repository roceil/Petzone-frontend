<script setup>
import { AcademicCapIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="HomeView">
    <div class="container ring-1">
      <h1>HomeView</h1>
      <button className="btn btn-secondary text-white font-bold rounded hover:scale-75">
        Daisy 按鈕測試
      </button>

      <div class="flex space-x-4 mt-4">
        <p>daisy Icon 測試</p>
        <AcademicCapIcon class="h-6 w-6 text-secondary" />
      </div>
    </div>
  </div>
</template>
