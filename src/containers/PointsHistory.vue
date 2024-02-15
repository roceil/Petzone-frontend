<script setup>
import left_btn from '@/assets/pagination/left.svg'
import right_btn from '@/assets/pagination/right.svg'
import decoration from '@/assets/points_history/decoration.svg'

const points_history_table_title = [
  '序號',
  '異動日期',
  '異動原因',
  '異動前點數',
  '異動點數',
  '異動後點數'
]

// 5 筆假的積分異動記錄
const fake_points_history = [
  {
    id: 1,
    date: '2024/01/01',
    reason: '訂單紅利',
    before_points: 100,
    points: 50,
    after_points: 150
  },
  {
    id: 2,
    date: '2024/01/01',
    reason: '訂單紅利',
    before_points: 100,
    points: 50,
    after_points: 150
  },
  {
    id: 3,
    date: '2024/01/01',
    reason: '訂單紅利',
    before_points: 100,
    points: 50,
    after_points: 150
  },
  {
    id: 4,
    date: '2024/01/01',
    reason: '訂單紅利',
    before_points: 100,
    points: 50,
    after_points: 150
  },
  {
    id: 5,
    date: '2024/01/01',
    reason: '訂單紅利',
    before_points: 100,
    points: 50,
    after_points: 150
  }
]

// 假的頁數資料
const fake_total_page = 10
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
        <ul class="w-full h-[324px] rounded-[10px] custom-shadow border border-input_font relative">
          <li
            class="flex py-4 text-center text-font"
            v-for="item in fake_points_history"
            :key="item.id"
          >
            <!-- 序號 -->
            <div class="w-[60px]">
              <p>{{ item.id }}</p>
            </div>

            <!-- 異動日期 -->
            <div class="w-[120px]">
              <p>{{ item.date }}</p>
            </div>

            <!-- 異動原因 -->
            <div class="w-[120px]">
              <p>{{ item.reason }}</p>
            </div>

            <!-- 異動前點數 -->
            <div class="w-[120px] text-right pr-4">
              <p>{{ item.before_points }}</p>
            </div>

            <!-- 異動點數 -->
            <div class="w-[120px] text-right pr-4">
              <p>{{ item.points }}</p>
            </div>

            <!-- 異動後點數 -->
            <div class="w-[120px] text-right pr-4">
              <p>{{ item.after_points }}</p>
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
        <div class="w-full mt-[15px] flex justify-center items-center">
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
        </div>
      </div>
    </div>
  </div>
</template>
