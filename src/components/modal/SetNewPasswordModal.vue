<script setup>
import close from '@/assets/header/close-btn.svg'
import { useModalStore } from '@/stores/modal'

const modalStore = useModalStore()
</script>

<template>
  <div class="modal-box relative flex flex-col items-center px-[75px]">
    <!-- 關閉按鈕 -->
    <div class="absolute right-[29px] top-[33px]">
      <button @click="modalStore.handleCloseModal"><img :src="close" alt="close-btn" /></button>
    </div>

    <!-- 標題 -->
    <h3 class="font-bold text-5xl text-font text-center mt-[46px]">重設密碼</h3>

    <!-- 表單內容 -->
    <form class="mt-10 text-font w-full space-y-[14px]">
      <label class="flex flex-col space-y-5">
        <p class="font-semibold">請輸入新密碼</p>
        <input type="text" placeholder="請輸入密碼" class="border border-font rounded p-3 w-full" />
      </label>

      <label class="flex flex-col space-y-5">
        <p class="font-semibold">請再次輸入新密碼</p>
        <input
          type="text"
          placeholder="請再次輸入密碼"
          class="border border-font rounded p-3 w-full"
        />
      </label>
    </form>

    <!-- 按鈕 -->
    <div class="w-full flex justify-center space-x-[23px] px-[35px] mt-[46px]">
      <button
        @click="modalStore.handleCloseModal"
        class="btn bg-[#EEF1F4] text-font rounded text-base border-none hover:opacity-80 hover:bg-[#EEF1F4] font-normal"
      >
        取消
      </button>

      <button class="btn bg-secondary hover:bg-font text-white rounded text-base font-normal">
        確認
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
