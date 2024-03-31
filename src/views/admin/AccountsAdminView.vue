<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PaginationComponent from '@/components/PaginationComponent.vue'
import { get_all_users_api } from '@/api/user'

const renderUserList = ref([])
const account = ref('')
const nickName = ref('')
const permission = ref('')
const pagination = ref({
  totalPage: 1,
  nowPage: 1
})

const router = useRouter()
const goAccountDetails = (accountId) => {
  router.push(`/admin/accountdetails/${accountId}`)
}

const changePage = (page) => {
  pagination.value.nowPage = page
  getAllUser()
}
const resetSearch = () => {
  account.value = ''
  nickName.value = ''
  permission.value = ''
  pagination.value.nowPage = 1
  getAllUser()
}

const getAllUser = async () => {
  const params = {
    page: pagination.value.nowPage,
    account: account.value || null,
    nickName: nickName.value || null,
    permission: permission.value || null
  }
  const res = await get_all_users_api(params)
  renderUserList.value = res.users
  pagination.value.totalPage = res.totalPages
}

onMounted(() => {
  getAllUser()
})

const filterPermission = (permission) => {
  if (permission === 'admin') {
    return '管理者'
  }
  return '一般用戶'
}
</script>

<template>
  <div class="ml-10 mt-10 col-span-10 text-font">
    <!-- 頁面標題 -->
    <div class="flex justify-between">
      <h1 class="text-5xl font-bold">帳號管理</h1>
    </div>
    <!-- 搜尋、分類區塊 -->
    <div class="flex space-x-2 mt-4">
      <div class="flex items-center space-x-2">
        <label for="account" class="mr-1 text-xl">用戶帳號</label>
        <div class="relative">
          <input
            type="text"
            id="account"
            name="account"
            class="max-w-[170px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
            placeholder="請輸入用戶帳號"
            v-model="account"
          />
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
            v-model="nickName"
          />
        </div>
      </div>

      <div class="flex items-center space-x-2">
        <label for="isEnabled" class="mx-1 text-xl">權限</label>
        <select
          id="isEnabled"
          class="max-w-[150px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
          v-model="permission"
        >
          <option value="" disabled>請選擇權限</option>
          <option value="admin">管理者</option>
        </select>
      </div>
    </div>
    <div class="flex space-x-2 justify-end">
      <button type="button" class="btn btn-sm mt-4" @click="resetSearch">清除</button>
      <button type="button" class="btn btn-sm mt-4" @click="getAllUser">搜尋</button>
    </div>

    <!-- 商品列表 -->
    <div class="mt-4 overflow-x-auto">
      <table class="table">
        <!-- 表格標題 -->
        <thead class="h-[60px] bg-third text-xl">
          <th class="rounded-l-[10px]">用戶帳號</th>
          <th>用戶姓名</th>
          <th>用戶暱稱</th>
          <th>權限</th>
          <th class="rounded-r-[10px]">操作</th>
        </thead>

        <!-- 表格內容 -->
        <tbody class="rounded-[10px] shadow">
          <tr v-for="(user, index) in renderUserList" :key="index">
            <!-- 用戶帳號 -->
            <td>{{ user.account }}</td>
            <!-- 用戶姓名 -->
            <td>{{ user.name }}</td>
            <!-- 用戶暱稱 -->
            <td>{{ user.nickName }}</td>
            <!-- 用戶權限 -->
            <td>{{ filterPermission(user.permission) }}</td>
            <!-- 操作 -->
            <td class="button-group flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
              <button
                type="button"
                class="btn btn-sm bg-gray-200 border-0 hover:bg-gray-300"
                @click.prevent="goAccountDetails(user._id)"
              >
                查看詳情
              </button>
              <button
                type="button"
                class="btn btn-sm text-white bg-secondary hover:bg-font"
                @click.prevent="directToProductPage(product._id, 'edit')"
              >
                刪除用戶
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <PaginationComponent
      :totalPage="pagination.totalPage"
      :nowPage="pagination.nowPage"
      @changePage="changePage"
    ></PaginationComponent>
  </div>
</template>
