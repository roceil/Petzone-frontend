<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="MemberCenterDetail">
    <div class="container my-10">
      <h2 class="text-xl md:text-5xl font-bold text-font">{{ title }}</h2>
      <slot></slot>
    </div>
  </div>
</template>
