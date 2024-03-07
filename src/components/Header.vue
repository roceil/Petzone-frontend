<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted, computed, watch } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import Modal from '@/components/modal/Modal.vue'
import { headerLinks } from '@/constants'
import { useAuthStore } from '@/stores/auth'
import { useModalStore } from '@/stores/modal'
import { useUserStore } from '@/stores/user'
import { cartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import LoginModal from './modal/LoginModal.vue'
import SignUpModal from './modal/SignUpModal.vue'
import ResetPasswordModal from './modal/ResetPasswordModal.vue'
import SetNewPasswordModal from './modal/SetNewPasswordModal.vue'
import AvatarDropDownList from './AvatarDropDownList.vue'
import CartDropDownList from './CartDropDownList.vue'

const authStore = useAuthStore()
const userStore = useUserStore()
const cartHandler = cartStore()
const { cartList } = storeToRefs(cartHandler)

// 購物車效果
watch(cartList.value, () => {
  // console.log(cartList.value)
})

// 判斷前後台
const route = useRoute()
const isAdmin = computed(() => {
  return route.meta.admin
})

// 檢查是否有 token
onMounted(() => {
  authStore.read_cookie()
})

// Methods
const GotoHome = () => {
  router.push({ name: 'home' })
}

// 登出
const logout = () => {
  authStore.clear_token()
  userStore.resetUserId()
  userStore.clear_cookie()
  router.push({ name: 'home' })
}

const modalStore = useModalStore()
</script>

<template>
  <header class="Header">
    <!-- 主內容 -->
    <div class="container">
      <div class="flex justify-between items-center py-[10px] border-b border-font">
        <!-- LOGO -->
        <button @click="GotoHome" class="w-20 ml-[98px]">
          <img src="../assets/logo.svg" alt="logo" />
        </button>

        <!-- 前台顯示 -->
        <template v-if="!isAdmin">
          <!-- Nav -->
          <ul class="flex space-x-12 text-2xl text-font">
            <li class="hover:text-secondary" v-for="link in headerLinks" :key="link.name">
              <RouterLink :to="link.link">{{ link.name }}</RouterLink>
            </li>
          </ul>

          <!-- 購物車＆登入 -->
          <div class="flex space-x-[50px] mr-[25px] items-center">
            <!-- 購物車下拉視窗 -->

            <CartDropDownList class="relative"></CartDropDownList>
            <div
              class="absolute top-5 w-6 h-6 bg-[#F16C5D] rounded-full text-font text-center"
              v-if="cartList.length"
            >
              {{ cartList.length }}
            </div>

            <!-- 登入按鈕 -->
            <button
              v-if="!authStore.token"
              @click="modalStore.openModal('login')"
              class="px-5 py-4 font-bold text-white rounded-full btn btn-primary"
            >
              登入／註冊
            </button>

            <!-- 頭像下拉視窗 -->
            <div v-else class="dropdown dropdown-hover dropdown-end">
              <AvatarDropDownList :logout="logout" :userPhotoPath="userStore.userPhotoPath" />
            </div>
          </div>
        </template>

        <!-- 後台顯示 -->
        <template v-else></template>
      </div>
    </div>

    <!-- modal - 登入 -->
    <Modal
      :isOpen="modalStore.isModalOpen && modalStore.currentModal === 'login'"
      @update:isOpen="modalStore.handleCloseModal"
    >
      <LoginModal />
    </Modal>

    <!-- modal - 註冊 -->
    <Modal
      :isOpen="modalStore.isModalOpen && modalStore.currentModal === 'sign_up'"
      @update:isOpen="modalStore.handleCloseModal"
    >
      <SignUpModal />
    </Modal>

    <!-- modal - 重設密碼 -->
    <Modal
      :isOpen="modalStore.isModalOpen && modalStore.currentModal === 'reset_password'"
      @update:isOpen="modalStore.handleCloseModal"
    >
      <ResetPasswordModal />
    </Modal>

    <!-- modal - 重設密碼(確認新密碼) -->
    <Modal
      :isOpen="modalStore.isModalOpen && modalStore.currentModal === 'set_new_password'"
      @update:isOpen="modalStore.handleCloseModal"
    >
      <SetNewPasswordModal />
    </Modal>
  </header>
</template>
