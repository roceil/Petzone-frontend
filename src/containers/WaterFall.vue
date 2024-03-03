<script setup>
import water_green from '@/assets/home/water_green.svg'
import water_yellow from '@/assets/home/water_yellow.svg'
defineProps({
  blocks: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section class="container flex justify-center mt-[122px] relative">
    <!-- 背景裝飾 -->
    <img :src="water_green" alt="裝飾ICON" class="absolute -right-11 top-0 -z-10" />
    <img :src="water_yellow" alt="裝飾ICON" class="absolute -left-20 bottom-[-241px] -z-10" />

    <!-- 主要內容 -->
    <masonry-wall :items="blocks" :column-width="320" :gap="16" class="w-[996px]">
      <template #default="{ item }">
        <div
          :style="{ height: `${item.height}px` }"
          :class="item.color"
          class="flex flex-col justify-center items-center rounded-[10px]"
        >
          <p class="text-white font-bold text-5xl">{{ item.content }}</p>
          <p>Height：{{ item.height }}</p>
        </div>
      </template>
    </masonry-wall>
  </section>
</template>
