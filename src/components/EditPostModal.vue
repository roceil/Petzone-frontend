<script setup>
import { ref, computed } from 'vue'
import { post_post_api, put_post_api } from '@/api/community'
import { post_upload_images } from '@/api/products'
import { useCommunityStore } from '@/stores/community'
import { storeToRefs } from 'pinia'
import close from '@/assets/header/close-btn.svg'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import {useAlertStore} from '@/stores/alert'


const alertStore = useAlertStore()
const communityStore = useCommunityStore()
const { tagsOptions } = storeToRefs(communityStore)

const dialogRef = ref()
const showModal = (post) => {
  if (post) {
    const { _id, content, tags, photos } = post
    postId.value = _id
    postData.value = {
      content,
      tags,
      photos
    }
  }
  dialogRef.value.showModal()
}
const hideModal = () => {
  postId.value = null
  postData.value = {
    content: '',
    tags: [],
    photos: []
  }
  files.value = []
  dialogRef.value.close()
}

// postData
const postId = ref(null)
const postData = ref({
  content: '',
  tags: [],
  photos: []
})

// 選擇圖檔
const files = ref([])
const images = computed(() => {
  return files.value.map((item) => URL.createObjectURL(item))
})
const fileInputRef = ref()
const chooseFile = () => {
  fileInputRef.value.click()
}
const handleFileChange = (e) => {
  if (e.target.files.length > 3) {
    alertStore.openAlert('error', '圖片數量不可超過 3 張')
  } else {
    files.value = [...e.target.files]
  }
}

// 發佈
const handleSend = async () => {
  if (postId.value) {
    try {
      await put_post_api(postId.value, postData.value)
      alertStore.openAlert('success', '編輯成功')
      emit('getPost')
    } catch (error) {
      console.error(error)
    }
  } else {
    if (!files.value.length && !postData.value.photos.length) {
      alertStore.openAlert('error', '至少需上傳一張圖片')
      return
    }
    const formData = new FormData()
    files.value.forEach((item) => {
      formData.append('files', item)
    })
    try {
      const photos = await post_upload_images(formData)
      const data = {
        ...postData.value,
        photos
      }
      await post_post_api(data)
      alertStore.openAlert('success', '貼文發佈成功')
      emit('getPosts')
    } catch (error) {
      console.error(error)
    }
  }
  hideModal()
}

const emit = defineEmits(['getPost', 'getPosts'])
defineExpose({ showModal })
</script>
<template>
  <dialog ref="dialogRef" class="modal">
    <div class="relative items-center px-20 modal-box max-w-[90%]">
      <!-- 關閉按鈕 -->
      <div class="absolute right-[29px] top-[33px]">
        <button @click="hideModal"><img :src="close" alt="close-btn" /></button>
      </div>
      <!-- 標題 -->
      <h3 class="font-bold text-5xl text-font text-center mt-[46px]">
        {{ postId ? '編輯貼文' : '建立新貼文' }}
      </h3>
      <form class="mt-6 space-y-4" @submit.prevent>
        <div>
          <label for="tag">貼文 Tag</label>
          <select
            class="w-full mt-1 select select-bordered"
            name=""
            id="tag"
            v-model="postData.tags"
            multiple
            :disabled="postData.tags.length > 2"
          >
            <optgroup v-for="tagGroup in tagsOptions" :key="tagGroup.type" :label="tagGroup.type">
              <option v-for="name in tagGroup.name" :key="name" :value="name">{{ name }}</option>
            </optgroup>
          </select>
        </div>
        <div class="flex space-x-2">
          <div
            class="px-4 py-2 border rounded-full flex items-center space-x-1"
            v-for="(tag, index) in postData.tags"
            :key="tag"
          >
            <button @click="postData.tags.splice(index, 1)">
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
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
            <span>{{ tag }}</span>
          </div>
        </div>
        <template v-if="!postId">
          <Swiper
            class="w-full rounded-[10px] overflow-hidden"
            :navigation="true"
            :modules="[Navigation]"
          >
            <SwiperSlide v-for="(item, index) in images" :key="index">
              <img :src="item" class="w-full" />
            </SwiperSlide>
          </Swiper>
          <div class="flex items-center justify-between">
            <label>請從電腦中選擇圖檔</label>
            <button class="btn btn-secondary text-white" @click="chooseFile">選擇照片</button>
            <input
              class="hidden"
              ref="fileInputRef"
              type="file"
              multiple
              @change="handleFileChange"
            />
          </div>
        </template>
        <textarea
          class="w-full textarea textarea-bordered"
          rows="5"
          placeholder="請輸入有關此貼文的描述"
          v-model="postData.content"
        />
        <div class="text-end">
          <button class="px-8 btn btn-secondary text-white" @click="handleSend">發佈</button>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>


