<script setup>
import { ref } from 'vue'
import close from '@/assets/header/close-btn.svg'

const props = defineProps({
  type: String
})

const dialogRef = ref()
const showModal = () => {
  dialogRef.value.showModal()
}
const hideModal = () => {
  dialogRef.value.close()
}

const fileInputRef = ref()
const chooseFile = () => {
  fileInputRef.value.click()
}

defineExpose({ showModal })
</script>
<template>
  <dialog ref="dialogRef" class="modal">
    <div class="relative items-center px-20 modal-box">
      <!-- 關閉按鈕 -->
      <div class="absolute right-[29px] top-[33px]">
        <button @click="hideModal"><img :src="close" alt="close-btn" /></button>
      </div>
      <!-- 標題 -->
      <h3 class="font-bold text-5xl text-font text-center mt-[46px]">
        {{ props.type === 'edit' ? '編輯貼文' : '建立新貼文' }}
      </h3>
      <form class="mt-6 space-y-4" @submit.prevent>
        <div>
          <label for="tag">貼文 Tag</label>
          <select class="w-full mt-1 select select-bordered" name="" id="tag">
            <option disabled selected>請選擇貼文 Tag</option>
            <option v-for="item in 5" :key="item" value="item">柴犬</option>
          </select>
        </div>
        <div class="flex space-x-2">
          <div class="px-4 py-2 border rounded-full" v-for="(item, index) in 2" :key="index">
            柴犬
          </div>
        </div>
        <template v-if="props.type === 'new'">
          <div class="w-full h-full aspect-square bg-third rounded-[10px]"></div>
          <div class="flex items-center justify-between">
            <label>請從電腦中選擇圖檔</label>
            <button class="btn btn-primary" @click="chooseFile">選擇照片</button>
            <input class="hidden" ref="fileInputRef" type="file" />
          </div>
        </template>
        <textarea
          class="w-full textarea textarea-bordered"
          rows="5"
          placeholder="請輸入有關此貼文的描述"
        />
        <div class="text-end">
          <button class="px-8 btn btn-primary">發佈</button>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
<style scoped></style>
