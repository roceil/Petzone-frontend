<script setup>
import { FireIcon, SparklesIcon } from '@heroicons/vue/20/solid'
import { useModalStore } from '@/stores/modal'
import post_feature from '@/assets/home/post_feature.png'

const modalStore = useModalStore()

const features = [
  {
    name: '功能 1：',
    description: '現在您可以在貼文區建立貼文，與其他飼主分享您與寵物的美好生活。',
    icon: FireIcon
  },
  {
    name: '功能 2：',
    description: '建立貼文後，可以獲得貼文積分，積分可以用來折抵訂單或者捐贈給流浪動物。',
    icon: FireIcon
  },
  {
    name: '功能 3：',
    description:
      '愛心數較高的貼文，有機會曝光在下方的精選飼主貼文中，趕快幫親愛的寵物們拍照發布貼文吧！',
    icon: FireIcon
  }
]
</script>

<template>
  <div class="mt-8 md:mt-[200px] bg-secondary">
    <div class="mx-auto container">
      <div
        class="relative isolate flex flex-col gap-10 overflow-hidden px-6 py-8 sm:px-24 xl:flex-row xl:items-center"
      >
        <div class="w-full text-white">
          <h2
            class="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl xl:max-w-none xl:flex-auto"
          >
            PetZone 全新功能
          </h2>

          <dl class="text-white mt-10 max-w-xl space-y-8 text-base leading-7 lg:max-w-none">
            <div v-for="feature in features" :key="feature.name" class="relative pl-9">
              <dt class="inline font-semibold">
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

          <p class="mt-4 text-sm leading-6 text-white text-center md:text-start">
            還等什麼？
            <button
              type="button"
              @click="modalStore.openModal('login')"
              class="underline lg:hover:text-third"
            >
              立即登入
            </button>
            分享生活點滴！
          </p>
        </div>

        <div class="relative">
          <img :src="post_feature" alt="post_feature" />
        </div>
      </div>
    </div>
  </div>
</template>
