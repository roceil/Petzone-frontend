<script setup>
import { Vue3Marquee } from 'vue3-marquee'

defineProps({
  suggestProductList: {
    type: Array,
    required: true
  },
  direction: {
    type: String,
    default: 'normal'
  }
})
</script>

<template>
  <div class="VueMarquee">
    <Vue3Marquee pause-on-hover :clone="true" :duration="30" :direction="direction">
      <RouterLink
        :to="`/ecommerce/product?productId=${product._id}`"
        v-for="product in suggestProductList"
        :key="product._id"
        class="relative"
      >
        <img
          :src="product.photos[0]"
          :alt="product.name"
          class="w-[250px] h-[188px] object-cover mr-5 rounded-[10px]"
        />

        <div
          class="hover:opacity-100 opacity-0 absolute bottom-0 left-0 w-full h-full backdrop-blur-sm bg-white/30 rounded-[10px] flex justify-center items-center font-semibold text-2xl text-black duration-300 ease-in-out"
        >
          <p class="group-hover:block">{{ product.name }}</p>
        </div>
      </RouterLink>
    </Vue3Marquee>
  </div>
</template>
