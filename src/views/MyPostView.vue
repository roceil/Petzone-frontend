<script setup></script>

<template>
  <div class="MyPostView">
    <div class="container mt-[25px] max-w-[970px] mb-[211px]">
      <!-- 自我介紹區塊 -->
      <div
        class="flex justify-center items-end border-b border-secondary pb-[25px] px-[85px] space-x-[288px]"
      >
        <div class="w-[381px] h-[178px] px-[10px] flex justify-between">
          <div class="">
            <div class="w-[100px] h-[100px] bg-red-400 rounded-full"></div>

            <p class="text-font font-semibold mt-5 text-center">暱稱</p>
          </div>

          <div class="text-font leading-5 w-[211px] flex items-center">
            <p>這是自我介紹這是自我介紹這是自我介紹這是自我介紹這是自我介紹</p>
          </div>
        </div>

        <button
          class="btn bg-secondary hover:bg-font border-none text-white font-semibold px-[30px] py-[9px] text-base"
        >
          新增貼文
        </button>
      </div>

      <!-- 貼文區塊 -->

      <ul class="px-[29px] flex flex-wrap justify-center gap-[50px] mt-[47px]">
        <li v-for="num in 9" :key="num">
          <div class="w-[220px] h-[220px] bg-slate-300 rounded-[10px]"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
