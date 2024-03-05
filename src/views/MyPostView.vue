<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { get_member_data_api } from '@/api/user'

// 使用者資料
const userStore = useUserStore()
const userId = userStore.userId
const userData = ref({})

// 取得使用者資料
const getMemberData = async (userId) => {
  try {
    const data = await get_member_data_api(userId)
    userData.value = data
    console.log(userData.value)
  } catch (error) {
    console.error(error)
    alert('取得使用者資料失敗')
  }
}

onMounted(() => {
  getMemberData(userId)
})
</script>

<template>
  <div class="MyPostView">
    <div class="container mt-[25px] max-w-[970px] mb-[211px]">
      <!-- 自我介紹區塊 -->
      <div
        class="flex justify-center items-end border-b border-secondary pb-[25px] px-[85px] space-x-[288px]"
      >
        <div class="w-[381px] h-[178px] px-[10px] flex justify-between">
          <div class="">
            <div class="w-[100px] h-[100px] rounded-full overflow-hidden">
              <img v-if="userData.photo" :src="userData.photo" alt="user_photo" class="object-cover w-full h-full"/>
              <img v-else :src="default_avatar" alt="default_avatar" />
            </div>

            <p class="text-font font-semibold mt-5 text-center">{{ userData.nickName }}</p>
          </div>

          <div class="text-font leading-5 w-[211px] flex items-center">
            <p>{{ userData.intro }}</p>
          </div>
        </div>

        <button
          class="btn bg-secondary hover:bg-font border-none text-white font-semibold px-[30px] py-[9px] text-base"
        >
          新增貼文
        </button>
      </div>

      <!-- 貼文區塊 -->

      <ul class="px-[29px] flex flex-wrap justify-center gap-[50px] mt-[47px]">
        <li v-for="num in 9" :key="num">
          <div class="w-[220px] h-[220px] bg-slate-300 rounded-[10px]"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
