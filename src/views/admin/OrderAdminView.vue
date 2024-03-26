<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { get_order_by_id_api } from '@/api/ecommerce'
import { update_order_api } from '@/api/ecommerceAdmin'
import { Form as VForm, Field as VField, ErrorMessage, defineRule, configure } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import { useAlertStore } from '@/stores/alert'
import OrderChangeModal from '@/components/OrderChangeModal.vue'

const route = useRoute()
const router = useRouter()
const alertStore = useAlertStore()
const OrderChangeModalRef = ref()
const orderId = ref('')
const order = ref({
  recipient: {
    name: '',
    email: '',
    phone: '',
    address: ''
  }
})

const getOrder = async () => {
  const { data } = await get_order_by_id_api(orderId.value)
  order.value = convert(data.order)
}

// 加入千分位
const addThousandSeparator = (num, separator = ',') => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}

const convert = (order) => {
  const createAt = order.createdAt
  order.createdAt = createAt.slice(0, 10)

  order.totalPrice = addThousandSeparator(order.totalPrice)
  if (order.finalPrice) {
    order.finalPrice = addThousandSeparator(order.finalPrice)
  }

  // 訂單狀態
  switch (order.status) {
    case 'unPaid':
      order.status = '1'
      break
    case 'hasPaid':
      order.status = '2'
      break
    case 'done':
      order.status = '3'
      break
    case 'cancel':
      order.status = '4'
      break
  }

  // 付款方式
  switch (order.paymentType) {
    case 'cash':
      order.paymentType = '1'
      break
    case 'card':
      order.paymentType = '2'
      break
  }
  return order
}

// 表單驗證
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})
setLocale('zh_TW')

const isTel = (value) => {
  const phoneNumber = /^0[2|4]\d{4}\d{4}|^0[3|5-8]\d{3}\d{4}|^09\d{2}(\d{6}|-\d{3}-\d{3})/
  return phoneNumber.test(value) ? true : '請輸入正確的電話號碼'
}

const onSubmit = async () => {
  const OrderInfo = {
    recipient: order.value.recipient,
    paymentType: order.value.paymentType
  }
  const { data } = await update_order_api(orderId.value, OrderInfo)
  const message = data.message
  if (message === '更新訂單成功') {
    alertStore.openAlert('success', message)
  } else if (message !== '') {
    alertStore.openAlert('error', message)
  }
}

onMounted(() => {
  orderId.value = route.query.orderId
  getOrder()
})
</script>

<template>
  <div class="ml-10 mt-10 col-span-10 text-font">
    <!-- 頁面標題 -->
    <h1 class="text-5xl font-bold">訂單詳情</h1>

    <div class="flex justify-center">
      <div class="my-10 w-[760px]">
        <!-- 訂單編號及狀態 -->
        <div class="flex justify-end">
          <label for="status" class="mx-1 my-3 text-xl">訂單狀態</label>
          <select
            id="status"
            class="max-w-[100px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
            v-model="order.status"
            @change="OrderChangeModalRef.showModal(order.status)"
          >
            <option value="0" disabled>請選擇訂單狀態</option>
            <option value="1">未付款</option>
            <option value="2">已付款</option>
            <option value="3">已完成</option>
            <option value="4">已取消</option>
          </select>
        </div>
        <div class="grid grid-cols-2">
          <p class="text-xl">訂單編號：# {{ order.orderId }}</p>
          <p class="text-right text-xl">下單日期：{{ order.createdAt }}</p>
        </div>

        <!-- 購買明細 -->
        <div class="border border-b-0 rounded-t-[10px]">
          <table class="w-[760px]">
            <thead class="h-[60px] bg-third">
              <th colspan="5" class="rounded-t-[10px] text-center text-xl">購買明細</th>
            </thead>
            <tbody>
              <tr>
                <td colspan="5" class="p-3 px-10 py-5 text-xl">商品明細</td>
              </tr>
              <tr v-for="product in order.products" :key="product._id">
                <td class="w-[150px]"></td>
                <td class="py-5">{{ product.name }}</td>
                <td class="py-5">
                  <p v-if="product.price">
                    NT$ {{ product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                  </p>
                  <p v-else>
                    NT$ {{ product.originPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                  </p>
                </td>
                <td class="py-5">x {{ product.qty }}</td>
                <td class="text-right pr-10 py-5">
                  <p v-if="product.price">
                    NT$
                    {{
                      (product.price * product.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }}
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
              <tr>
                <td class="w-[100px]"></td>
                <td class="py-5 border-black border-t-2 text-left" colspan="2">小計</td>
                <td class="pr-10 py-5 border-black border-t-2 text-right" colspan="2">
                  NT$ {{ order.totalPrice }}
                </td>
              </tr>
              <tr v-if="order.finalPrice !== 0">
                <td colspan="5" class="p-3 pl-10 py-5 text-xl">折抵明細</td>
              </tr>
              <tr v-if="order.couponDiscount != 0">
                <td class="w-[100px]"></td>
                <td class="py-5" colspan="2">優惠券折扣</td>
                <td class="pr-10 py-5 text-right" colspan="2">-0</td>
              </tr>
              <tr v-if="order.pointsDiscount != 0">
                <td class="w-[100px]"></td>
                <td class="border-black border-b-2 py-5" colspan="2">會員積分折抵</td>
                <td class="border-black border-b-2 text-right pr-10 py-5" colspan="2">
                  {{ order.pointsDiscount }}
                </td>
              </tr>
              <tr>
                <td class="font-bold px-10 py-5 text-2xl" colspan="3">訂單金額</td>
                <td class="font-bold text-right pr-10 py-5 text-2xl" colspan="2">
                  NT$ {{ order.finalPrice ? order.finalPrice : order.totalPrice }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 收件人資訊 & 付款方式 -->
        <VForm
          class="border border-t-0 w-[760px]"
          v-slot="{ errors }"
          @submit="onSubmit(recipient, parseInt(paymentType))"
        >
          <div class="h-[60px] bg-third rounded-[10px]">
            <h1 colspan="2" class="font-bold text-center leading-[60px] text-xl">收件人資訊</h1>
          </div>
          <div class="my-5 px-10">
            <div class="my-5">
              <label for="name">姓名：</label>
              <VField
                type="text"
                id="name"
                name="姓名"
                class="p-1.5 border rounded-md ml-5 py-1.5 pl-3 pr-20 placeholder:text-gray-400"
                placeholder="請輸入收件人姓名"
                v-model="order.recipient.name"
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
                class="p-1.5 border rounded-md ml-5 py-1.5 pl-3 pr-20 placeholder:text-gray-400"
                placeholder="請輸入收件人信箱"
                v-model="order.recipient.email"
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
                class="p-1.5 border rounded-md ml-5 py-1.5 pl-3 pr-20 placeholder:text-gray-400"
                placeholder="請輸入收件人電話"
                v-model="order.recipient.phone"
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
                class="border rounded-md ml-5 py-1.5 pl-3 w-[310px] h-[90px] placeholder:text-gray-400"
                placeholder="請輸入收件人地址"
                v-model="order.recipient.address"
                rules="required"
                :class="{ 'is-invalid': errors['地址'] }"
              ></VField>
              <error-message name="地址" class="invalid-feedback text-red-500 m-3"></error-message>
            </div>
          </div>
          <div class="h-[60px] bg-third rounded-[10px]">
            <h1 colspan="2" class="font-bold text-center leading-[60px] text-xl">付款方式</h1>
          </div>
          <div class="my-5 px-10">
            <VField
              type="radio"
              id="cash"
              name="付款方式"
              value="1"
              v-model="order.paymentType"
              rules="required"
              :class="{ 'is-invalid': errors['付款方式'] }"
            ></VField>
            <label class="ml-5" for="cash">現金付款</label><br />
            <VField
              type="radio"
              id="card"
              name="付款方式"
              value="2"
              v-model="order.paymentType"
              rules="required"
              :class="{ 'is-invalid': errors['付款方式'] }"
            ></VField>
            <label class="ml-5" for="card">信用卡付款</label><br />
            <error-message name="付款方式" class="invalid-feedback text-red-500"></error-message>
          </div>
          <div class="flex justify-end my-5 px-10">
            <button
              type="button"
              class="mx-3 w-[80px] h-[40px] bg-third rounded-md text-secondary"
              @click="router.push(`/admin/orders`)"
            >
              取消
            </button>
            <button type="submit" class="w-[80px] h-[40px] bg-secondary rounded-md text-primary">
              確認
            </button>
          </div>
        </VForm>
      </div>
    </div>
  </div>
  <OrderChangeModal
    ref="OrderChangeModalRef"
    :orderId="orderId"
    :order="order"
    @getOrder="getOrder"
  />
</template>
