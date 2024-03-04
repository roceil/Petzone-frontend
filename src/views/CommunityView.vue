<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { get_posts_api } from '@/api/community'
import { useCommunityStore } from '@/stores/community'
import { storeToRefs } from 'pinia'
import EditPostModal from '@/components/EditPostModal.vue'
const route = useRoute()
const router = useRouter()
const communityStore = useCommunityStore()
const { tags, tagsOptions } = storeToRefs(communityStore)

const posts = ref([])
const keyword = ref('')
const searchTag = ref('')
const getPosts = async () => {
  const params = {
    nickName: keyword.value,
    tag: searchTag.value
  }
  const res = await get_posts_api(params)
  posts.value = res.data
  router.replace({
    path: '/community',
    query: {
      keyword: keyword.value,
      tag: searchTag.value
    }
  })

  console.log(posts.value)
}

const handleClickTag = (tag) => {
  if (searchTag.value === tag) {
    searchTag.value = ''
  } else {
    searchTag.value = tag
  }
  getPosts()
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
</script>
<template>
  <div class="Community text-font">
    <section class="container my-10">
      <div class="flex justify-between">
        <h1 class="text-5xl font-bold">貼文專區</h1>
        <button class="px-10 text-white btn btn-primary" @click="editPostModalRef.showModal(null)">
          新增貼文
        </button>
      </div>
    </section>
    <section class="container mb-10">
      <div class="grid grid-cols-12 gap-10">
        <div class="col-span-8">
          <div class="text-center" v-if="!posts.length">尚無貼文</div>
          <div class="grid grid-cols-3 gap-10" v-else>
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
        <div class="col-span-4">
          <div class="relative">
            <input
              class="w-full p-4 border rounded-md border-font focus:outline-none"
              type="text"
              placeholder="請輸入貼文作者"
              v-model="keyword"
            />
            <button class="absolute inset-y-0 flex items-center pr-2 right-2" @click="getPosts">
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
          <h5 class="mt-10 text-xl font-bold">Recommended topics</h5>

          <div class="mt-4" v-for="tag in tagsOptions" :key="tag.type">
            <h6 class="text-lg font-bold">{{ tag.type }}</h6>
            <div class="flex flex-wrap mt-4">
              <button
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
          <!-- <button class="mt-4 ms-4">see more...</button> -->
        </div>
      </div>
    </section>
    <EditPostModal ref="editPostModalRef" @getPosts="getPosts" />
  </div>
</template>
<style></style>
