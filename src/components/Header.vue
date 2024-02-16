<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted } from 'vue'
import router from '@/router'
import Modal from '@/components/modal/Modal.vue'
import { headerLinks } from '@/constants'
import { useAuthStore } from '@/stores/auth'
import { useModalStore } from '@/stores/modal'
import LoginModal from './modal/LoginModal.vue'
import SignUpModal from './modal/SignUpModal.vue'
import ResetPasswordModal from './modal/ResetPasswordModal.vue'
import SetNewPasswordModal from './modal/SetNewPasswordModal.vue'
import AvatarDropDownList from './AvatarDropDownList.vue'
import CartDropDownList from './CartDropDownList.vue'

const authStore = useAuthStore()

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
  authStore.set_token(false)
  authStore.clear_token()
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

        <!-- Nav -->
        <ul class="flex space-x-12 text-font text-2xl">
          <li v-for="link in headerLinks" :key="link.name">
            <RouterLink :to="link.link">{{ link.name }}</RouterLink>
          </li>
        </ul>

        <!-- 購物車＆登入 -->
        <div class="flex space-x-[50px] mr-[25px] items-center">
          <!-- 購物車下拉視窗 -->
          <CartDropDownList />

          <!-- 登入按鈕 -->
          <button
            v-if="!authStore.has_token"
            @click="modalStore.openModal('login')"
            class="btn btn-primary text-white font-bold rounded-full py-4 px-5"
          >
            登入／註冊
          </button>

          <!-- 頭像下拉視窗 -->
          <div v-else class="dropdown dropdown-end">
            <AvatarDropDownList :logout="logout" />
          </div>
        </div>
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
