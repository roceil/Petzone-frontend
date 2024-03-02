<script setup>
import { ref, onMounted } from 'vue'
import { post_post_api, put_post_api } from '@/api/community'
import { useCommunityStore } from '@/stores/community'
import { storeToRefs } from 'pinia'
import close from '@/assets/header/close-btn.svg'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

const communityStore = useCommunityStore()
const { tags, tagsOptions } = storeToRefs(communityStore)
onMounted(() => {
  if (!tags.value.length) {
    communityStore.getTags()
  }
})

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
  images.value = []
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
const images = ref([])
const fileInputRef = ref()
const chooseFile = () => {
  fileInputRef.value.click()
}
const handleFileChange = (e) => {
  images.value = [...e.target.files].map((item) => URL.createObjectURL(item))
}

// 發佈
const handleSend = async () => {
  if (postId.value) {
    const res = await put_post_api(postId.value, postData.value)
    if (res) {
      alert('編輯成功')
      emit('getPost')
    }
  } else {
    const res = await post_post_api(postData.value)
    if (res) {
      alert('新增成功')
      emit('getPosts')
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
            <button class="btn btn-primary" @click="chooseFile">選擇照片</button>
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
          <button class="px-8 btn btn-primary" @click="handleSend">發佈</button>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
<style scoped></style>
