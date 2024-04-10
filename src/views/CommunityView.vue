<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { get_posts_api } from '@/api/community'
import { useCommunityStore } from '@/stores/community'
import { useAlertStore } from '@/stores/alert'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import EditPostModal from '@/components/EditPostModal.vue'

const route = useRoute()
const router = useRouter()
const communityStore = useCommunityStore()
const alertStore = useAlertStore()
const userStore = useUserStore()
const { tags, tagsOptions } = storeToRefs(communityStore)
const { userId } = storeToRefs(userStore)

const pagination = ref({
  totalPage: 0,
  nowPage: 1
})

const posts = ref([])
const keyword = ref('')
const searchTag = ref('')
const getPosts = async () => {
  pagination.value.nowPage = 1
  scrollDisabled.value = false
  const params = {
    page: pagination.value.nowPage,
    nickName: keyword.value,
    tag: searchTag.value
  }
  try {
    const res = await get_posts_api(params)
    pagination.value.totalPage = res.data.pagination
    posts.value = res.data.posts
    router.replace({
      path: '/community',
      query: {
        keyword: keyword.value,
        tag: searchTag.value
      }
    })
  } catch (error) {
    console.error(error)
  }
}

const handleClickTag = (tag) => {
  if (searchTag.value === tag) {
    searchTag.value = ''
  } else {
    searchTag.value = tag
  }
  getPosts()
}

const handleCreatePost = () => {
  if (!userId.value) {
    alertStore.openAlert('error', '此為會員限定功能')
    return
  }
  editPostModalRef.value.showModal(null)
}

onMounted(() => {
  if (route.query.keyword) {
    keyword.value = route.query.keyword
  }
  if (route.query.tag) {
    searchTag.value = route.query.tag
  }
  if (!tags.value.length) {
    communityStore.getTags()
  }
  getPosts()
})

const editPostModalRef = ref()

// 下滑載入
const scrollDisabled = ref(false)
const handleInfiniteOnLoad = async () => {
  if (!scrollDisabled.value) {
    pagination.value.nowPage++
    const params = {
      page: pagination.value.nowPage,
      nickName: keyword.value,
      tag: searchTag.value
    }
    const res = await get_posts_api(params)
    pagination.value.totalPage = res.data.pagination
    posts.value = [...posts.value, ...res.data.posts]
    if (res.data.posts.length === 18) {
      scrollDisabled.value = false
    } else {
      scrollDisabled.value = true
    }
  }
}
</script>

<template>
  <div class="Community text-font">
    <section class="container my-10">
      <div class="flex justify-between">
        <h1 class="text-2xl md:text-5xl font-bold">貼文專區</h1>
        <button
          type="button"
          class="fixed bottom-4 left-8 right-8 z-10 md:z-0 max-w-[502px] mx-auto md:mx-0 md:static px-10 text-white btn btn-secondary"
          @click="handleCreatePost"
        >
          新增貼文
        </button>
      </div>
    </section>
    <section class="container mb-20">
      <div class="grid grid-cols-12 gap-4 md:gap-10">
        <div class="col-span-12 md:col-span-4 md:order-2">
          <div class="relative">
            <input
              class="w-full p-4 border rounded-md border-font focus:outline-none"
              type="text"
              placeholder="請輸入貼文作者"
              v-model="keyword"
            />
            <button
              type="button"
              class="absolute inset-y-0 flex items-center pr-2 right-2"
              @click="getPosts"
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
          <div class="hidden md:block">
            <h5 class="mt-10 text-xl font-bold">Recommended topics</h5>
            <div class="mt-4" v-for="tag in tagsOptions" :key="tag.type">
              <h6 class="text-lg font-bold">{{ tag.type }}</h6>
              <div class="flex flex-wrap mt-4">
                <button
                  type="button"
                  class="px-4 py-2 mb-4 border rounded-full me-6"
                  :class="searchTag === name ? 'bg-third' : ''"
                  v-for="name in tag.name"
                  :key="name"
                  @click="handleClickTag(name)"
                >
                  {{ name }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-8 md:order-1">
          <div class="text-center" v-if="!posts.length">尚無貼文</div>
          <div
            class="grid grid-cols-3 gap-4 md:gap-10"
            v-else
            v-infinite-scroll="handleInfiniteOnLoad"
            :infinite-scroll-immediate-check="false"
            :infinite-scroll-disabled="scrollDisabled"
            infinite-scroll-watch-disabled="scrollDisabled"
            :infinite-scroll-distance="20"
          >
            <button
              type="button"
              class="relative overflow-hidden rounded-lg aspect-square"
              v-for="post in posts"
              :key="post._id"
              @click="router.push(`/community/${post._id}`)"
            >
              <div class="w-full h-full group">
                <div class="w-full h-full transition bg-secondary hover:blur-sm">
                  <img class="w-full h-full object-cover" :src="post.photo" alt="貼文圖片" />
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
      </div>
    </section>
    <EditPostModal ref="editPostModalRef" @getPosts="getPosts" />
  </div>

</template>

<style></style>
