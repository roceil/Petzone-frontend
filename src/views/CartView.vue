<script setup>
import { ref, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { cartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import LoginAlertModal from '@/components/LoginAlertModal.vue'
import { get_member_data_api } from '@/api/user'

const router = useRouter()

const cartHandler = cartStore()
const { cartList, totalPrice, usePoints, finalPrice } = storeToRefs(cartHandler)

const userStore = useUserStore()
const { userId } = storeToRefs(userStore)

const loginAlertModalRef = ref()
const userPoints = ref(0)
const informMessage = ref('')
const check = ref(true)

// 確認積分
const checkInput = () => {
  if (usePoints.value > userPoints.value) {
    informMessage.value = '欲使用積分不可大於可使用積分'
    check.value = false
  } else if (usePoints.value % 10 !== 0) {
    informMessage.value = '10點折抵1元，請輸入10的倍數'
    check.value = false
  } else {
    informMessage.value = ''
    finalPrice.value = totalPrice.value - usePoints.value / 10
    check.value = true
  }
}

watch(userId, async (newUserId) => {
  if (userId.value !== undefined && newUserId !== '') {
    const userInfo = await get_member_data_api(newUserId)
    userPoints.value = userInfo.points
  }
})

watch(totalPrice, async (newTotalPrice) => {
  if (newTotalPrice === 0) {
    check.value = false
  } else {
    check.value = true
  }
})

onMounted(async () => {
  //確認用戶是否已登入
  if (!userId.value) {
    // 未登入導向登入
    loginAlertModalRef.value.showModal()
  } else {
    // 已登入取得會員購物車及積分資料
    const userInfo = await get_member_data_api()
    userPoints.value = userInfo.points
  }

  // 清空使用積分及最終價格
  usePoints.value = 0
  finalPrice.value = 0

  if (totalPrice.value === 0) {
    check.value = false
  }
})
</script>

<template>
  <!-- 頁面標題 -->
  <div class="container mt-10 text-font">
    <h1 class="text-xl font-bold md:text-5xl">你的購物車</h1>
  </div>

  <div class="container my-10 text-font md:flex md:justify-center" v-if="cartList.length !== 0">
    <!-- 購買商品明細 -->
    <table class="border border-separate border-spacing-0 rounded-[10px] shadow mb-10 md:mr-10">
      <thead class="h-[60px] bg-third md:text-xl">
        <th class="p-3 text-left rounded-tl-[10px]">購買商品</th>
        <th class="p-3">售價</th>
        <th class="p-3">數量</th>
        <th colspan="2" class="p-3 text-right rounded-tr-[10px]">金額</th>
      </thead>
      <tbody class="rounded-b-[10px] text-xs md:text-base">
        <tr v-for="product in cartList" :key="product._id">
          <td class="p-3">
            <div class="flex items-center">
              <img
                class="mr-3 w-[50px] h-[50px] rounded-[10px] object-cover md:w-[100px] md:h-[100px]"
                :src="product.photos[0]"
                alt="產品圖"
              />
              <p>{{ product.name }}</p>
            </div>
          </td>
          <td class="p-3 text-right">
            <p v-if="product.price">
              $ {{ product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
            </p>
            <p v-else>
              $ {{ product.originPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
            </p>
          </td>
          <td class="p-3">
            <div class="flex justify-center">
              <input
                id="number-input"
                type="number"
                class="block w-[40px] h-[30px] border rounded-lg bg-gray-50 text-center md:w-[60px] md:h-[30px]"
                placeholder="1"
                min="1"
                step="1"
                required
                v-model.number="product.qty"
                onkeyup="value=value.replace(/^0+|[^\d]/g,'')"
                @change="
                  (e) => {
                    cartHandler.updateCart(product._id, e.target.value)
                  }
                "
              />
            </div>
          </td>
          <td class="p-3">
            <div class="flex justify-end">
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
              <button
                type="button"
                class="w-[16px] h-[16px] md:w-[24px] md:h-[24px]"
                @click="cartHandler.deleteFromCart(product._id)"
              >
                <img src="../assets/ecommerce/delete-button.svg" alt="刪除按鈕" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 訂單摘要 -->
    <div>
      <table class="max-w-[375px] border border-separate border-spacing-0 rounded-[10px] shadow">
        <thead class="h-[60px] bg-third text-center md:text-2xl">
          <th class="rounded-t-[10px]" colspan="2">訂單摘要</th>
        </thead>
        <tbody class="rounded-b-[10px] text-xs">
          <tr class="h-[60px]">
            <td class="p-3 text-base font-bold md:text-2xl">商品總計</td>
            <td class="p-3 text-right md:text-base">
              NT$ {{ totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
            </td>
          </tr>
          <!-- <tr class="h-[60px]">
            <td class="p-3 text-xs font-bold md:text-base">使用優惠代碼</td>
            <td>
              <div class="p-3 flex justify-end">
                <input
                  id="coupon-input"
                  type="text"
                  class="block w-[120px] h-[30px] bg-gray-50 border rounded-l-[6px] text-font text-center md:text-base"
                  placeholder="請輸入優惠代碼"
                />
                <button
                  type="button"
                  class="w-[50px] h-[30px] bg-secondary rounded-r-[6px] text-primary md:text-base"
                >
                  確認
                </button>
              </div>
            </td>
          </tr> -->
          <tr class="h-[60px]" v-if="userId">
            <td colspan="2" class="p-3 text-right md:text-base">可使用積分: {{ userPoints }} 點</td>
          </tr>
          <tr class="h-[60px]" v-if="userId">
            <td class="p-3 text-xs font-bold md:text-base">使用會員積分折抵</td>
            <td class="p-3 flex justify-end md:text-base">
              <input
                id="point-input"
                type="number"
                class="p-3 block w-[80px] h-[35px] bg-gray-50 border rounded-lg text-font text-center"
                placeholder="0"
                min="0"
                :max="userPoints"
                v-model="usePoints"
                onkeyup="value=value.replace(/[^\d]/g,'')"
                @change="checkInput()"
              />
            </td>
          </tr>
          <tr v-if="informMessage">
            <td colspan="2" class="p-3 text-right text-red-400">{{ informMessage }}</td>
          </tr>
          <tr>
            <td colspan="2" class="border-b-2"></td>
          </tr>
          <!-- <tr class="h-[60px]">
            <td class="p-3 md:text-sm">優惠券折扣</td>
            <td class="p-3 text-right md:text-sm">0</td>
          </tr> -->
          <tr class="h-[60px]" v-if="userId">
            <td class="p-3 md:text-sm">會員積分折抵</td>
            <td class="p-3 text-right md:text-sm">{{ -usePoints / 10 }}</td>
          </tr>
          <tr class="h-[60px]">
            <td colspan="2" class="p-3 text-right text-base font-bold md:text-2xl">
              NT$
              {{
                finalPrice
                  ? finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }}
            </td>
          </tr>
          <tr class="h-[60px]">
            <td colspan="2" class="p-3 text-end">
              <button
                type="button"
                class="w-[80px] h-[40px] bg-secondary rounded-md text-primary md:text-base"
                @click="router.push(`/ecommerce/checkout`)"
                :disabled="check === false"
              >
                來去結帳
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="mt-10 text-font font-bold text-center md:text-2xl" v-else>購物車內無產品</div>
  <LoginAlertModal ref="loginAlertModalRef" />
</template>
