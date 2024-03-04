<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
import {
  get_post_api,
  delete_post_api,
  post_post_like_api,
  put_post_like_api,
  post_post_comment_api,
  delete_post_comment_api
} from '@/api/community'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import EditPostModal from '@/components/EditPostModal.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { userId } = storeToRefs(userStore)

const post = ref(null)
const getPost = async () => {
  const res = await get_post_api(route.params.id)
  post.value = res.data
}
onMounted(async () => {
  if (!userId.value) {
    await userStore.getUserId()
  }
  await getPost()
})

// 刪除貼文
const deletePost = async () => {
  const res = await delete_post_api(route.params.id)
  if (res) {
    alert('刪除成功')
    router.push('/community')
  }
}

// 點讚
const isLiked = computed(() => {
  const like = post.value.likes.find((item) => item.userId === userId.value)
  return like && like.isLiked ? true : false
})
const handleClickLike = async () => {
  const like = post.value.likes.find((item) => item.userId === userId.value)
  if (!like) {
    const res = await post_post_like_api(post.value._id)
    if (res) {
      getPost()
    }
  } else {
    const data = {
      isLiked: !isLiked.value
    }
    const res = await put_post_like_api(post.value._id, data)
    if (res) {
      getPost()
    }
  }
}

// 留言
const commentTextareaRef = ref()
const commentData = ref({
  content: ''
})
const createComment = async () => {
  const res = await post_post_comment_api(post.value._id, commentData.value)
  if (res) {
    alert('留言成功')
    commentData.value = {
      content: ''
    }
    getPost()
  }
}
const deleteComment = async (commentId) => {
  const params = {
    postId: post.value._id,
    commentId
  }
  const res = await delete_post_comment_api(params)
  if (res) {
    alert('刪除留言成功')
    getPost()
  }
}

const editPostModalRef = ref()
</script>
<template>
  <div class="CommunityDetail text-font" v-if="post">
    <section class="container flex flex-col justify-center my-10 max-w-[800px] space-y-4">
      <div class="p-10">
        <div class="flex items-center mb-4 space-x-4">
          <div class="h-[80px] w-[80px] bg-third rounded-full overflow-hidden">
            <img :src="post.user.photo" alt="" class="w-full h-full object-cover"/>
          </div>
          <span>{{ post.user.nickName }}</span>
          <span>於 {{ dayjs(post.createAt).format('YYYY/MM/DD') }} 分享</span>
        </div>
        <div class="mb-4 space-x-2 text-end" v-if="userId === post.user._id">
          <button class="link" @click="editPostModalRef.showModal(post)">編輯</button>
          <button class="link" @click="deletePost">刪除</button>
        </div>
        <Swiper
          class="w-full rounded-[10px] overflow-hidden"
          :navigation="true"
          :modules="[Navigation]"
        >
          <SwiperSlide v-for="(item, index) in post.photos" :key="index">
            <div class="rounded-[10px] bg-third group overflow-hidden">
              <img class="w-full" :src="item" alt="" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div>
        {{ post.content }}
      </div>
      <div class="flex items-center justify-between pb-4 border-b">
        <div class="flex items-center space-x-4">
          <button class="flex space-x-1" @click="handleClickLike">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              v-if="!isLiked"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
              v-else
            >
              <path
                d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
              />
            </svg>

            <span>{{ post.likes.length }} 個喜愛</span>
          </button>
          <button @click="commentTextareaRef.focus()">
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
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
          </button>
        </div>
        <div class="flex space-x-2">
          <div class="px-4 py-2 border rounded-full" v-for="(tag, index) in post.tags" :key="index">
            {{ tag }}
          </div>
        </div>
      </div>
      <div class="py-4 space-y-8">
        <div
          class="flex justify-between items-center"
          v-for="comment in post.comments"
          :key="comment._id"
        >
          <div class="flex items-center space-x-4">
            <div class="w-[48px] h-[48px] rounded-full bg-third overflow-hidden">
              <img :src="comment.user.photo" alt="" />
            </div>
            <span>{{ comment.user.nickName }}</span>
            <p>{{ comment.content }}</p>
          </div>
          <div class="space-x-4" v-if="comment.user._id === userId">
            <button class="link" @click="deleteComment(comment._id)">刪除</button>
          </div>
        </div>
        <div class="space-y-4">
          <textarea
            ref="commentTextareaRef"
            class="rounded-[10px] border w-full p-4"
            rows="5"
            placeholder="請輸入留言"
            v-model="commentData.content"
          ></textarea>
          <div class="text-end">
            <button class="px-8 btn btn-primary" @click="createComment">留言</button>
          </div>
        </div>
      </div>
    </section>
    <EditPostModal ref="editPostModalRef" @getPost="getPost" />
  </div>
</template>
<style></style>
