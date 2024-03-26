<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { get_product_api, post_product_api, put_product_api } from '@/api/ecommerceAdmin'
import { upload_image_api } from '@/api/upload'
import { useAlertStore } from '@/stores/alert'
import { useLoadingStore } from '@/stores/loading'
import { storeToRefs } from 'pinia'
import EditReviewModal from '@/components/ReviewModal.vue'

const route = useRoute()
const router = useRouter()
const alertStore = useAlertStore()
const LoadingStore = useLoadingStore()
const { LoadingMode } = storeToRefs(LoadingStore)

const editMode = ref(false)
const productId = ref('')
const product = ref({
  name: '',
  category: { key: 0 },
  photos: [],
  originPrice: 0,
  price: 0,
  quantity: 0,
  unit: '',
  description: '',
  isEnabled: -1
})
const reviewModalRef = ref()

// 上傳圖片檔
const tempImgUrl = ref()
const uploadImage = async (e) => {
  LoadingMode.value = true
  const file = e.target.files[0]

  const res = await upload_image_api(file)
  addImage(res.imgUrl)
  LoadingMode.value = false
}
const addImage = (imgUrl) => {
  product.value.photos.push(imgUrl)
}
const removeImage = () => {
  product.value.photos.pop()
}

// 表單處理
const informMessage = ref('')
const checkInput = async () => {
  if (product.value.name === '') {
    informMessage.value = '請輸入商品名稱'
  } else if (product.value.category.key === 0) {
    informMessage.value = '商品類型必選擇'
  } else if (product.value.isEnabled === -1) {
    informMessage.value = '商品狀態必選擇'
  } else if (product.value.originPrice === 0 || product.value.originPrice === '') {
    informMessage.value = '請輸入商品原價'
  } else if (product.value.price === '') {
    informMessage.value = '請輸入商品特價，如無特價請輸入 0'
  } else if (product.value.quantity === '') {
    informMessage.value = '請輸入商品庫存量，如無庫存請輸入 0'
  } else if (product.value.unit === '') {
    informMessage.value = '請輸入商品單位'
  } else if (product.value.description === '') {
    informMessage.value = '請輸入商品描述'
  } else if (product.value.photos.length === 0) {
    informMessage.value = '請上傳至少一張照片'
  } else {
    informMessage.value = ''
    const productInfo = { ...product.value }
    productInfo.category = parseInt(product.value.category.key)
    let message
    if (route.query.mode === 'create') {
      const { data } = await post_product_api(productInfo)
      message = data.message
      if (message === '新增產品成功') {
        product.value = { category: { key: 0 }, isEnabled: -1, photos: [] }
        alertStore.openAlert('success', message)
      } else if (message !== '') {
        alertStore.openAlert('error', message)
      }
    } else if (route.query.mode === 'edit') {
      const { data } = await put_product_api(productId.value, productInfo)
      message = data.message
      if (message === '更新產品成功') {
        alertStore.openAlert('success', message)
      } else if (message !== '') {
        alertStore.openAlert('error', message)
      }
    }
  }
}

onMounted(async () => {
  if (route.query.mode === 'edit') {
    editMode.value = true
    productId.value = route.query.productId
    const { data } = await get_product_api(productId.value)
    product.value = data.product
  } else if (route.query.mode === 'create') {
    editMode.value = true
  } else {
    productId.value = route.query.productId
    const { data } = await get_product_api(productId.value)
    product.value = data.product
  }
})
</script>

<template>
  <div class="ml-10 mt-10 col-span-10 text-font">
    <!-- 頁面標題 -->
    <div class="flex justify-between">
      <h1 class="text-5xl font-bold">商品詳情</h1>
      <button
        type="button"
        class="max-w-[125px] btn bg-third border-0 hover:opacity-80 hover:bg-third"
        @click="reviewModalRef.showModal()"
        v-if="!editMode"
      >
        查看商品評論
      </button>
    </div>

    <!-- 商品資訊 -->
    <div class="max-w-[800px]">
      <div class="grid grid-cols-4 mt-10">
        <div class="col-span-2">
          <label for="name" class="block leading-6 text-xl">商品名稱</label>
          <input
            type="text"
            id="name"
            name="name"
            class="w-[350px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
            placeholder="請輸入商品名稱"
            v-model="product.name"
            :disabled="!editMode"
          />
        </div>
        <div>
          <label for="category" class="block leading-6 text-xl">商品類型</label>
          <select
            id="category"
            class="max-w-[150px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
            v-model="product.category.key"
            :disabled="!editMode"
          >
            <option value="0">請選擇商品類型</option>
            <option value="1">狗狗主食</option>
            <option value="2">狗狗零食</option>
            <option value="3">狗狗玩具 & 用品</option>
            <option value="4">貓貓主食</option>
            <option value="5">貓貓零食</option>
            <option value="6">貓貓玩具 & 用品</option>
            <option value="7">貓砂系列</option>
            <option value="8">保健系列</option>
            <option value="9">清潔系列</option>
            <option value="10">通用生活用品 & 玩具</option>
          </select>
        </div>
        <div>
          <label for="isEnabled" class="block leading-6 text-xl">商品狀態</label>
          <select
            id="isEnabled"
            class="w-[150px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
            v-model="product.isEnabled"
            :disabled="!editMode"
          >
            <option value="-1" disabled>請選擇商品狀態</option>
            <option value="false">下架</option>
            <option value="true">上架</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-4 mt-3">
        <div>
          <label for="originPrice" class="block leading-6 text-xl">商品原價</label>
          <div class="relative">
            <input
              type="number"
              id="originPrice"
              name="originPrice"
              class="max-w-[150px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
              placeholder="請輸入商品原價"
              v-model.number="product.originPrice"
              onkeyup="value=value.replace(/[^\d]/g,'')"
              :disabled="!editMode"
            />
          </div>
        </div>
        <div>
          <label for="price" class="block leading-6 text-xl">商品特價</label>
          <input
            type="number"
            id="price"
            name="price"
            class="max-w-[150px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
            placeholder="請輸入商品特價"
            v-model.number="product.price"
            onkeyup="value=value.replace(/[^\d]/g,'')"
            :disabled="!editMode"
          />
        </div>
        <div>
          <label for="quantity" class="block leading-6 text-xl">商品數量</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            class="max-w-[150px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
            placeholder="請輸入庫存量"
            v-model.number="product.quantity"
            onkeyup="value=value.replace(/[^\d]/g,'')"
            :disabled="!editMode"
          />
        </div>
        <div>
          <label for="unit" class="block leading-6 text-xl">商品單位</label>
          <input
            type="text"
            id="unit"
            name="unit"
            class="max-w-[150px] h-[48px] p py-1.5 pl-2 border rounded-md border-font focus:outline-none"
            placeholder="請輸入商品單位"
            v-model="product.unit"
            :disabled="!editMode"
          />
        </div>
      </div>
      <div class="mt-3">
        <label for="description" class="block leading-6 text-xl">商品描述</label>
        <textarea
          type="text"
          id="description"
          name="description"
          class="w-[680px] h-[100px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
          placeholder="請輸入商品描述"
          v-model="product.description"
          :disabled="!editMode"
        ></textarea>
      </div>

      <!-- 商品圖片 -->
      <div class="my-1.5" v-if="editMode">
        <label for="photo" class="block leading-6 text-xl">商品圖片</label>
        <input
          type="text"
          id="photo"
          name="photo"
          class="max-w-[400px] h-[48px] mpy-1.5 pl-2 border rounded-md border-font focus:outline-none"
          placeholder="請輸入照片連結或選擇圖檔"
          v-model="tempImgUrl"
        />
        <button
          type="button"
          class="mx-8 btn btn-secondary text-white"
          @click.prevent="addImage(tempImgUrl)"
          :disabled="!tempImgUrl"
        >
          新增照片
        </button>
        <label for="fileInput" class="btn btn-secondary text-white">請選擇圖檔</label>
        <input type="file" id="fileInput" class="hidden" @change="uploadImage($event)" />
      </div>
      <div class="flex my-1.5">
        <div class="w-[150px] h-[100px] mr-6 relative" v-for="img in product.photos" :key="img">
          <img :src="img" alt="商品圖" class="w-[150px] h-[100px] rounded-[10px] object-cover" />
          <button
            type="button"
            class="w-[24px] h-[24px] absolute top-0 right-2"
            @click.prevent="removeImage"
            v-if="editMode"
          >
            <img src="../../assets/ecommerce/delete-button.svg" alt="刪除按鈕" />
          </button>
        </div>
      </div>
      <span class="flex justify-end text-red-400" v-if="informMessage">{{ informMessage }}</span>
      <div class="flex justify-end mt-3" v-if="editMode">
        <button
          type="button"
          class="mx-4 max-w-[125px] btn bg-third border-0 hover:opacity-80 hover:bg-third"
          @click="router.push(`/admin/products`)"
        >
          取消
        </button>
        <button
          type="button"
          class="max-w-[125px] btn btn-secondary text-white"
          @click.prevent="checkInput"
        >
          確認
        </button>
      </div>
    </div>
  </div>
  <EditReviewModal ref="reviewModalRef" :productId="productId" />
</template>
