<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import close from '@/assets/header/close-btn.svg'

const router = useRouter()

const dialogRef = ref()
const likes = ref([])
const showModal = (postLikes) => {
  likes.value = postLikes
  dialogRef.value.show()
}
const hideModal = () => {
  dialogRef.value.close()
}

const goUserPage = (id) => {
  router.push(`/admin/accountdetails/${id}`)
}

defineExpose({ showModal })
</script>
<template>
  <dialog ref="dialogRef" class="modal">
    <div class="max-w-[700px] relative items-center px-20 modal-box">
      <!-- 關閉按鈕 -->
      <div class="absolute right-[29px] top-[33px]">
        <button type="button" @click="hideModal"><img :src="close" alt="close-btn" /></button>
      </div>
      <!-- 標題 -->
      <h3 class="font-bold text-5xl text-font text-center mt-[46px]">按讚一覽表</h3>
      <!-- 內容 -->
      <div class="mt-8">
        <div class="text-center" v-if="!likes.length">尚無用戶按讚</div>
        <div class="grid grid-cols-3 gap-x-4 gap-y-8" v-else>
          <div class="flex items-center space-x-4" v-for="like in likes" :key="like._id">
            <button
              type="button"
              class="w-[48px] h-[48px] rounded-full bg-third overflow-hidden"
              @click="goUserPage(like.user._id)"
            >
              <img :src="like.user.photo" alt="使用者圖片" />
            </button>
            <button type="button" @click="goUserPage(like.user._id)">
              {{ like.user.nickName }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button type="button">close</button>
    </form>
  </dialog>
</template>
