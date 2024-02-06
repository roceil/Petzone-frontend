<script setup>
import { computed, ref } from 'vue'
import MemberCenterDetail from '@/containers/layouts/MemberCenterDetail.vue'

const order_history_status_buttons = ['未付款', '已付款', '已取消']

const button_status = ref('未付款')

const button_border_position = computed(() => {
  if (button_status.value === '未付款') {
    return 'translate-x-[99px]'
  } else if (button_status.value === '已付款') {
    return 'translate-x-[466px]'
  } else if (button_status.value === '已取消') {
    return 'translate-x-[832px]'
  }

  return 'translate-x-[99px]'
})

const change_button_status = (status) => {
  button_status.value = status
}
</script>
ㄋ

<template>
  <div class="OrderHistoryView">
    <MemberCenterDetail title="購買訂單">
      <div class="flex justify-center items-center mt-6">
        <div class="w-[1068px]">
          <!-- 按鈕 -->
          <ul class="flex justify-between px-[100px] border-b border-font relative">
            <li v-for="status in order_history_status_buttons" :key="status">
              <button
                class="text-2xl text-font font-bold w-[135px]"
                @click="change_button_status(status)"
              >
                {{ status }}
              </button>
            </li>

            <li
              class="absolute w-[137px] h-2 bg-font -bottom-2 left-0 transition-transform duration-500 ease-in-out"
              :class="button_border_position"
            ></li>
          </ul>

          <!-- 表格標題 -->
          <div class="w-full h-[60px] bg-third mt-5 rounded-[10px]"></div>

          <!-- 表格內容 -->
          <div class="w-full h-[395px] bg-slate-300 rounded-[10px]"></div>
        </div>
      </div>
    </MemberCenterDetail>
  </div>
</template>
