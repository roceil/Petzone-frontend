<script setup>
import { productListData } from '@/constants'
</script>

<template>
  <!-- 頁面標題 -->
  <div class="container">
    <h1 class="m-10 text-font text-5xl font-bold">你的購物車</h1>
  </div>

  <div class="container">
    <!-- 購買商品明細 -->
    <div class="w-2/3 mt-10 flex justify-center">
      <table class="text-font">
        <thead class="h-[60px] bg-third text-xl">
          <th class="rounded-l-[10px] text-left px-12">購買商品</th>
          <th class="px-12">售價</th>
          <th class="px-12">數量</th>
          <th class="rounded-r-[10px] text-left px-12">金額</th>
        </thead>
        <tbody class="rounded-[10px] shadow">
          <tr class="h-[116px] p-4" v-for="product in productListData" :key="product.name">
            <td>
              <div class="flex items-center gap-5 ml-9 mr-36">
                <div class="w-[100px] h-[100px] bg-red-300 rounded-[10px]">
                  <img src="" alt="product" />
                </div>
                <p>{{ product.name }}</p>
              </div>
            </td>
            <td class="text-center">{{ product.price }}</td>
            <td>
              <div class="flex justify-center">
                <input
                  id="number-input"
                  type="number"
                  class="block w-[60px] h-[30px] bg-gray-50 border rounded-lg text-center"
                  placeholder="1"
                  min="0"
                  required
                />
              </div>
            </td>
            <td class="rounded-r-[10px]">
              <div class="flex justify-center gap-7">
                <p>NT$ 100</p>
                <button type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      d="M6.72902 18L18.8064 6M6.72902 6L18.8064 18"
                      stroke="#415656"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 訂單摘要 -->
    <div class="w-1/3">
      <table class="fixed top-[228px] right-[120px] w-[350px] text-font">
        <thead class="h-[60px] bg-third text-2xl text-center">
          <th class="rounded-[10px]" colspan="2">訂單摘要</th>
        </thead>
        <tbody class="rounded-[10px] shadow">
          <tr>
            <td class="text-2xl font-bold pl-6 py-3">商品總計</td>
            <td class="text-right pr-6 py-3">NT$ 800</td>
          </tr>
          <tr>
            <td class="font-bold pl-6 py-3">使用優惠代碼</td>
            <td>
              <div class="flex justify-end pr-6 py-3">
                <input
                  id="coupon-input"
                  type="text"
                  class="block w-[120px] h-[30px] bg-gray-50 border rounded-l-[6px] text-font text-center"
                  placeholder="請輸入優惠代碼"
                />
                <button
                  type="button"
                  class="w-[50px] h-[30px] bg-secondary rounded-r-[6px] text-primary"
                >
                  確認
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td class="font-bold pl-6 py-3">使用會員積分折抵</td>
            <td class="flex justify-end pr-6 py-3">
              <input
                id="point-input"
                type="number"
                class="block w-[80px] h-[30px] bg-gray-50 border rounded-lg text-font text-center"
                placeholder="1"
                min="0"
              />
            </td>
          </tr>
          <tr class="border-b-2">
            <td colspan="2" class="text-right text-sm pr-6 py-3">使用後剩餘:10點</td>
          </tr>
          <tr>
            <td class="text-sm pl-6 pt-6">優惠券折扣</td>
            <td class="text-right text-sm pr-6 pt-3">-0</td>
          </tr>
          <tr>
            <td class="text-sm pl-6">會員積分折抵</td>
            <td class="text-right text-sm pr-6">-80</td>
          </tr>
          <tr>
            <td colspan="2" class="text-right text-2xl font-bold pr-6 py-3">NT$ 720</td>
          </tr>
          <tr>
            <td colspan="2" class="text-right pr-6 py-3">
              <button type="button" class="w-[80px] h-[40px] bg-secondary rounded-md text-primary">
                來去結帳
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
