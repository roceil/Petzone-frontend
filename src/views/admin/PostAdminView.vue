<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
import {
  get_post_api_admin,
  delete_post_api_admin,
  delete_post_comment_api_admin
} from '@/api/community'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { useAlertStore } from '@/stores/alert'
import LikesModal from '@/components/LikesModal.vue'

const alertStore = useAlertStore()
const route = useRoute()
const router = useRouter()

const post = ref(null)
const getPost = async () => {
  const res = await get_post_api_admin(route.params.id)
  post.value = res.data
}
onMounted(async () => {
  await getPost()
})

// 刪除貼文
const deletePost = async () => {
  try {
    await delete_post_api_admin(route.params.id)
    alertStore.openAlert('success', '刪除成功')
    router.push(`/admin/posts`)
  } catch (error) {
    console.error(error)
  }
}

// 刪除留言
const deleteComment = async (commentId) => {
  const params = {
    postId: post.value._id,
    commentId
  }
  try {
    await delete_post_comment_api_admin(params)
    alertStore.openAlert('success', '刪除留言成功')
    getPost()
  } catch (error) {
    console.error(error)
  }
}

const goUserPage = (id) => {
  router.push(`/admin/accountdetails/${id}`)
}

const likesModalRef = ref()
</script>

<template>
  <div class="ml-10 my-10 col-span-10 text-font">
    <!-- 頁面標題 -->
    <div class="flex justify-between">
      <h1 class="text-5xl font-bold">貼文詳情</h1>
    </div>
    <!-- 內容 -->
    <div class="CommunityDetail text-font" v-if="post">
      <section class="container flex flex-col justify-center my-10 max-w-[800px] space-y-4">
        <div class="md:p-10">
          <div class="flex items-center mb-4 space-x-4">
            <button
              type="button"
              class="h-[80px] w-[80px] bg-third rounded-full overflow-hidden"
              @click="goUserPage(post.user._id)"
            >
              <img :src="post.user.photo" alt="用戶圖片" class="w-full h-full object-cover" />
            </button>
            <button type="button" @click="goUserPage(post.user._id)">
              {{ post.user.nickName }}
            </button>
            <span>於 {{ dayjs(post.createAt).format('YYYY/MM/DD') }} 分享</span>
          </div>
          <div class="mb-4 space-x-2 text-end">
            <button type="button" class="link" @click="deletePost">刪除</button>
          </div>
          <Swiper
            class="w-full rounded-[10px] overflow-hidden"
            :navigation="true"
            :modules="[Navigation]"
          >
            <SwiperSlide v-for="(item, index) in post.photos" :key="index">
              <div class="rounded-[10px] bg-third group overflow-hidden">
                <img class="w-full" :src="item" alt="商品圖片" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div>
          {{ post.content }}
        </div>
        <div class="flex items-center justify-between pb-4">
          <div class="flex items-center space-x-4">
            <button
              type="button"
              class="flex space-x-1"
              @click="likesModalRef.showModal(post.likes)"
            >
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
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              <span>{{ post.likes.length }} 個喜愛</span>
            </button>
            <span>
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
            </span>
          </div>
          <div class="flex space-x-2 ml-4">
            <div
              class="px-1 py-2 md:px-4 md:border rounded-full"
              v-for="(tag, index) in post.tags"
              :key="index"
            >
              <span class="md:hidden">#</span>{{ tag }}
            </div>
          </div>
        </div>
        <div class="py-4 space-y-8">
          <div class="text-center" v-if="!post.comments.length">尚無留言</div>
          <template v-else>
            <div
              class="flex justify-between items-center"
              v-for="comment in post.comments"
              :key="comment._id"
            >
              <div class="flex items-center space-x-4">
                <button
                  type="button"
                  class="w-[48px] h-[48px] rounded-full bg-third overflow-hidden"
                  @click="goUserPage(comment.user._id)"
                >
                  <img :src="comment.user.photo" alt="用戶圖片" />
                </button>
                <button type="button" @click="goUserPage(comment.user._id)">
                  {{ comment.user.nickName }}
                </button>
                <p>{{ comment.content }}</p>
              </div>
              <div class="space-x-4">
                <button type="button" class="link" @click="deleteComment(comment._id)">刪除</button>
              </div>
            </div>
          </template>
        </div>
      </section>
    </div>
    <LikesModal ref="likesModalRef" @getPost="getPost" />
  </div>
</template>
<style scoped></style>
