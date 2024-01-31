<script setup></script>
<template>
  <div class="Community text-font">
    <section class="container my-10">
      <div class="flex justify-between">
        <h1 class="text-5xl font-bold">貼文專區</h1>
        <button class="btn btn-primary text-white px-10">新增貼文</button>
      </div>
    </section>
    <section class="container mb-10">
      <div class="grid grid-cols-12 gap-10">
        <div class="col-span-8">
          <div class="grid grid-cols-3 gap-10">
            <button
              class="aspect-square rounded-lg overflow-hidden relative"
              v-for="item in 9"
              :key="item"
            >
              <div class="group w-full h-full">
                <div class="w-full h-full bg-secondary hover:blur-sm transition">
                  <img
                    src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
                    alt=""
                  />
                </div>
                <div
                  class="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 text-white transition"
                >
                  <span class="me-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 inline"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                    10
                  </span>

                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 inline"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                      />
                    </svg>
                    1
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div class="col-span-4">
          <div class="relative">
            <input
              class="border border-font p-4 rounded-md focus:outline-none w-full"
              type="text"
              placeholder="請輸入貼文作者"
            />
            <button class="absolute inset-y-0 right-2 flex items-center pr-2">
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
          <h5 class="text-xl font-bold mt-10">Recommended topics</h5>
          <div class="flex flex-wrap mt-10">
            <button class="px-8 py-4 me-6 mb-4 border rounded-full">柴犬</button>
            <button class="px-8 py-4 me-6 mb-4 border rounded-full">志工經驗分享</button>
            <button class="px-8 py-4 me-6 mb-4 border rounded-full">寵物健康</button>
            <button class="px-8 py-4 me-6 mb-4 border rounded-full">寵物手作</button>
            <button class="px-8 py-4 me-6 mb-4 border rounded-full">俄羅斯藍貓</button>
            <button class="px-8 py-4 me-6 mb-4 border rounded-full">戶外活動</button>
            <button class="px-8 py-4 me-6 mb-4 border rounded-full">寵物心理學</button>
            <button class="px-8 py-4 me-6 mb-4 border rounded-full">寵物保健知識</button>
          </div>
          <button class="mt-4 ms-4">see more...</button>
        </div>
      </div>
    </section>
  </div>
</template>
<style></style>
