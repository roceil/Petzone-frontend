<script setup>
import { ref, computed } from 'vue'

const fakeUserData = {
  account: 'abc@gmail.com',
  name: '拉拉熊',
  nickName: '拉拉熊',
  phone: '0912345678',
  address: '台北市信義區信義路五段7號',
  permission: '管理員',
  intro: '我是拉拉熊，我是管理員hahahahahahahah'
}

const tableLabel = [
  '用戶帳號',
  '用戶姓名',
  '用戶暱稱',
  '用戶電話',
  '用戶地址',
  '用戶權限',
  '自我介紹'
]

const labelToKey = {
  用戶帳號: 'account',
  用戶姓名: 'name',
  用戶暱稱: 'nickName',
  用戶電話: 'phone',
  用戶地址: 'address',
  用戶權限: 'permission',
  自我介紹: 'intro'
}

const renderData = computed(() => {
  return tableLabel.map((label) => ({ label, value: fakeUserData[labelToKey[label]] }))
})

// 將fakeUserData.permission映射到select選項的value
const permissionOptions = {
  管理員: '0',
  一般使用者: '1'
}

const isEnabled = ref(permissionOptions[fakeUserData.permission])
</script>

<template>
  <div class="ml-10 mt-10 flex justify-center col-span-10 text-font">
    <div class="w-[800px] lg:w-[900px]">
      <div class="flex justify-between">
        <h1 class="text-5xl font-bold">用戶詳情</h1>
      </div>

      <div class="flex space-x-[81px] mt-[58px]">
        <ul class="flex flex-col ml-[46px] space-y-5">
          <li v-for="(item, index) in renderData" :key="index">
            <template v-if="item.label === '用戶權限'">
              <div class="flex space-x-[50px]">
                <p>{{ item.label }}</p>
                <select
                  id="isEnabled"
                  class="max-w-[150px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
                  v-model="isEnabled"
                >
                  <option value="-1" disabled>請選擇權限</option>
                  <option value="0">管理者</option>
                  <option value="1">一般使用者</option>
                </select>
              </div>
            </template>
            <template v-else>
              <div class="flex space-x-[50px]">
                <p>{{ item.label }}</p>
                <p class="w-[211px] break-words">{{ item.value }}</p>
              </div>
            </template>
          </li>
        </ul>

        <div class="flex flex-col items-center">
          <div class="w-[150px] h-[150px] rounded-full bg-red-300"></div>

          <p class="mt-10">可用積分：{{ 50 }} 點</p>

          <RouterLink
            to="/admin/pointshistory/123"
            class="btn bg-third text-font border-none hover:bg-font hover:text-white px-[15px] py-[9px] mt-[23px]"
          >
            查看積分詳情
          </RouterLink>

          <div class="w-full flex justify-center space-x-4 md:justify-between mt-[93px]">
            <button
              class="btn bg-third text-font font-semibold rounded px-5 text-base w-1/2 md:w-[125px] border-none hover:opacity-80 hover:bg-third"
            >
              取消
            </button>

            <button
              class="btn bg-secondary hover:bg-font text-white font-semibold rounded px-5 text-base w-1/2 md:w-[125px]"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
