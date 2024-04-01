<script setup>
import { ref, onMounted } from 'vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import { get_posts_api_admin, delete_post_api_admin } from '@/api/community'
import { useRouter } from 'vue-router'
import { useAlertStore } from '@/stores/alert'
import { useCommunityStore } from '@/stores/community'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'

const router = useRouter()
const alertStore = useAlertStore()
const communityStore = useCommunityStore()
const { tags, tagsOptions } = storeToRefs(communityStore)

const posts = ref([])
const filterData = ref({
  nickName: '',
  tag: ''
})
const pagination = ref({
  totalPage: 1,
  nowPage: 1
})

const changePage = (page) => {
  pagination.value.nowPage = page
  searchPosts()
}
const resetSearch = () => {
  filterData.value = {
    nickName: '',
    tag: ''
  }
  pagination.value.nowPage = 1
  searchPosts()
}

const searchPosts = async () => {
  const params = {
    page: pagination.value.nowPage,
    nickName: filterData.value.nickName || null,
    tag: filterData.value.tag || null
  }
  try {
    const res = await get_posts_api_admin(params)
    posts.value = res.data.posts
    pagination.value.totalPage = res.data.pagination
  } catch (error) {
    console.error(error)
  }
}

const deletePost = async (postId) => {
  try {
    await delete_post_api_admin(postId)
    alertStore.openAlert('success', '刪除成功')
    searchPosts()
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  if (!tags.value.length) {
    communityStore.getTags()
  }
  searchPosts()
})
</script>
<template>
  <div class="ml-10 my-10 col-span-10 text-font">
    <!-- 頁面標題 -->
    <div class="flex justify-between">
      <h1 class="text-5xl font-bold">貼文管理</h1>
    </div>
    <!-- 搜尋、分類區塊 -->
    <div class="flex space-x-2 mt-4">
      <div class="flex items-center">
        <label for="nickName" class="mr-1 text-xl">貼文作者</label>
        <div class="relative">
          <input
            type="text"
            id="nickName"
            name="nickName"
            class="max-w-[150px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
            placeholder="請輸入貼文作者"
            v-model="filterData.nickName"
          />
        </div>
      </div>
      <div class="flex items-center">
        <label for="category" class="mx-1 text-xl">貼文類別</label>
        <select
          class="max-w-[200px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
          name=""
          id="tag"
          v-model="filterData.tag"
        >
          <option value="" disabled>請選擇貼文類別</option>
          <optgroup v-for="tagGroup in tagsOptions" :key="tagGroup.type" :label="tagGroup.type">
            <option v-for="name in tagGroup.name" :key="name" :value="name">{{ name }}</option>
          </optgroup>
        </select>
      </div>
    </div>
    <div class="flex space-x-2 justify-end">
      <button type="button" class="btn btn-sm mt-4" @click="resetSearch">清除</button>
      <button type="button" class="btn btn-sm mt-4" @click="searchPosts">搜尋</button>
    </div>

    <!-- 貼文列表 -->
    <div class="mt-4 overflow-x-auto">
      <table class="table">
        <thead class="h-[60px] bg-third text-xl">
          <th class="rounded-l-[10px]">圖片</th>
          <th>發文日期</th>
          <th>貼文作者</th>
          <th>類別</th>
          <th>按讚數</th>
          <th>留言數</th>
          <th class="rounded-r-[10px]">操作</th>
        </thead>
        <tbody class="rounded-[10px] shadow">
          <tr v-for="post in posts" :key="post._id">
            <td>
              <img
                class="w-[100px] h-[100px] object-cover rounded-md"
                :src="post.photo"
                alt="貼文圖片"
              />
            </td>
            <td>{{ dayjs(post.createdAt).format('YYYY-MM-DD') }}</td>
            <td>{{ post.user }}</td>
            <td>
              <div v-for="tag in post.tags" :key="tag">
                {{ tag }}
              </div>
            </td>
            <td class="text-center">{{ post.likesLength }}</td>
            <td class="text-center">{{ post.commentsLength }}</td>
            <td>
              <div
                class="button-group flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2"
              >
                <button
                  type="button"
                  class="btn btn-sm bg-gray-200 border-0 hover:bg-gray-300"
                  @click="router.push(`/admin/post/${post._id}`)"
                >
                  查看詳情
                </button>
                <button
                  type="button"
                  class="btn btn-sm text-white bg-secondary hover:bg-font break-keep"
                  @click="deletePost(post._id)"
                >
                  刪除貼文
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <PaginationComponent
      :totalPage="pagination.totalPage"
      :nowPage="pagination.nowPage"
      @changePage="changePage"
    ></PaginationComponent>
  </div>
</template>
<style scoped></style>
