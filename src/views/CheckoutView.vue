<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { cartStore } from '@/stores/cart'
import { orderStore } from '@/stores/order'
import { useRouter } from 'vue-router'

import { Form as VForm, Field as VField, ErrorMessage, defineRule, configure } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

const router = useRouter()

const cartHandler = cartStore()
const { cartList, totalPrice } = storeToRefs(cartHandler)
const orderHandler = orderStore()

const recipient = ref({
  userId: null,
  name: '',
  email: '',
  phone: '',
  address: ''
})

const paymentType = ref()

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})
setLocale('zh_TW')

const isTel = (value) => {
  const phoneNumber = /(\d{2,3}-?|\(\d{2,3}\))\d{3,4}-?\d{4}|09\d{2}(\d{6}|-\d{3}-\d{3})/
  return phoneNumber.test(value) ? true : '請輸入正確的電話號碼'
}

const onSubmit = async (recipient, paymentType, totalPrice) => {
  // console.log(recipient, paymentType, totalPrice)
  const neworder = {
    products: cartList.value,
    recipient: recipient,
    totalPrice: totalPrice,
    paymentType: paymentType
  }
  const message = await orderHandler.addOrder(neworder)
  // console.log(message.orderId)
  directToOrderPage(message.orderId)
}

const directToOrderPage = (orderId) => {
  // console.log(orderId)
  router.push(`/ecommerce/order/${orderId}`)
}
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
          <tr v-for="product in cartList" :key="product._id">
            <td class="px-10 py-5">
              {{ product.name }}
            </td>
            <td class="px-10 py-5">
              <p v-if="product.price">$ {{ product.price }}</p>
              <p v-else>$ {{ product.originPrice }}</p>
            </td>
            <td class="px-10 py-5">x1</td>
            <td class="px-10 py-5 text-right">
              <p v-if="product.price">NT$ {{ product.price * product.qty }}</p>
              <p v-else>NT$ {{ product.originPrice * product.qty }}</p>
            </td>
          </tr>
          <!-- <tr>
            <td class="px-10 py-5" colspan="2">優惠券折扣</td>
            <td class="px-10 py-5 text-right" colspan="2">-0</td>
          </tr> -->
          <!-- <tr class="border-black border-b-2">
            <td class="px-10 py-5" colspan="2">會員積分折抵</td>
            <td class="px-10 py-5 text-right" colspan="2">-0</td>
          </tr> -->
          <tr class="border-b-2">
            <td class="px-10 py-5 text-2xl font-bold" colspan="2">訂單金額</td>
            <td class="px-10 py-5 text-2xl font-bold text-right" colspan="2">
              NT$ {{ totalPrice }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 收件人資訊 & 付款方式 -->
    <div class="my-10 flex justify-center">
      <VForm
        class="text-font border rounded-[10px] shadow"
        v-slot="{ errors }"
        @submit="onSubmit(recipient, parseInt(paymentType), totalPrice)"
      >
        <div class="w-[900px] h-[60px] bg-third rounded-[10px]">
          <h1 colspan="2" class="text-xl font-bold text-center leading-[60px]">收件人資訊</h1>
        </div>
        <div class="my-5 px-10">
          <div class="my-5">
            <label for="name">姓名：</label>
            <VField
              type="text"
              id="name"
              name="姓名"
              class="ml-5 border rounded-md py-1.5 pl-6 pr-20 placeholder:text-gray-400"
              placeholder="請輸入收件人姓名"
              v-model="recipient.name"
              rules="required"
              :class="{ 'is-invalid': errors['姓名'] }"
            ></VField>
            <error-message name="姓名" class="invalid-feedback text-red-500 m-3"></error-message>
          </div>
          <div class="my-5">
            <label for="email">信箱：</label>
            <VField
              type="email"
              id="email"
              name="信箱"
              class="ml-5 border rounded-md py-1.5 pl-6 pr-20 placeholder:text-gray-400"
              placeholder="請輸入收件人信箱"
              v-model="recipient.email"
              rules="email|required"
              :class="{ 'is-invalid': errors['信箱'] }"
            ></VField>
            <error-message name="信箱" class="invalid-feedback text-red-500 m-3"></error-message>
          </div>
          <div class="my-5">
            <label for="phone">電話：</label>
            <VField
              type="tel"
              id="phone"
              name="phone"
              class="ml-5 border rounded-md py-1.5 pl-6 pr-20 placeholder:text-gray-400"
              placeholder="請輸入收件人電話"
              v-model="recipient.phone"
              :rules="isTel"
              :class="{ 'is-invalid': errors['phone'] }"
            ></VField>
            <error-message name="phone" class="invalid-feedback text-red-500 m-3"></error-message>
          </div>
          <div class="my-5">
            <label class="align-top" for="address">地址：</label>
            <VField
              type="text"
              id="address"
              name="地址"
              class="w-[700px] h-[90px] ml-5 border rounded-md py-1.5 pl-6 placeholder:text-gray-400"
              placeholder="請輸入收件人地址"
              v-model="recipient.address"
              rules="required"
              :class="{ 'is-invalid': errors['地址'] }"
            ></VField
            ><br />
            <error-message name="地址" class="invalid-feedback text-red-500"></error-message>
          </div>
        </div>
        <div class="w-[900px] h-[60px] bg-third rounded-[10px]">
          <h1 colspan="2" class="text-xl font-bold text-center leading-[60px]">付款方式</h1>
        </div>
        <div class="my-5 px-10">
          <VField
            type="radio"
            id="cash"
            name="付款方式"
            value="1"
            v-model.number="paymentType"
            rules="required"
            :class="{ 'is-invalid': errors['付款方式'] }"
          ></VField>
          <label class="ml-5" for="cash">現金付款</label><br />
          <VField
            type="radio"
            id="credit"
            name="付款方式"
            value="2"
            v-model.number="paymentType"
            rules="required"
            :class="{ 'is-invalid': errors['付款方式'] }"
          ></VField>
          <label class="ml-5" for="credit">信用卡付款</label><br />
          <error-message name="付款方式" class="invalid-feedback text-red-500"></error-message>
        </div>
        <div class="flex justify-end my-5 px-10">
          <button
            type="button"
            class="mx-3 w-[80px] h-[40px] bg-third rounded-md text-secondary"
            @click="router.push(`/ecommerce/cart`)"
          >
            回上一步
          </button>
          <button type="submit" class="mx-3 w-[80px] h-[40px] bg-secondary rounded-md text-primary">
            確認訂單
          </button>
        </div>
      </VForm>
    </div>
  </div>
</template>
