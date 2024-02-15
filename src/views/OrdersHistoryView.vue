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

const table_title = ['訂單編號', '下單日期', '購買項目', '訂單金額']
</script>

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
          <ul
            class="w-full h-[60px] bg-third mt-5 rounded-[10px] flex text-font text-xl items-center space-x-[138px] px-7"
          >
            <li v-for="title in table_title" :key="title">{{ title }}</li>
          </ul>

          <!-- 表格內容 -->
          <ul
            class="w-full h-[395px] rounded-[10px] px-7 py-6 border border-input_font custom-shadow overflow-y-scroll"
          >
            <li
              class="flex items-center py-[26px] text-font text-xl"
              v-for="(item, index) in 10"
              :key="index"
            >
              <!-- 訂單編號 -->
              <div class="mr-[118px]">
                <p>#123456</p>
              </div>

              <!-- 下單日期 -->
              <div class="mr-[120px]">
                <p>2024/01/01</p>
              </div>

              <!-- 購買項目 -->
              <div class="mr-[125px]">
                <div class="w-[100px] h-[100px] bg-slate-300 rounded-[10px]"></div>
              </div>

              <!-- 訂單金額 -->
              <div class="mr-[116px]">
                <p>NT$ 1000</p>
              </div>

              <!-- 按鈕 -->
              <div class="">
                <button
                  class="btn bg-secondary hover:bg-font border-none text-white font-semibold px-[30px] py-[9px] text-base"
                >
                  訂單詳情
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </MemberCenterDetail>
  </div>
</template>
