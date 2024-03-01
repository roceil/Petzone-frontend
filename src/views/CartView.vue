<script setup>
import { watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { cartStore } from '@/stores/cart'

const cartHandler = cartStore()
const { cartList, totalPrice } = storeToRefs(cartHandler)

watch(cartList.value, () => {
  const subTotal = cartList.value.map((item) => {
    // console.log(item)
    if (item.price) {
      return item.price * item.qty
    } else {
      return item.originPrice * item.qty
    }
  })
  totalPrice.value = subTotal.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
})

onMounted(() => {
  const subTotal = cartList.value.map((item) => {
    // console.log(item)
    if (item.price) {
      return item.price * item.qty
    } else {
      return item.originPrice * item.qty
    }
  })
  totalPrice.value = subTotal.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  // console.log(subTotal, total)
})
</script>

<template>
  <!-- 頁面標題 -->
  <div class="container relative">
    <h1 class="m-10 text-font text-5xl font-bold">你的購物車</h1>
  </div>
  <div class="container">
    <!-- 購買商品明細 -->
    <div class="mt-10">
      <table class="text-font">
        <thead class="h-[60px] bg-third text-xl">
          <th class="rounded-l-[10px] text-left px-10">購買商品</th>
          <th class="px-10">售價</th>
          <th class="px-10">數量</th>
          <th class="rounded-r-[10px] text-left px-10">金額</th>
        </thead>
        <tbody class="rounded-[10px] shadow">
          <tr class="h-[116px] p-4" v-for="product in cartList" :key="product._id">
            <td>
              <div class="flex items-center gap-5 ml-8 mr-8 lg:mr-24">
                <img
                  class="w-[100px] h-[100px] rounded-[10px] object-cover"
                  :src="product.photos[0]"
                  alt="產品圖"
                />
                <p>{{ product.name }}</p>
              </div>
            </td>
            <td class="text-center">
              <p v-if="product.price">$ {{ product.price }}</p>
              <p v-else>$ {{ product.originPrice }}</p>
            </td>
            <td>
              <div class="flex justify-center">
                <input
                  id="number-input"
                  type="number"
                  class="block w-[60px] h-[30px] bg-gray-50 border rounded-lg text-center"
                  placeholder="1"
                  min="0"
                  required
                  v-model="product.qty"
                />
              </div>
            </td>
            <td class="rounded-r-[10px]">
              <div class="flex justify-center gap-7">
                <p v-if="product.price">NT$ {{ product.price * product.qty }}</p>
                <p v-else>NT$ {{ product.originPrice * product.qty }}</p>
                <button type="button" @click="cartHandler.deleteFromCart(product._id)">
                  <img src="../assets/ecommerce/delete-button.svg" alt="刪除按鈕" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 訂單摘要 -->
    <table class="absolute top-[30%] left-[65%] w-[350px] text-font">
      <thead class="h-[60px] bg-third text-2xl text-center">
        <th class="rounded-[10px]" colspan="2">訂單摘要</th>
      </thead>
      <tbody class="rounded-[10px] shadow">
        <tr>
          <td class="text-2xl font-bold pl-6 py-3">商品總計</td>
          <td class="text-right pr-6 py-3">NT$ {{ totalPrice }}</td>
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
              placeholder="0"
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
          <td class="text-right text-sm pr-6">-0</td>
        </tr>
        <tr>
          <td colspan="2" class="text-right text-2xl font-bold pr-6 py-3">NT$ {{ totalPrice }}</td>
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
</template>
