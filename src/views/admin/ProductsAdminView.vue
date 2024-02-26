<script setup></script>
<template>
  <div class="col-span-10 text-font">
    <!-- 頁面標題 -->
    <div>
      <h1 class="mt-10 ml-10 text-5xl font-bold">商品管理</h1>
    </div>

    <div class="mt-6 ml-10 mr-10">
      <!-- 搜尋、分類區塊 -->
      <div class="flex justify-center">
        <div class="flex items-center">
          <label for="name" class="mr-2 text-xl">商品名稱</label>
          <div class="relative">
            <input
              type="text"
              id="name"
              name="name"
              class="w-[200px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
              placeholder="請輸入商品名稱"
            />
            <button class="absolute inset-y-0 right-0 mr-2 top-0 mt-1">
              <img src="../../assets/search.svg" alt="search" />
            </button>
          </div>
        </div>
        <div class="flex items-center">
          <label for="category" class="mx-2 text-xl">商品類型</label>
          <select
            id="category"
            class="w-[200px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
          >
            <option disabled>請選擇商品類型</option>
            <option value="1">狗狗主食</option>
            <option value="2">狗狗零食</option>
            <option value="3">貓貓主食</option>
            <option value="4">貓貓零食</option>
            <option value="5">貓砂系列</option>
            <option value="6">保健系列</option>
            <option value="7">沐浴 & 清潔</option>
            <option value="8">生活用品 & 玩具</option>
          </select>
        </div>
        <div class="flex items-center">
          <label for="isEnabled" class="mx-2 text-xl">商品狀態</label>
          <select
            id="isEnabled"
            class="w-[120px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
          >
            <option disabled>請選擇商品狀態</option>
            <option value="0">下架</option>
            <option value="1">上架</option>
          </select>
        </div>

        <button class="w-[125px] mt-1 ml-6 btn btn-secondary text-white">新增商品</button>
      </div>

      <!-- 商品列表 -->
      <div class="flex justify-center mt-4">
        <table>
          <thead class="h-[60px] bg-third text-xl">
            <th class="w-[200px] rounded-l-[10px] text-left p-1">商品編號</th>
            <th class="w-[200px] text-left">商品名稱</th>
            <th class="w-[100px] text-left">商品類型</th>
            <th class="w-[100px] text-left">價格</th>
            <th class="w-[80px] text-left">庫存量</th>
            <th class="w-[80px] text-left">狀態</th>
            <th class="w-[200px] rounded-r-[10px] text-left">操作</th>
          </thead>
          <tbody class="rounded-[10px] shadow">
            <tr v-for="item in 5" :key="item">
              <td class="p-1">#123456</td>
              <td class="">皇家狗飼料</td>
              <td>狗狗主食</td>
              <td>$ 999</td>
              <td>10</td>
              <td>
                <p v-if="0">上架</p>
                <p class="text-gray-400" v-else>下架</p>
              </td>
              <td colspan="2">
                <div class="my-1 button-group">
                  <button class="mr-3 btn bg-gray-200 border-0 p-0 hover:bg-gray-300">
                    查看詳情
                  </button>
                  <button class="ml-3 btn text-white bg-secondary p-0 hover:bg-font">
                    新增商品
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
