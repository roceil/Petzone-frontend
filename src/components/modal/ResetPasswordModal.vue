<script setup>
import close from '@/assets/header/close-btn.svg'
import { useModalStore } from '@/stores/modal'

const modalStore = useModalStore()
</script>

<template>
  <div class="modal-box relative flex flex-col items-center px-[75px]">
    <!-- 關閉按鈕 -->
    <div class="absolute right-[29px] top-[33px]">
      <button type="button" @click="modalStore.handleCloseModal">
        <img :src="close" alt="close-btn" />
      </button>
    </div>

    <!-- 標題 -->
    <h3 class="font-bold text-5xl text-font text-center mt-[46px]">重設密碼</h3>

    <!-- 文字說明 -->
    <p class="mt-[25px] text-font leading-[48px] font-bold">
      請輸入你註冊時的 Email，我們會發送一封信件，點擊信件中的連結以重設密碼。
    </p>

    <!-- 表單內容 -->
    <input type="text" placeholder="abc@gmail.com" class="border border-font rounded p-3 w-full" />

    <!-- 按鈕 -->
    <div class="w-full flex justify-center space-x-[23px] px-[35px] mt-[46px]">
      <button
        type="button"
        @click="modalStore.openModal('login')"
        class="btn bg-[#EEF1F4] text-font rounded text-base border-none hover:opacity-80 hover:bg-[#EEF1F4] font-normal"
      >
        取消
      </button>

      <button
        type="button"
        @click="modalStore.openModal('set_new_password')"
        class="btn bg-secondary hover:bg-font text-white rounded text-base font-normal"
      >
        確認
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
