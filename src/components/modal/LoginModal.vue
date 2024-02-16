<script setup>
import close from '@/assets/header/close-btn.svg'
import google_icon from '@/assets/modal/google_icon.svg'
import { useModalStore } from '@/stores/modal'

const modalStore = useModalStore()

defineProps({
  login: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div class="modal-box relative flex flex-col items-center px-20">
    <!-- 關閉按鈕 -->
    <div class="absolute right-[29px] top-[33px]">
      <button @click="modalStore.handleCloseModal"><img :src="close" alt="close-btn" /></button>
    </div>

    <!-- 標題 -->
    <h3 class="font-bold text-5xl text-font text-center mt-[46px]">登入會員</h3>

    <!-- 表單內容 -->
    <div class="w-[345px] h-[204px] bg-slate-300 mt-[25px]"></div>

    <!-- 忘記密碼 -->
    <div class="w-full flex justify-end mt-4 hover:opacity-80">
      <button @click="modalStore.openModal('reset_password')" class="underline text-font">
        忘記密碼
      </button>
    </div>

    <!-- 註冊按鈕 -->
    <div class="w-full flex justify-between px-[35px] mt-[29px]">
      <button
        @click="modalStore.openModal('sign_up')"
        class="btn bg-third text-font font-semibold rounded px-5 text-base w-[125px] border-none hover:opacity-80 hover:bg-third"
      >
        註冊
      </button>

      <button
        @click="login"
        class="btn bg-secondary hover:bg-font text-white font-semibold rounded px-5 text-base w-[125px]"
      >
        登入
      </button>
    </div>

    <!-- 分隔線 -->
    <div class="w-full h-[1px] bg-font mt-[30px]"></div>

    <!-- 第三方登入 -->
    <div class="w-full flex justify-center mt-[37px]">
      <button
        class="bg-[#EEF1F4] p-[10px] rounded flex items-center space-x-5 text-[#545F71] w-[250px]"
      >
        <img :src="google_icon" alt="google_icon" />
        <p>使用GOOGLE登入</p>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
