<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useCommunityStore } from '@/stores/community'
import { storeToRefs } from 'pinia'
import { get_post_data_api } from '@/api/user'
import { get_user_posts_api } from '@/api/community'
import avatar from '@/assets/avatar.svg'
import EditPostModal from '@/components/EditPostModal.vue'

const route = useRoute()
const router = useRouter()
const { id } = route.params

const communityStore = useCommunityStore()
const { tags } = storeToRefs(communityStore)

// 使用者資料
const userStore = useUserStore()
const { userId } = storeToRefs(userStore)
const userData = ref({})

// 取得使用者資料
const getMemberData = async () => {
  try {
    const data = await get_post_data_api(id)
    userData.value = data
  } catch (error) {
    console.error(error)
  }
}

// 取得貼文資料
const posts = ref([])
const getPosts = async () => {
  try {
    const res = await get_user_posts_api(id)
    posts.value = res.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  if (!tags.value.length) {
    communityStore.getTags()
  }
  getMemberData()
  getPosts()
})

const editPostModalRef = ref()
</script>

<template>
  <div class="MyPostView">
    <div class="container mt-10 max-w-[970px] mb-10">
      <!-- 自我介紹區塊 -->
      <div
        class="flex justify-between items-end border-b border-secondary pb-10 px-4 md:px-20 mb-10"
      >
        <div class="flex">
          <div class="">
            <div class="w-[100px] h-[100px] rounded-full overflow-hidden">
              <img
                :src="userData.photo || avatar"
                alt="user_photo"
                class="object-cover w-full h-full"
              />
            </div>

            <p class="text-font font-semibold mt-4 text-center">{{ userData.nickName }}</p>
          </div>

          <div class="text-font leading-5 flex items-center ml-5 md:ml-10">
            <p>{{ userData.intro }}</p>
          </div>
        </div>

        <button
          class="btn bg-secondary hover:bg-font border-none text-xs text-white font-semibold md:px-6 md:py-2 md:text-base"
          v-if="userId === userData._id"
          @click="editPostModalRef.showModal(null)"
        >
          新增貼文
        </button>
      </div>

      <!-- 貼文區塊 -->
      <div class="text-center" v-if="!posts.length">尚無貼文</div>
      <div class="grid grid-cols-3 gap-4 md:gap-10 px-4 md:px-20" v-else>
        <button
          class="relative overflow-hidden rounded-lg aspect-square"
          v-for="post in posts"
          :key="post._id"
          @click="router.push(`/community/${post._id}`)"
        >
          <div class="w-full h-full group">
            <div class="w-full h-full transition bg-secondary hover:blur-sm">
              <img class="w-full h-full object-cover" :src="post.photo" alt="" />
            </div>
            <div
              class="absolute text-white transition opacity-0 right-2 bottom-2 group-hover:opacity-100"
            >
              <span class="me-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="inline w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                {{ post.likesLength }}
              </span>

              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="inline w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
                {{ post.commentsLength }}
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
    <EditPostModal ref="editPostModalRef" @getPosts="getPosts" />
  </div>
</template>
