<script setup>
import { productListData } from '@/constants'
</script>
<template>
  <!-- 頁面標題 -->
  <div class="container">
    <h1 class="m-10 text-font text-5xl font-bold">新增訂單</h1>
  </div>

  <div class="container">
    <!-- 購買明細 -->
    <div class="mt-10 flex justify-center">
      <table class="w-[900px] text-font">
        <thead class="h-[60px] bg-third">
          <th colspan="4" class="rounded-[10px] text-xl text-center">購買明細</th>
        </thead>
        <tbody class="rounded-[10px] shadow">
          <tr v-for="product in productListData" :key="product.name">
            <td class="px-10 py-5">
              {{ product.name }}
            </td>
            <td class="px-10 py-5">NT$ {{ product.price }}</td>
            <td class="px-10 py-5">x1</td>
            <td class="px-10 py-5 text-right">
              <p>NT$ {{ product.price }}</p>
            </td>
          </tr>
          <!-- <tr>
            <td class="px-10 py-5" colspan="2">優惠券折扣</td>
            <td class="px-10 py-5 text-right" colspan="2">-0</td>
          </tr> -->
          <tr class="border-black border-b-2">
            <td class="px-10 py-5" colspan="2">會員積分折抵</td>
            <td class="px-10 py-5 text-right" colspan="2">-80</td>
          </tr>
          <tr class="border-b-2">
            <td class="px-10 py-5 text-2xl font-bold" colspan="2">訂單金額</td>
            <td class="px-10 py-5 text-2xl font-bold text-right" colspan="2">NT$ 720</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 收件人資訊 & 付款方式 -->
    <div class="my-10 flex justify-center">
      <form class="text-font border rounded-[10px] shadow">
        <div class="w-[900px] h-[60px] bg-third rounded-[10px]">
          <h1 colspan="2" class="text-xl font-bold text-center leading-[60px]">收件人資訊</h1>
        </div>
        <div class="my-5 px-10">
          <div class="my-5">
            <label for="name">姓名：</label>
            <input
              type="text"
              id="name"
              name="name"
              class="ml-5 border rounded-md py-1.5 pl-6 pr-20 placeholder:text-gray-400"
              placeholder="請輸入收件人姓名"
            />
          </div>
          <div class="my-5">
            <label for="tel">電話：</label>
            <input
              type="tel"
              id="tel"
              name="tel"
              class="ml-5 border rounded-md py-1.5 pl-6 pr-20 placeholder:text-gray-400"
              placeholder="請輸入收件人電話"
            />
          </div>
          <div class="my-5">
            <label class="align-top" for="address">地址：</label>
            <textarea
              type="text"
              id="address"
              name="address"
              class="w-[700px] h-[90px] ml-5 border rounded-md py-1.5 pl-6 placeholder:text-gray-400"
              placeholder="請輸入收件人地址"
            ></textarea>
          </div>
        </div>
        <div class="w-[900px] h-[60px] bg-third rounded-[10px]">
          <h1 colspan="2" class="text-xl font-bold text-center leading-[60px]">付款方式</h1>
        </div>
        <div class="my-5 px-10">
          <input type="radio" id="cash" name="payment" value="cash" />
          <label class="ml-5" for="cash">現金付款</label><br />
          <input type="radio" id="credit" name="payment" value="credit" />
          <label class="ml-5" for="credit">信用卡付款</label><br />
        </div>
        <div class="flex justify-end my-5 px-10">
          <button type="button" class="w-[80px] h-[40px] bg-secondary rounded-md text-primary">
            確認訂單
          </button>
        </div>
      </form>
    </div>
  </div>
</template>