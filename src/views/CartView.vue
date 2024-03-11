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
const checkPoint = ref(true)

const checkInput = () => {
  if (usePoints.value < 0) {
    informMessage.value = '欲使用積分不可為負數'
    checkPoint.value = false
  } else if (usePoints.value > userPoints.value) {
    informMessage.value = '欲使用積分不可大於可使用積分'
    checkPoint.value = false
  } else if (usePoints.value % 10 !== 0) {
    informMessage.value = '10點折抵1元，請輸入10的倍數'
    checkPoint.value = false
  } else {
    informMessage.value = ''
    finalPrice.value = totalPrice.value - usePoints.value / 10
    checkPoint.value = true
  }
}

watch(userId, async (newUserId) => {
  // console.log(newUserId)
  const userInfo = await get_member_data_api(newUserId)
  // console.log(userInfo)
  userPoints.value = userInfo.points
})

onMounted(async () => {
  //確認用戶是否已登入
  if (!userId.value) {
    // 未登入導向登入
    loginAlertModalRef.value.showModal()
  } else {
    // 已登入取得會員購物車及積分資料
    const userInfo = await get_member_data_api()
    // console.log(userInfo)
    userPoints.value = userInfo.points
  }

  // 清空使用積分及最終價格
  usePoints.value = 0
  finalPrice.value = 0
})
</script>

<template>
  <!-- 頁面標題 -->
  <div class="container mt-10 text-font relative">
    <h1 class="text-xl font-bold md:mx-10 md:text-5xl">你的購物車</h1>
  </div>
  <div class="container text-font" v-if="cartList.length !== 0">
    <!-- 購買商品明細 -->
    <div class="mt-10">
      <table>
        <thead class="h-[60px] bg-third md:text-xl">
          <th class="rounded-l-[10px] text-left px-10">購買商品</th>
          <th class="px-2 md:px-10">售價</th>
          <th class="px-2 md:px-10">數量</th>
          <th colspan="2" class="rounded-r-[10px] text-left px-4 md:px-10">金額</th>
        </thead>
        <tbody class="rounded-[10px] shadow text-xs md:text-base">
          <tr class="md:p-4" v-for="product in cartList" :key="product._id">
            <td>
              <div class="flex items-center gap-4 m-2 md:mx-8 md:my-4">
                <img
                  class="w-[50px] h-[50px] rounded-[10px] object-cover md:w-[100px] md:h-[100px]"
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
                  class="block w-[40px] h-[30px] border rounded-lg bg-gray-50 text-center md:w-[60px] md:h-[30px]"
                  placeholder="1"
                  min="0"
                  required
                  v-model="product.qty"
                  @change="
                    (e) => {
                      cartHandler.updateCart(product._id, e.target.value)
                    }
                  "
                />
              </div>
            </td>
            <td class="rounded-r-[10px]">
              <div class="flex justify-center">
                <p v-if="product.price">NT$ {{ product.price * product.qty }}</p>
                <p v-else>NT$ {{ product.originPrice * product.qty }}</p>
              </div>
            </td>
            <td>
              <button
                type="button"
                class="w-[16px] h-[16px] md:w-[24px] md:h-[24px]"
                @click="cartHandler.deleteFromCart(product._id)"
              >
                <img src="../assets/ecommerce/delete-button.svg" alt="刪除按鈕" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 訂單摘要 -->
    <table class="max-w-[350px] mt-6 text-font md:absolute md:top-[30%] md:left-[70%]">
      <thead class="h-[60px] bg-third text-center md:text-2xl">
        <th class="rounded-[10px]" colspan="2">訂單摘要</th>
      </thead>
      <tbody class="rounded-[10px] shadow text-xs">
        <tr>
          <td class="text-base font-bold pl-6 py-3 md:text-2xl">商品總計</td>
          <td class="text-right pr-6 py-3 md:text-base">NT$ {{ totalPrice }}</td>
        </tr>
        <tr>
          <td class="font-bold pl-6 py-3 md:text-base">使用優惠代碼</td>
          <td>
            <div class="flex justify-end pr-6 py-3">
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
        </tr>
        <tr v-if="userId">
          <td colspan="2" class="text-right pr-6 py-3 md:text-base">
            可使用積分: {{ userPoints }} 點
          </td>
        </tr>
        <tr v-if="userId">
          <td class="text-xs font-bold pl-6 py-3 md:text-base">使用會員積分折抵</td>
          <td class="flex justify-end pr-6 py-3">
            <input
              id="point-input"
              type="number"
              class="block w-[80px] h-[30px] bg-gray-50 border rounded-lg text-font text-center md:text-base"
              placeholder="0"
              min="0"
              :max="userPoints"
              v-model="usePoints"
              @change="checkInput()"
            />
          </td>
          <span class="text-red-400" v-if="informMessage">{{ informMessage }}</span>
        </tr>
        <tr class="border-t-2">
          <td class="pl-6 pt-6 md:text-sm">優惠券折扣</td>
          <td class="text-right pr-6 pt-3 md:text-sm">-0</td>
        </tr>
        <tr v-if="userId">
          <td class="pl-6 md:text-sm">會員積分折抵</td>
          <td class="text-right pr-6 md:text-sm">{{ -usePoints / 10 }}</td>
        </tr>
        <tr>
          <td colspan="2" class="text-right text-base font-bold pr-6 py-3 md:text-2xl">
            NT$ {{ finalPrice ? finalPrice : totalPrice }}
          </td>
        </tr>
        <tr>
          <td colspan="2" class="text-right pr-6 py-3">
            <button
              type="button"
              class="w-[80px] h-[40px] bg-secondary rounded-md text-primary md:text-base"
              @click="router.push(`/ecommerce/checkout`)"
              :disabled="checkPoint === false"
            >
              來去結帳
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="text-font text-2xl font-bold text-center" v-else>購物車內無產品</div>
  <LoginAlertModal ref="loginAlertModalRef"></LoginAlertModal>
</template>
