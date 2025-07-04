<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { cartStore } from '@/stores/cart'
import { orderStore } from '@/stores/order'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

import { Form as VForm, Field as VField, ErrorMessage, defineRule, configure } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

import { get_member_data_api } from '@/api/user'
import { delete_all_cart_api } from '@/api/ecommerce'

const router = useRouter()

const cartHandler = cartStore()
const { cartList, totalPrice, usePoints, finalPrice } = storeToRefs(cartHandler)
const orderHandler = orderStore()
const userStore = useUserStore()
const { userId } = storeToRefs(userStore)

const recipient = ref({
  userId: null,
  name: '',
  email: '',
  phone: '',
  address: ''
})

const paymentType = ref()

Object.entries(AllRules).forEach(([ruleName, ruleFn]) => {
  if (ruleName === 'default' || ruleName === 'all') {
    return // 排除 default 和 all 屬性
  } else if (typeof ruleFn === 'function') {
    defineRule(ruleName, ruleFn)
  } else {
    console.warn(`跳過規則 '${ruleName}'，因為它不是函式`)
  }
})
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})
setLocale('zh_TW')

const isTel = (value) => {
  if (!value) {
    return '電話號碼 為必填'
  }
  const phoneNumber = /^0[2|4]\d{4}\d{4}|^0[3|5-8]\d{3}\d{4}|^09\d{2}(\d{6}|-\d{3}-\d{3})/
  return phoneNumber.test(value) ? true : '請輸入正確的電話號碼'
}

const onSubmit = async (recipient, paymentType) => {
  const neworder = {
    products: cartList.value,
    recipient: recipient,
    totalPrice: totalPrice.value,
    paymentType: paymentType,
    pointsDiscount: -usePoints.value / 10,
    finalPrice: finalPrice.value
  }

  const data = await orderHandler.addOrder(neworder)
  if (data.message === '訂單新增成功') {
    if (userId.value !== '' && userId.value !== undefined) {
      await delete_all_cart_api(userId.value)
      localStorage.setItem('cart', [])
      cartList.value = []
    } else {
      cartList.value = []
    }

    directToOrderPage(data.orderId)
  }
}

const directToOrderPage = (orderId) => {
  router.push(`/ecommerce/order/${orderId}`)
}

onMounted(async () => {
  //確認是否已登入，如已登入自動帶入會員資料
  if (userId.value) {
    const userInfo = await get_member_data_api(userId.value)
    recipient.value = {
      userId: userInfo._id,
      name: userInfo.name,
      email: userInfo.account,
      phone: userInfo.phone,
      address: userInfo.address
    }
  }
})
</script>

<template>
  <!-- 頁面標題 -->
  <div class="container mt-10 text-font relative">
    <h1 class="text-xl font-bold md:text-5xl">新增訂單</h1>
  </div>

  <div class="container my-10">
    <!-- 購買明細 -->
    <div class="flex justify-center mb-5 text-font">
      <table
        class="w-[375px] border border-separate border-spacing-0 rounded-[10px] shadow md:w-[900px]"
      >
        <thead class="h-[60px] bg-third">
          <th
            colspan="4"
            class="leading-[60px] rounded-t-[10px] text-center md:leading-[60px] md:text-xl"
          >
            購買明細
          </th>
        </thead>
        <tbody class="rounded-b-[10px] text-xs md:text-base">
          <tr v-for="product in cartList" :key="product._id">
            <td class="pl-3 md:px-10 md:py-5">
              {{ product.name }}
            </td>
            <td class="p-3 text-right md:px-10 md:py-5">
              <p v-if="product.price">
                $ {{ product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
              </p>
              <p v-else>
                $ {{ product.originPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
              </p>
            </td>
            <td class="p-3 text-center md:px-10 md:py-5">x {{ product.qty }}</td>
            <td class="pr-3 text-right md:px-10 md:py-5">
              <p v-if="product.price">
                NT$
                {{ (product.price * product.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
              </p>
              <p v-else>
                NT$
                {{
                  (product.originPrice * product.qty)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }}
              </p>
            </td>
          </tr>
          <!-- <tr>
            <td class="pl-3 py-5 md:px-10" colspan="2">優惠券折扣</td> 
            <td class="pr-3 py-5 text-right md:px-10" colspan="2">-0</td>
          </tr> -->
          <tr v-if="usePoints">
            <td class="pl-3 py-5 md:px-10" colspan="2">會員積分折抵</td>
            <td class="pr-3 py-5 text-right md:px-10" colspan="2">- {{ usePoints / 10 }}</td>
          </tr>
          <tr>
            <td colspan="4" class="border-t-2"></td>
          </tr>
          <tr class="border">
            <td class="p-3 text-base font-bold md:px-10 md:py-5 md:text-2xl" colspan="2">
              訂單金額
            </td>
            <td class="p-3 font-bold text-right md:px-10 md:py-5 md:text-2xl" colspan="2">
              NT$
              {{
                finalPrice
                  ? finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 收件人資訊 & 付款方式 -->
    <div class="flex justify-center">
      <VForm
        class="w-[375px] text-xs text-font border rounded-[10px] shadow md:w-[900px] md:text-base"
        v-slot="{ errors }"
        @submit="onSubmit(recipient, parseInt(paymentType), totalPrice)"
      >
        <div class="h-[60px] bg-third rounded-[10px] md:w-[900px]">
          <h1
            colspan="2"
            class="leading-[60px] text-base font-bold text-center md:leading-[60px] md:text-xl"
          >
            收件人資訊
          </h1>
        </div>
        <div class="px-3 my-5 md:px-10">
          <div class="my-5">
            <label for="name">姓名：</label>
            <VField
              type="text"
              id="name"
              name="姓名"
              class="w-[65%] p-1.5 border rounded-md md:ml-5 md:py-1.5 md:pl-3 md:pr-20 placeholder:text-gray-400"
              placeholder="請輸入收件人姓名"
              v-model="recipient.name"
              rules="required"
              :class="{ 'is-invalid': errors['姓名'] }"
            ></VField>
            <br class="md:hidden" />
            <error-message
              name="姓名"
              class="invalid-feedback text-red-500 md:ml-3"
            ></error-message>
          </div>
          <div class="my-5">
            <label for="email">信箱：</label>
            <VField
              type="email"
              id="email"
              name="信箱"
              class="w-[65%] p-1.5 border rounded-md md:ml-5 md:py-1.5 md:pl-3 md:pr-20 placeholder:text-gray-400"
              placeholder="請輸入收件人信箱"
              v-model="recipient.email"
              rules="email|required"
              :class="{ 'is-invalid': errors['信箱'] }"
            ></VField>
            <br class="md:hidden" />
            <error-message
              name="信箱"
              class="invalid-feedback text-red-500 md:ml-3"
            ></error-message>
          </div>
          <div class="my-5">
            <label for="phone">電話：</label>
            <VField
              type="tel"
              id="phone"
              name="phone"
              class="w-[65%] p-1.5 border rounded-md md:ml-5 md:py-1.5 md:pl-3 md:pr-20 placeholder:text-gray-400"
              placeholder="請輸入收件人電話"
              v-model="recipient.phone"
              :rules="isTel"
              :class="{ 'is-invalid': errors['phone'] }"
            ></VField>
            <br class="md:hidden" />
            <error-message
              name="phone"
              class="invalid-feedback text-red-500 md:ml-3"
            ></error-message>
          </div>
          <div class="my-5">
            <label class="align-top" for="address">地址：</label>
            <VField
              type="text"
              id="address"
              name="地址"
              class="w-[65%] p-1.5 border rounded-md md:ml-5 placeholder:text-gray-400"
              placeholder="請輸入收件人地址"
              v-model="recipient.address"
              rules="required"
              :class="{ 'is-invalid': errors['地址'] }"
            ></VField>
            <br class="md:hidden" />
            <error-message
              name="地址"
              class="invalid-feedback text-red-500 md:ml-3"
            ></error-message>
          </div>
        </div>
        <div class="h-[60px] bg-third rounded-[10px] md:w-[900px]">
          <h1
            colspan="2"
            class="leading-[60px] text-base font-bold text-center md:leading-[60px] md:text-xl"
          >
            付款方式
          </h1>
        </div>
        <div class="px-3 my-5 md:px-10">
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
        <div class="px-3 flex justify-end my-5 md:px-10">
          <button
            type="button"
            class="mx-3 w-[80px] h-[40px] bg-third rounded-md text-secondary"
            @click="router.push(`/ecommerce/cart`)"
          >
            回上一步
          </button>
          <button type="submit" class="w-[80px] h-[40px] bg-secondary rounded-md text-primary">
            確認訂單
          </button>
        </div>
      </VForm>
    </div>
  </div>
</template>
