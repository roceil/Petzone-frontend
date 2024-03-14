<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PaginationComponent from '@/components/PaginationComponent.vue'

const productName = ref('')
const isEnabled = ref(-1)
const pagination = ref(1)

const router = useRouter()
const goAccountDetails = (accountId) => {
  router.push(`/admin/accountdetails/${accountId}`)
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
        <label for="name" class="mr-1 text-xl">用戶帳號</label>
        <div class="relative">
          <input
            type="text"
            id="name"
            name="name"
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
        <label for="name" class="mr-1 text-xl">用戶暱稱</label>
        <div class="relative">
          <input
            type="text"
            id="name"
            name="name"
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
          <tr v-for="(item, index) in 5" :key="index">
            <!-- 用戶帳號 -->
            <td>abc3213ddas@gmail.com</td>
            <!-- 用戶姓名 -->
            <td>拉拉雄</td>
            <!-- 用戶暱稱 -->
            <td>拉拉雄</td>
            <!-- 用戶權限 -->
            <td>管理者</td>
            <!-- 操作 -->
            <td class="button-group flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
              <button
                class="btn btn-sm bg-gray-200 border-0 hover:bg-gray-300"
                @click.prevent="goAccountDetails(123)"
              >
                查看詳情
              </button>
              <button
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
      :pagination="pagination"
      :filterProducts="filterProducts"
    ></PaginationComponent>
  </div>
</template>
