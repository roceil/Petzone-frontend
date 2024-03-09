<script setup>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
// import left_btn from '@/assets/pagination/left.svg'
// import right_btn from '@/assets/pagination/right.svg'
import decoration from '@/assets/points_history/decoration.svg'
import { get_member_data_api } from '@/api/user'
import { useAlertStore } from '@/stores/alert'

const points_history_table_title = [
  '序號',
  '異動日期',
  '異動原因',
  '異動前點數',
  '異動點數',
  '異動後點數'
]

const alertStore = useAlertStore()

// 使用者的積分詳情
const userPointsHistory = ref([])

// 取得使用者資料
const getMemberData = async () => {
  try {
    const { pointsRecord } = await get_member_data_api()
    userPointsHistory.value = pointsRecord.reverse()
  } catch (error) {
    console.error(error)
    alertStore.openAlert('error', '取得使用者積分紀錄失敗')
  }
}

// 格式化日期的方法
const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD')
}

onMounted(() => {
  getMemberData()
})
</script>

<template>
  <div class="PointsHistory">
    <div class="flex justify-center items-center mt-[31px]">
      <div class="w-[660px]">
        <p class="text-font">只顯示最近一個月內的積分異動資料</p>

        <!-- 表格標題 -->
        <ul class="bg-third w-full h-[60px] mt-[5px] rounded-[10px] flex items-center text-font">
          <li v-for="title in points_history_table_title" :key="title" class="text-center">
            <template v-if="title === '序號'">
              <p class="w-[60px]">{{ title }}</p>
            </template>

            <template v-else>
              <p class="w-[120px]">{{ title }}</p>
            </template>
          </li>
        </ul>

        <!-- 表格內容 -->
        <ul
          class="w-full h-[500px] rounded-[10px] custom-shadow border border-input_font relative overflow-y-scroll"
        >
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

          <!-- 裝飾 -->
          <img
            class="absolute top-[150px] left-[-54px] -translate-x-full -z-10 xl:left-[-50%]"
            :src="decoration"
            alt="decoration"
          />
        </ul>

        <!-- 分頁按鈕 -->
        <!-- <div class="w-full mt-[15px] flex justify-center items-center">
          <ul class="w-[269px] h-6 flex justify-between items-center text-center space-x-[10px]">
            <li class="hover:opacity-80 flex items-center">
              <button>
                <img :src="left_btn" alt="left_btn" />
              </button>
            </li>

            <li
              v-for="page in fake_total_page"
              :key="page"
              class="text-font font-medium hover:opacity-80 h-full"
            >
              <button class="border-b-2 border-font">
                <p class="h-full">{{ page }}</p>
              </button>
            </li>

            <li class="hover:opacity-80 flex items-center">
              <button>
                <img :src="right_btn" alt="right_btn" />
              </button>
            </li>
          </ul>
        </div> -->
      </div>
    </div>
  </div>
</template>
