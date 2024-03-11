<script setup></script>
<template>
  <div class="flex justify-center col-span-10 text-font">
    <div>
      <!-- 頁面標題 -->
      <div class="flex justify-between mt-10">
        <h1 class="text-5xl font-bold">商品詳情</h1>
        <button class="max-w-[125px] btn bg-third border-0 hover:opacity-80 hover:bg-third">
          查看商品評論
        </button>
      </div>

      <!-- 商品資訊 -->
      <div class="grid grid-cols-4 mt-6">
        <div class="col-span-2">
          <label for="name" class="block leading-6 text-xl">商品名稱</label>
          <input
            type="text"
            id="name"
            name="name"
            class="w-[330px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
            placeholder="請輸入商品名稱"
          />
        </div>
        <div>
          <label for="category" class="block leading-6 text-xl">商品類型</label>
          <select
            id="category"
            class="max-w-[150px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
          >
            <option disabled>請選擇商品類型</option>
            <option value="1">狗狗主食</option>
            <option value="2">狗狗零食</option>
            <option value="3">貓貓主食</option>
            <option value="4">貓貓零食</option>
            <option value="5">貓砂系列</option>
            <option value="6">保健系列</option>
            <option value="7">沐浴 & 清潔</option>
            <option value="8">生活用品 & 玩具</option>
          </select>
        </div>
        <div>
          <label for="isEnabled" class="block leading-6 text-xl">商品狀態</label>
          <select
            id="isEnabled"
            class="max-w-[150px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
          >
            <option disabled>請選擇商品狀態</option>
            <option value="0">下架</option>
            <option value="1">上架</option>
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
        ></textarea>
      </div>

      <!-- 商品圖片 -->
      <div class="my-3">
        <label for="photo" class="block leading-6 text-xl">商品圖片</label>
        <input
          type="text"
          id="photo"
          name="photo"
          class="max-w-[400px] h-[48px] mpy-1.5 pl-2 border rounded-md border-font focus:outline-none"
          placeholder="請輸入照片連結或選擇圖檔"
        />
        <button class="mx-8 btn btn-secondary text-white">新增照片</button>
        <input type="file" id="fileInput" class="hidden" />
        <label for="fileInput" class="btn btn-secondary text-white">請選擇圖檔</label>
      </div>
      <div class="flex">
        <div class="w-[150px] h-[100px] mr-6 relative" v-for="img in 4" :key="img">
          <img class="w-[150px] h-[100px] rounded-[10px] object-cover bg-slate-500" alt="商品圖" />
          <button type="button" class="w-[24px] h-[24px] absolute top-0 right-2">
            <img src="../../assets/ecommerce/delete-button.svg" alt="刪除按鈕" />
          </button>
        </div>
      </div>
      <div class="flex justify-end mt-3">
        <button class="mx-4 max-w-[125px] btn bg-third border-0 hover:opacity-80 hover:bg-third">
          取消
        </button>
        <button class="max-w-[125px] btn btn-secondary text-white">確認</button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
