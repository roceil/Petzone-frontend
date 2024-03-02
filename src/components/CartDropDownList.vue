<script setup>
import { fake_shopping_cart } from '@/constants'
import shopping_cart_icon from '@/assets/header/shopping-cart.svg'
import plus from '@/assets/header/plus-circle.svg'
import minus from '@/assets/header/minus-circle.svg'
</script>

<template>
  <div class="CartDropDownList flex justify-center">
    <div class="dropdown dropdown-end dropdown-hover">
      <RouterLink to="/ecommerce/cart">
        <img tabindex="0" :src="shopping_cart_icon" alt="shopping-cart-icon" />
      </RouterLink>
      <ul
        tabindex="0"
        class="dropdown-content z-[1] menu shadow bg-base-100 rounded min-w-[400px] border border-font text-font p-0 py-4"
      >
        <li
          class="flex flex-row items-center justify-between w-full flex-nowrap"
          v-for="item in fake_shopping_cart"
          :key="item.id"
        >
          <!-- 商品圖片 -->
          <div class="pr-0">
            <img :src="item.img" :alt="item.name" class="w-12 h-12 rounded" />
          </div>

          <!-- 商品名稱 -->
          <div class="min-w-[102px]">
            <p class="">{{ item.name }}</p>
          </div>

          <!-- 商品價格 -->
          <div class="">
            <p class="">NT$ {{ item.price }}</p>
          </div>

          <!-- 商品數量（組） -->
          <div class="flex min-w-[105px] justify-between">
            <button class="hover:opacity-80">
              <img :src="minus" alt="minus-btn" />
            </button>

            <p>{{ item.quantity }}</p>

            <button class="hover:opacity-80">
              <img :src="plus" alt="plus-btn" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
