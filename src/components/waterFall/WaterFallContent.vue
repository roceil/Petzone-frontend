<template>
  <section class="container flex justify-center mt-8 md:mt-[122px] relative">
    <!-- 背景裝飾 -->
    <img :src="water_green" alt="裝飾ICON" class="absolute -right-11 top-0 -z-10" />
    <img :src="water_yellow" alt="裝飾ICON" class="absolute -left-20 bottom-[-241px] -z-10" />

    <!-- 主要內容 -->
    <div v-if="waterFallData.length > 0" class="hidden md:block">
      <masonry-wall :items="waterFallData" :column-width="320" :gap="16" :max-columns="3">
        <template #default="{ item }">
          <RouterLink :to="`community/${item._id}`">
            <div class="rounded-[10px] overflow-hidden relative">
              <div
                class="hover:opacity-100 opacity-0 absolute bottom-0 left-0 w-full h-full backdrop-blur-sm bg-white/30 rounded-[10px] flex justify-center items-center font-semibold hover:text-4xl text-black duration-300 ease-in-out"
              >
                <p class="group-hover:block">瞧瞧貼文</p>
              </div>
              <img :src="item.photos[0]" :alt="item.content" class="w-full h-full" />
            </div>
          </RouterLink>
        </template>
      </masonry-wall>
    </div>

    <div v-if="waterFallData.length > 0" class="block md:hidden">
      <masonry-wall :items="waterFallData" :column-width="160" :gap="12" :max-columns="3">
        <template #default="{ item }">
          <RouterLink :to="`community/${item._id}`">
            <div class="rounded-[10px] overflow-hidden relative">
              <div
                class="hover:opacity-100 opacity-0 absolute bottom-0 left-0 w-full h-full backdrop-blur-sm bg-white/30 rounded-[10px] flex justify-center items-center font-semibold hover:text-4xl text-black duration-300 ease-in-out"
              >
                <p class="group-hover:block">瞧瞧貼文</p>
              </div>
              <img :src="item.photos[0]" :alt="item.content" class="w-full h-full" />
            </div>
          </RouterLink>
        </template>
      </masonry-wall>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { get_random_posts_api } from '@/api/community'
import water_green from '@/assets/home/water_green.svg'
import water_yellow from '@/assets/home/water_yellow.svg'

// 瀑布流數據
const waterFallData = ref([])

// 獲取瀑布流數據
const getWaterFallData = async () => {
  const { data } = await get_random_posts_api()
  return data
}

onMounted(async () => {
  const data = await getWaterFallData()
  waterFallData.value = [...waterFallData.value, ...data]
})
</script>
