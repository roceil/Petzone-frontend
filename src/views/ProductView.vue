<script setup>
import { ref, onMounted } from 'vue'
// import { productStore } from '@/stores/product'
// import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

// const productHandler = productStore()
// const { product } = storeToRefs(productHandler)
const route = useRoute()

const productReview = ref([
  {
    username: '拉拉熊',
    score: 5,
    content:
      '這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容',
    createAt: '2024/01/01'
  },
  {
    username: '拉拉熊1',
    score: 1,
    content:
      '這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容',
    createAt: '2024/01/01'
  }
])

onMounted(() => {
  console.log(route.query)
})
</script>

<template>
  <div class="container text-font">
    <div class="grid grid-cols-2 m-6">
      <!-- 商品圖片 -->
      <!-- <div class="m-auto">
        <div class="carousel w-[660px] h-[400px] rounded-[10px]">
          <div class="carousel-item relative w-full">
            <img class="w-full" src="" alt="" />
            <div
              class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
            >
              <button type="button" class="btn border-0 text-2xl">❮</button>
              <button type="button" class="btn border-0 text-2xl">❯</button>
            </div>
          </div>
        </div>
        <div class="flex justify-between">
          <img class="w-[150px] h-[100px] rounded-[10px] object-fill" src="" alt="" />
        </div>
      </div> -->

      <!-- 商品資訊 -->
      <!-- <div class="w-[420px] m-auto">
        <p class="mt-16 text-5xl font-bold">商品名稱</p>
        <P class="my-4 text-2xl text-secondary"
          >這是商品描述這是商品描述這是商品描述這是商品描述這是商品描述這是商品描述這是商品描述這是商品描述這是商品描述</P
        >
        <div class="flex justify-between px-2 text-2xl">
          <p>庫存量： 10 個</p>
          <p>$ 40 / $38.95</p>
        </div>
        <div class="flex justify-around mt-24">
          <button
            class="btn w-[168px] h-[48px] rounded-md border-font border-2 hover:opacity-80 hover:-translate-y-1"
          >
            <p class="font-semibold">加入購物車</p>
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.5 3H5.5L5.9 5M7.5 13H17.5L21.5 5H5.9M7.5 13L5.9 5M7.5 13L5.20711 15.2929C4.57714 15.9229 5.02331 17 5.91421 17H17.5M17.5 17C16.3954 17 15.5 17.8954 15.5 19C15.5 20.1046 16.3954 21 17.5 21C18.6046 21 19.5 20.1046 19.5 19C19.5 17.8954 18.6046 17 17.5 17ZM9.5 19C9.5 20.1046 8.60457 21 7.5 21C6.39543 21 5.5 20.1046 5.5 19C5.5 17.8954 6.39543 17 7.5 17C8.60457 17 9.5 17.8954 9.5 19Z"
                stroke="#415656"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            class="btn w-[168px] h-[48px] rounded-md border-font border-2 hover:opacity-80 hover:-translate-y-1"
          >
            <p class="font-semibold">直接購買</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </button>
        </div>
      </div> -->
    </div>

    <!-- 推薦商品 -->
    <p class="mx-6 text-2xl font-bold">你也許也會喜歡...</p>
    <div class="grid grid-cols-4 m-6">
      <div class="w-[300px]">
        <button type="button">
          <img class="w-[300px] h-[175px] rounded-[10px] object-fill" src="" alt="" />
        </button>
        <div class="flex justify-between py-[21px] px-[7.5px] text-2xl">
          <p>商品名稱</p>
          <p><del>$40</del> / $38.95</p>
        </div>
      </div>
    </div>
    <!-- 商品評論 -->
    <p class="mx-6 text-2xl font-bold">商品評論</p>
    <div class="m-6 grid place-content-center">
      <div class="w-[1060px] m-6 flex" v-for="review in productReview" :key="review.username">
        <div class="w-2/12">
          <img
            class="w-[150px] h-[150px] rounded-full object-fill"
            src="https://picsum.photos/id/235/200/300"
            alt=""
          />
        </div>
        <div class="w-10/12">
          <div class="flex m-4">
            <p>{{ review.username }}</p>
            <p class="mx-2">於{{ review.createAt }}評價</p>
            <div class="rating mx-2">
              <input
                type="radio"
                class="mask mask-star-2 bg-yellow-400"
                :checked="index === review.score"
                v-for="index in 5"
                :key="index"
              />
            </div>
          </div>
          <textarea
            class="w-10/12 p-4 border rounded-[10px] resize-none outline-none"
            v-model="review.content"
            readonly
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
