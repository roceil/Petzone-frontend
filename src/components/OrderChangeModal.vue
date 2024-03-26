<script setup>
import { ref, defineProps } from 'vue'
import close from '@/assets/header/close-btn.svg'
import { update_order_status_api } from '@/api/ecommerceAdmin'
import { useAlertStore } from '@/stores/alert'

const alertStore = useAlertStore()
const dialogRef = ref()
const props = defineProps(['orderId', 'order'])
const emits = defineEmits(['getOrder'])
const orderStatus = ref(0)

const showModal = (status) => {
  orderStatus.value = parseInt(status)
  dialogRef.value.showModal()
}
const hideModal = () => {
  emits('getOrder')
  dialogRef.value.close()
}

const updateStatus = async () => {
  const { data } = await update_order_status_api(props.orderId, orderStatus.value)
  const message = data.message
  if (message === '更新訂單成功') {
    alertStore.openAlert('success', message)
  } else if (message !== '') {
    alertStore.openAlert('error', message)
  }
  hideModal()
}

defineExpose({ showModal })
</script>

<template>
  <dialog ref="dialogRef" class="modal">
    <div class="modal-box relative flex flex-col items-center px-[75px]">
      <!-- 關閉按鈕 -->
      <div class="absolute right-[29px] top-[33px]">
        <button @click="hideModal"><img :src="close" alt="close-btn" /></button>
      </div>

      <!-- 標題 -->
      <h3 class="font-bold text-4xl text-font text-center mt-[46px]">確認是否訂單狀態</h3>

      <!-- 文字說明 -->
      <p class="mt-[25px] text-font font-bold">
        訂單狀態若更改為 <span class="text-red-500">「已完成」</span>將發放會員積分
      </p>
      <p class="mt-[25px] text-font font-bold">
        已發放之會員積分<span class="text-red-500">無法收回!</span>
      </p>

      <!-- 按鈕 -->
      <div class="w-full flex justify-center space-x-[23px] px-[35px] mt-[46px]">
        <button
          class="btn bg-[#EEF1F4] text-font rounded text-base border-none hover:opacity-80 hover:bg-[#EEF1F4] font-normal"
          @click="hideModal"
        >
          取消
        </button>

        <button
          @click.prevent="updateStatus"
          class="btn bg-secondary hover:bg-font text-white rounded text-base font-normal"
        >
          確認
        </button>
      </div>
    </div>
  </dialog>
</template>
