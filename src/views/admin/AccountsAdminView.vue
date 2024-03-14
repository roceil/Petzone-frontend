<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import PaginationComponent from '@/components/PaginationComponent.vue'
import { get_all_users_api } from '@/api/user'
import { useUserStore } from '@/stores/user'

const productName = ref('')
const isEnabled = ref(-1)
const pagination = ref(1)

const router = useRouter()
const goAccountDetails = (accountId) => {
  router.push(`/admin/accountdetails/${accountId}`)
}

const userStore = useUserStore()
const renderUserList = ref([])
const getAllUser = async (newPage) => {
  const res = await get_all_users_api(newPage)
  renderUserList.value = res.users
  pagination.value = res.totalPages
}

// 當 userStore.currentPage 變化時，自動重新 fetch 數據
watch(
  () => userStore.currentPage,
  async (newPage) => {
    await getAllUser(newPage)
  },
  { immediate: true }
) // immediate: true 確保在掛載時也執行一次

// 判斷是管理員還是一般使用者
const filterProducts = (type) => {
  let result

  if (!type) {
    result = '一般用戶'
  } else {
    result = '管理員'
  }

  return result
}
</script>

<template>
  <div class="ml-10 mt-10 flex justify-center col-span-10 text-font">
    <div class="w-[800px] lg:w-[900px]">
      <!-- 頁面標題 -->
      <div class="flex justify-between">
        <h1 class="text-5xl font-bold">帳號管理</h1>
      </div>
      <!-- 搜尋、分類區塊 -->
      <div class="flex justify-between mt-4">
        <div class="flex items-center space-x-2">
          <label for="account" class="mr-1 text-xl">用戶帳號</label>
          <div class="relative">
            <input
              type="text"
              id="account"
              name="account"
              class="max-w-[170px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
              placeholder="請輸入用戶帳號"
              v-model="productName"
            />
            <button
              class="absolute inset-y-0 right-0 top-0 px-2"
              @click.prevent="searchProducts('name')"
            >
              <img src="../../assets/search.svg" alt="search" />
            </button>
          </div>
        </div>

        <div class="flex items-center space-x-2">
          <label for="nickName" class="mr-1 text-xl">用戶暱稱</label>
          <div class="relative">
            <input
              type="text"
              id="nickName"
              name="nickName"
              class="max-w-[170px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
              placeholder="請輸入用戶暱稱"
              v-model="productName"
            />
            <button
              class="absolute inset-y-0 right-0 top-0 px-2"
              @click.prevent="searchProducts('name')"
            >
              <img src="../../assets/search.svg" alt="search" />
            </button>
          </div>
        </div>

        <div class="flex items-center space-x-2">
          <label for="isEnabled" class="mx-1 text-xl">權限</label>
          <select
            id="isEnabled"
            class="max-w-[150px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
            v-model="isEnabled"
            @click="filterProducts('isEnabled')"
          >
            <option value="-1" disabled>請選擇權限</option>
            <option value="0">管理者</option>
            <option value="1">一般使用者</option>
          </select>
        </div>
      </div>

      <!-- 用戶列表 -->
      <div class="mt-6">
        <!-- 表格標題 -->
        <div
          class="grid grid-cols-12 bg-third h-[60px] items-center px-2 text-base lg:text-xl rounded-[10px] text-center"
        >
          <div class="col-span-4">用戶帳號</div>
          <div class="col-span-2">用戶姓名</div>
          <div class="col-span-2">用戶暱稱</div>
          <div class="col-span-1 lg:col-span-2">權限</div>
          <div class="col-span-3 lg:col-span-2 text-center">操作</div>
        </div>

        <!-- 表格內容 -->
        <div
          class="w-full border border-[#9BA5B7] rounded-[10px] custom-shadow py-11 px-2 space-y-5"
        >
          <div
            v-for="user in renderUserList"
            :key="user._id"
            class="grid grid-cols-12 items-center text-center"
          >
            <!-- 用戶帳號 -->
            <div class="col-span-4">{{ user.account }}</div>
            <!-- 用戶姓名 -->
            <div class="col-span-2">{{ user.name }}</div>
            <!-- 用戶暱稱 -->
            <div class="col-span-2">{{ user.nickName }}</div>
            <!-- 用戶權限 -->
            <div class="col-span-1 lg:col-span-2">{{ filterProducts(user.permission) }}</div>
            <!-- 操作 -->
            <div class="col-span-3 lg:col-span-2 flex justify-center button-group space-x-3">
              <button
                class="btn bg-gray-200 border-0 p-0 px-1 hover:bg-gray-300"
                @click.prevent="goAccountDetails(user._id)"
              >
                查看詳情
              </button>
              <button
                class="btn text-white bg-secondary p-0 px-1 hover:bg-font"
                @click.prevent="directToProductPage(product._id, 'edit')"
              >
                刪除用戶
              </button>
            </div>
          </div>
        </div>
      </div>

      <PaginationComponent :pagination="pagination" />
    </div>
  </div>
</template>
