<script setup>
import { ref } from 'vue'
import close from '@/assets/header/close-btn.svg'
import { useModalStore } from '@/stores/modal'

const dialogRef = ref()
const showModal = () => {
  dialogRef.value.showModal()
}
const hideModal = () => {
  dialogRef.value.close()
}
defineExpose({ showModal })

const modalStore = useModalStore()

const directToLogin = () => {
  hideModal()
  modalStore.openModal('login')
}
</script>
<template>
  <dialog ref="dialogRef" class="modal">
    <div class="modal-box relative flex flex-col items-center px-[75px]">
      <!-- 關閉按鈕 -->
      <div class="absolute right-[29px] top-[33px]">
        <button @click="hideModal"><img :src="close" alt="close-btn" /></button>
      </div>

      <!-- 標題 -->
      <h3 class="font-bold text-5xl text-font text-center mt-[46px]">目前以訪客身分購物</h3>

      <!-- 文字說明 -->
      <p class="mt-[25px] text-font leading-[48px] font-bold">登入即可使用點數消費！</p>

      <!-- 按鈕 -->
      <div class="w-full flex justify-center space-x-[23px] px-[35px] mt-[46px]">
        <button
          class="btn bg-[#EEF1F4] text-font rounded text-base border-none hover:opacity-80 hover:bg-[#EEF1F4] font-normal"
          @click="hideModal"
        >
          取消
        </button>

        <button
          @click="directToLogin"
          class="btn bg-secondary hover:bg-font text-white rounded text-base font-normal"
        >
          登入
        </button>
      </div>
    </div>
  </dialog>
</template>
<style scoped></style>
