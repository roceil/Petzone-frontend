<script setup>
import { CurrencyDollarIcon } from '@heroicons/vue/20/solid'

import donate_explain from '@/assets/donate_explain.png'

const features = [
  {
    name: '捐贈方式：',
    description:
      '登入後，可以在會員中心的頭貼下方輸入要捐贈的點數，點數捐贈的越多，就越有可能出現在首頁的捐贈名單唷！',
    icon: CurrencyDollarIcon
  },
  {
    name: '點數獲得：',
    description:
      '點數可以透過購買平台商品、撰寫貼文...等方式獲得。(貼心提醒：除了捐贈點數外，也可以在購物時使用點數折抵唷!)',
    icon: CurrencyDollarIcon
  }
]
</script>

<template>
  <div class="overflow-hidden bg-white py-24 sm:py-32 container">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div
        class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2"
      >
        <div class="lg:pr-8 lg:pt-4">
          <div class="lg:max-w-lg">
            <h2 class="text-base font-semibold leading-7 text-indigo-600">PetZone</h2>
            <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              點數捐贈說明
            </p>
            <p class="mt-6 text-lg leading-8 text-gray-600">
              捐贈積分給可愛的毛寶寶們，捐贈的積分將提供給流浪的毛小孩們添購必要的食物、醫療照護。
            </p>
            <dl class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
              <div v-for="feature in features" :key="feature.name" class="relative pl-9">
                <dt class="inline font-semibold text-gray-900">
                  <component
                    :is="feature.icon"
                    class="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                    aria-hidden="true"
                  />
                  {{ feature.name }}
                </dt>
                {{ ' ' }}
                <dd class="inline">{{ feature.description }}</dd>
              </div>
            </dl>
          </div>
        </div>
        <img
          :src="donate_explain"
          alt="Product screenshot"
          class="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[53rem] md:-ml-4 lg:-ml-0"
          width="2432"
          height="1442"
        />
      </div>
    </div>
  </div>
</template>
