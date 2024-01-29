<script setup>
import waterBgGray from '../assets/waterFall/waterFall_gray.svg'
import waterBgYellow from '../assets/waterFall/waterFall_yellow.svg'
defineProps({
  blocks: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section class="container flex justify-center mt-[58.5px] relative">
    <div class="absolute top-[-191px] right-0 w-[400px] h-[670px] -z-10">
      <img :src="waterBgGray" alt="" class="w-full h-full" />
    </div>

    <div
      class="absolute top-0 left-[-195px] w-[381px] h-[892px] -z-10 flex justify-center items-center"
    >
      <img :src="waterBgYellow" alt="" class="w-full h-full" />
    </div>
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
