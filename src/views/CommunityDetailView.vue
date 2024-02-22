<script setup>
import { ref } from 'vue'
import EditPostModal from '@/components/EditPostModal.vue'

const editPostModalRef = ref()
</script>
<template>
  <div class="CommunityDetail text-font">
    <section class="container flex flex-col justify-center my-10 max-w-[800px] space-y-4">
      <div class="p-10">
        <div class="flex items-center mb-4 space-x-4">
          <div class="h-[80px] w-[80px] bg-third rounded-full"></div>
          <span>拉拉熊</span>
          <span>於 2024/01/01 分享</span>
        </div>
        <div class="mb-4 space-x-2 text-end">
          <button class="link" @click="editPostModalRef.showModal">編輯</button>
          <button class="link">刪除</button>
        </div>
        <div class="rounded-[10px] aspect-square bg-third group overflow-hidden">
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
            alt=""
          />
        </div>
      </div>
      <div>
        與柴犬共度的日常，一場充滿歡笑和愛的冒險
        <br />
        每天早晨，當陽光照亮我的房間，我就知道一場快樂的柴犬冒險即將開始。
        <br />
        我的柴犬夥伴，一隻活潑好動的柴犬小橘，總是在床邊等著我的起床。
        <br />
        它的尾巴像一支旗幟一樣搖擺，表達著對新一天的期待。
      </div>
      <div class="flex items-center justify-between pb-4 border-b">
        <div class="flex items-center space-x-4">
          <button class="flex space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <span>1,000個喜愛</span>
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
          </button>
        </div>
        <div class="flex space-x-2">
          <div class="px-4 py-2 border rounded-full" v-for="(item, index) in 2" :key="index">
            柴犬
          </div>
        </div>
      </div>
      <div class="py-4 space-y-8">
        <div class="flex items-center space-x-4" v-for="(item, index) in 2" :key="index">
          <div class="w-[36px] h-[36px] rounded-full bg-third"></div>
          <span>小新</span>
          <p>你家的小柴好可愛！</p>
        </div>
        <div class="space-y-4">
          <textarea
            class="rounded-[10px] border w-full p-4"
            rows="5"
            placeholder="請輸入留言"
          ></textarea>
          <div class="text-end">
            <button class="px-8 btn btn-primary">留言</button>
          </div>
        </div>
      </div>
    </section>
    <EditPostModal ref="editPostModalRef" :type="'edit'" />
  </div>
</template>
<style></style>
