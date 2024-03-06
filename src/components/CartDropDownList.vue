<script setup>
import { onMounted } from 'vue'
import { cartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import shopping_cart_icon from '@/assets/header/shopping-cart.svg'
// import plus from '@/assets/header/plus-circle.svg'
// import minus from '@/assets/header/minus-circle.svg'
// import { fake_shopping_cart } from '@/constants'

const cartHandler = cartStore()
const { cartList } = storeToRefs(cartHandler)

onMounted(() => {
  console.log(cartList.value)
})
</script>

<template>
  <div class="CartDropDownList flex justify-center">
    <div class="dropdown dropdown-end dropdown-hover">
      <div class="transform transition-transform hover:translate-y-1">
        <!-- 这里是你的内容 -->
        <RouterLink to="/ecommerce/cart">
          <img tabindex="0" :src="shopping_cart_icon" alt="shopping-cart-icon" />
        </RouterLink>
      </div>

      <div
        tabindex="0"
        class="dropdown-content z-[1] menu shadow bg-base-100 rounded min-w-[400px] border border-font text-font p-4"
        v-if="cartList.length"
      >
        <div
          class="flex flex-row items-center justify-between w-full flex-nowrap"
          v-for="item in cartList"
          :key="item.fake_shopping_cartid"
        >
          <!-- 商品圖片 -->
          <div class="m-2">
            <img :src="item.photos[0]" alt="商品首圖" class="w-12 h-12 rounded" />
          </div>

          <!-- 商品名稱 -->
          <div class="min-w-[102px]">
            <p class="">{{ item.name }}</p>
          </div>

          <!-- 商品價格 -->
          <div>
            <p v-if="!item.price">NT$ {{ item.originPrice }}</p>
            <p v-else>NT$ {{ item.price }}</p>
          </div>

          <!-- 商品數量（組） -->
          <div class="flex justify-between">
            <!-- <button class="hover:opacity-80" @click="cartHandler.removeOneFromCart(item._id)">
              <img :src="minus" alt="minus-btn" />
            </button> -->

            <p>{{ item.qty }} {{ item.unit }}</p>

            <!-- <button class="hover:opacity-80" @click="cartHandler.addToCart(item._id)">
              <img :src="plus" alt="plus-btn" />
            </button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
