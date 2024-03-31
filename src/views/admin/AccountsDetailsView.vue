<script setup>
import { ref, computed, onMounted } from 'vue'
import { get_user_api } from '@/api/user'
import { useRoute } from 'vue-router'
import default_avatar from '@/assets/default_avatar.png'

const userData = ref({})

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
  return tableLabel.map((label) => ({ label, value: userData.value[labelToKey[label]] }))
})

const renderPhotoPath = computed(() => {
  if (userData.value.photo) return userData.value.photo
  return default_avatar
})

const isEnabled = computed(() => {
  if (userData.value.permission) return 0
  return 1
})

const route = useRoute()
const userId = route.params.id

const getUserData = async () => {
  const res = await get_user_api(userId)
  userData.value = res
}

const goBack = () => {
  window.history.back()
}

onMounted(() => {
  getUserData()
})
</script>

<template>
  <div class="ml-10 my-10 col-span-10 text-font">
    <h1 class="text-5xl font-bold">用戶詳情</h1>

    <div class="w-[750px] lg:w-[900px]">
      <div class="flex justify-center my-10">
        <ul class="flex flex-col space-y-5">
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
          <div class="w-[150px] h-[150px] rounded-full overflow-hidden">
            <img :src="renderPhotoPath" :alt="userData.name" class="w-full h-full object-cover" />
          </div>

          <p class="mt-10">可用積分：{{ userData.points || 0 }} 點</p>

          <RouterLink
            :to="`/admin/pointshistory/${userData._id}`"
            class="btn bg-third text-font border-none hover:bg-font hover:text-white px-[15px] py-[9px] mt-[23px]"
          >
            查看積分詳情
          </RouterLink>

          <div class="w-full flex justify-center space-x-4 md:justify-between mt-[93px]">
            <button
              type="button"
              @click="goBack"
              class="btn bg-third text-font font-semibold rounded px-5 text-base w-1/2 md:w-[125px] border-none hover:opacity-80 hover:bg-third"
            >
              取消
            </button>

            <button
              type="button"
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
