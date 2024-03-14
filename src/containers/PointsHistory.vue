<script setup>
import dayjs from 'dayjs'

defineProps({
  userPointsHistory: {
    type: Array,
    required: true
  }
})

const points_history_table_title = [
  '序號',
  '異動日期',
  '異動原因',
  '異動前點數',
  '異動點數',
  '異動後點數'
]

// 格式化日期
const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD')
}
</script>

<template>
  <div class="PointsHistory mb-20 md:mb-0">
    <div class="flex justify-center items-center mt-[31px]">
      <div class="w-[660px]">
        <p class="text-font text-xs md:text-base">只顯示最近一個月內的積分異動資料</p>

        <!-- 表格標題：電腦版 -->
        <ul
          class="bg-third w-full h-[60px] mt-[5px] rounded-[10px] items-center text-font hidden md:flex"
        >
          <li v-for="title in points_history_table_title" :key="title" class="text-center">
            <template v-if="title === '序號'">
              <p class="w-[60px]">{{ title }}</p>
            </template>

            <template v-else>
              <p class="w-[120px]">{{ title }}</p>
            </template>
          </li>
        </ul>

        <!-- 表格內容：電腦版 -->
        <ul
          class="w-full h-[500px] rounded-[10px] custom-shadow border border-input_font relative overflow-y-scroll hidden md:block"
        >
          <template v-if="userPointsHistory.length > 0">
            <li
              class="flex py-4 text-center text-font"
              v-for="(item, index) in userPointsHistory"
              :key="item.id"
            >
              <!-- 序號 -->
              <div class="w-[60px]">
                <p>{{ index + 1 }}</p>
              </div>

              <!-- 異動日期 -->
              <div class="w-[120px]">
                <p>{{ formatDate(item.createAt) }}</p>
              </div>

              <!-- 異動原因 -->
              <div class="w-[120px]">
                <p>{{ item.reason }}</p>
              </div>

              <!-- 異動前點數 -->
              <div class="w-[120px] text-right pr-4">
                <p>{{ item.beforePoints }}</p>
              </div>

              <!-- 異動點數 -->
              <div class="w-[120px] text-right pr-4">
                <p>{{ item.changePoints }}</p>
              </div>

              <!-- 異動後點數 -->
              <div class="w-[120px] text-right pr-4">
                <p>{{ item.afterPoints }}</p>
              </div>
            </li>
          </template>

          <template v-else>
            <div class="flex justify-center items-center h-full text-font text-4xl font-semibold">
              尚無積分使用記錄
            </div>
          </template>
        </ul>

        <!-- 表格內容：手機版 -->
        <ul class="md:hidden mt-6 space-y-6">
          <template v-if="userPointsHistory.length > 0">
            <li
              v-for="(item, index) in userPointsHistory"
              :key="item.id"
              class="w-full rounded-[10px] border border-font text-font text-xs"
            >
              <!-- 第一欄 -->
              <div class="flex py-[15px] px-2">
                <div class="flex w-1/2">
                  <p class="w-1/2">序號</p>
                  <p class="w1/2">{{ index + 1 }}</p>
                </div>

                <div class="flex w-1/2">
                  <p class="w-1/2">異動前點數</p>
                  <p class="w-1/2">{{ item.beforePoints }}</p>
                </div>
              </div>

              <!-- 第二欄 -->
              <div class="flex py-[15px] bg-third px-2">
                <div class="flex w-1/2">
                  <p class="w-1/2">異動日期</p>
                  <p class="w1/2">{{ formatDate(item.createAt) }}</p>
                </div>

                <div class="flex w-1/2">
                  <p class="w-1/2">異動點數</p>
                  <p class="w-1/2">{{ item.changePoints }}</p>
                </div>
              </div>

              <!-- 第三欄 -->
              <div class="flex py-[15px] px-2">
                <div class="flex w-1/2">
                  <p class="w-1/2">異動原因</p>
                  <p class="w1/2">{{ item.reason }}</p>
                </div>

                <div class="flex w-1/2">
                  <p class="w-1/2">異動後點數</p>
                  <p class="w-1/2">{{ item.afterPoints }}</p>
                </div>
              </div>
            </li>
          </template>

          <template v-else>
            <div
              class="flex justify-center items-center h-[136px] text-font text-lg font-semibold rounded-[10px] border border-font"
            >
              尚無積分使用記錄
            </div>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
