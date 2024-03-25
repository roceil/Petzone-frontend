<script setup>
import { ref, onMounted } from 'vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import { get_products_api } from '@/api/ecommerceAdmin'
import { useRouter } from 'vue-router'

const products = ref([])
const productName = ref('')
const categoryName = ref('')
const isEnabled = ref('')
const pagination = ref({
  totalPage: 1,
  nowPage: 1
})

const changePage = (page) => {
  pagination.value.nowPage = page
  searchProducts()
}
const resetSearch = () => {
  productName.value = ''
  categoryName.value = ''
  isEnabled.value = ''
  pagination.value.nowPage = 1
  searchProducts()
}

const searchProducts = async () => {
  const params = {
    page: pagination.value.nowPage,
    name: productName.value || null,
    category: categoryName.value || null,
    isEnabled: isEnabled.value
  }
  const { data } = await get_products_api(params)
  if (data.message === '查無相關商品') {
    products.value = []
    pagination.value.totalPage = 0
  } else {
    products.value = data.data.products
    pagination.value.totalPage = data.pagination
  }
}

const router = useRouter()
const directToProductPage = (productId, mode) => {
  if (mode === 'check') {
    router.push({
      name: 'adminproduct',
      query: {
        productId
      }
    })
  } else if (mode === 'create') {
    router.push({
      name: 'adminproduct',
      query: { mode }
    })
  } else if (mode === 'edit') {
    router.push({
      name: 'adminproduct',
      query: { productId, mode }
    })
  }
}

onMounted(() => {
  searchProducts()
})
</script>

<template>
  <div class="ml-10 mt-10 col-span-10 text-font">
    <div>
      <!-- 頁面標題 -->
      <div class="flex justify-between">
        <h1 class="text-5xl font-bold">商品管理</h1>
        <button
          type="button"
          class="max-w-[125px] btn btn-secondary text-white"
          @click="directToProductPage(null, 'create')"
        >
          新增商品
        </button>
      </div>
      <!-- 搜尋、分類區塊 -->
      <div class="flex space-x-2 mt-4">
        <div class="flex items-center">
          <label for="name" class="mr-1 text-xl">商品名稱</label>
          <div class="relative">
            <input
              type="text"
              id="name"
              name="name"
              class="max-w-[150px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
              placeholder="請輸入商品名稱"
              v-model="productName"
            />
          </div>
        </div>
        <div class="flex items-center">
          <label for="category" class="mx-1 text-xl">商品類型</label>
          <select
            id="category"
            class="max-w-[200px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
            v-model="categoryName"
          >
            <option value="" disabled>請選擇商品類型</option>
            <option value="狗狗主食">狗狗主食</option>
            <option value="狗狗零食">狗狗零食</option>
            <option value="狗狗玩具與用品">狗狗玩具 & 用品</option>
            <option value="貓貓主食">貓貓主食</option>
            <option value="貓貓零食">貓貓零食</option>
            <option value="貓貓玩具與用品">貓貓玩具 & 用品</option>
            <option value="貓砂系列">貓砂系列</option>
            <option value="保健系列">保健系列</option>
            <option value="清潔系列">清潔系列</option>
            <option value="通用玩具與生活用品">通用生活用品 & 玩具</option>
          </select>
        </div>
        <div class="flex items-center">
          <label for="isEnabled" class="mx-1 text-xl">商品狀態</label>
          <select
            id="isEnabled"
            class="max-w-[150px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
            v-model="isEnabled"
          >
            <option value="" disabled>請選擇商品狀態</option>
            <option value="0">下架</option>
            <option value="1">上架</option>
          </select>
        </div>
      </div>
      <div class="flex space-x-2 justify-end">
        <button type="button" class="btn btn-sm mt-4" @click="resetSearch">清除</button>
        <button type="button" class="btn btn-sm mt-4" @click="searchProducts">搜尋</button>
      </div>

      <!-- 商品列表 -->
      <div class="mt-4 overflow-x-auto">
        <table class="table">
          <thead class="h-[60px] bg-third text-xl">
            <th class="rounded-l-[10px]">商品編號</th>
            <th>商品名稱</th>
            <th>商品類型</th>
            <th>價格</th>
            <th>庫存量</th>
            <th>狀態</th>
            <th class="rounded-r-[10px]">操作</th>
          </thead>
          <tbody class="rounded-[10px] shadow">
            <tr v-for="product in products" :key="product._id">
              <td># {{ product.productId }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.category.name }}</td>
              <td class="text-right">
                $ {{ product.price ? product.price : product.originPrice }}
              </td>
              <td class="text-center">{{ product.quantity }}</td>
              <td class="text-center">
                <p v-if="product.isEnabled">上架</p>
                <p class="text-gray-400" v-else>下架</p>
              </td>
              <td>
                <div
                  class="button-group flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2"
                >
                  <button
                    type="button"
                    class="btn btn-sm bg-gray-200 border-0 hover:bg-gray-300"
                    @click.prevent="directToProductPage(product._id, 'check')"
                  >
                    查看詳情
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm text-white bg-secondary hover:bg-font break-keep"
                    @click.stop="directToProductPage(product._id, 'edit')"
                  >
                    編輯商品
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PaginationComponent
        :totalPage="pagination.totalPage"
        :nowPage="pagination.nowPage"
        @changePage="changePage"
      />
    </div>
  </div>
</template>
