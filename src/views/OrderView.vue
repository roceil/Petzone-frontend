<script setup>
import { productListData } from '@/constants'
</script>
<template>
  <!-- 頁面標題 -->
  <div class="container">
    <h1 class="mt-10 ml-10 text-font text-5xl font-bold">訂單詳情</h1>
  </div>

  <div class="containter w-[900px] m-auto mb-10 justify-center text-font">
    <!-- 訂單編號及狀態 -->
    <P class="text-xl font-bold text-right">訂單狀態：未付款</P>
    <div class="flex">
      <p class="w-1/2 text-xl">#123456</p>
      <p class="w-1/2 text-xl text-right">下單日期：2024/01/01</p>
    </div>
    <table class="w-[900px] text-font rounded-[10px] shadow">
      <!-- 購買明細 -->
      <thead class="h-[60px] bg-third">
        <th colspan="5" class="rounded-[10px] text-xl text-center">購買明細</th>
      </thead>
      <tbody>
        <tr>
          <td colspan="5" class="pl-5 py-5 text-xl">商品明細</td>
        </tr>
        <tr v-for="product in productListData" :key="product.name">
          <td class="w-[100px]"></td>
          <td class="py-5">
            {{ product.name }}
          </td>
          <td class="py-5">NT$ {{ product.price }}</td>
          <td class="py-5">x1</td>
          <td class="pr-5 py-5 text-right">
            <p>NT$ {{ product.price }}</p>
          </td>
        </tr>
        <tr>
          <td class="w-[100px]"></td>
          <td class="py-5 border-black border-t-2 text-left" colspan="2">小計</td>
          <td class="px-5 py-5 border-black border-t-2 text-right" colspan="2">NT$ 800</td>
        </tr>
        <tr>
          <td colspan="5" class="pl-5 py-5 text-xl">折抵明細</td>
        </tr>
        <tr>
          <td class="w-[100px]"></td>
          <td class="py-5" colspan="2">優惠券折扣</td>
          <td class="px-5 py-5 text-right" colspan="2">-0</td>
        </tr>
        <tr>
          <td class="w-[100px]"></td>
          <td class="py-5 border-black border-b-2" colspan="2">會員積分折抵</td>
          <td class="px-5 py-5 border-black border-b-2 text-right" colspan="2">-80</td>
        </tr>
        <tr class="border-b-2">
          <td class="px-5 py-5 text-2xl font-bold" colspan="3">訂單金額</td>
          <td class="px-5 py-5 text-2xl font-bold text-right" colspan="2">NT$ 720</td>
        </tr>
      </tbody>
      <!-- 收件人資訊 -->
      <thead class="h-[60px] bg-third">
        <th colspan="5" class="rounded-[10px] text-xl text-center">收件人資訊</th>
      </thead>
      <tbody>
        <tr>
          <td colspan="5" class="pl-5 py-5">姓名：拉拉熊</td>
        </tr>
        <tr>
          <td colspan="5" class="pl-5 py-5">電話：0912345678</td>
        </tr>
        <tr>
          <td colspan="5" class="pl-5 py-5">地址：台北市中正區忠孝東路一段1號</td>
        </tr>
      </tbody>
      <thead class="h-[60px] bg-third">
        <th colspan="5" class="rounded-[10px] text-xl text-center">付款資訊</th>
      </thead>
      <tbody>
        <tr>
          <td colspan="5" class="pl-5 py-5">付款方式：信用卡付款</td>
        </tr>
      </tbody>
      <tr>
        <td colspan="5">
          <div class="flex justify-end">
            <button type="button" class="w-[80px] h-[40px] my-5 bg-third rounded-md text-secondary">
              返回首頁
            </button>
            <button
              type="button"
              class="w-[80px] h-[40px] m-5 bg-secondary rounded-md text-primary"
            >
              前往付款
            </button>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>
