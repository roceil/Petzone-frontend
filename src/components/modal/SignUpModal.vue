<script setup>
import close from '@/assets/header/close-btn.svg'
import { useModalStore } from '@/stores/modal'

const modalStore = useModalStore()
</script>


<template>
  <div class="modal-box relative flex flex-col items-center px-[57px]">
    <!-- 關閉按鈕 -->
    <div class="absolute right-[29px] top-[33px]">
      <button @click="modalStore.handleCloseModal"><img :src="close" alt="close-btn" /></button>
    </div>

    <!-- 標題 -->
    <h3 class="font-bold text-5xl text-font text-center mt-[46px]">註冊會員</h3>

    <!-- 表單內容 -->
    <div class="w-[392px] h-[388px] bg-slate-300 mt-[25px]"></div>

    <!-- 註冊按鈕 -->
    <div class="w-full flex justify-end">
      <button
        class="btn bg-secondary hover:bg-font text-white font-semibold rounded px-5 text-base mt-[30px] w-[125px]"
      >
        註冊
      </button>
    </div>
  </div>
</template>

