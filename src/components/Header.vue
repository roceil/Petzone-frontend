<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import router from '@/router'
import Modal from '@/components/modal/Modal.vue'
import { useAuthStore } from '@/stores/auth'
import { useModalStore } from '@/stores/modal'
import { useUserStore } from '@/stores/user'
import { cartStore } from '@/stores/cart'
import LoginModal from './modal/LoginModal.vue'
import SignUpModal from './modal/SignUpModal.vue'
import ResetPasswordModal from './modal/ResetPasswordModal.vue'
import SetNewPasswordModal from './modal/SetNewPasswordModal.vue'
import AvatarDropDownList from './AvatarDropDownList.vue'
import CartDropDownList from './CartDropDownList.vue'
import default_user_icon_sm from '@/assets/header/default_user_icon_sm.svg'
import shopping_cart_icon from '@/assets/header/shopping-cart.svg'
import { headerLinks } from '@/constants'
import { useAlertStore } from '@/stores/alert'
import { render_dropdown_links } from '@/composables'

const authStore = useAuthStore()
const userStore = useUserStore()
const alertStore = useAlertStore()
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
  authStore.clear_cookie()
  userStore.resetUserId()
  userStore.user_logout()
  cartList.value = []
  alertStore.openAlert('success', '登出成功')
  router.push({ name: 'home' })
}

const modalStore = useModalStore()
const goLink = (link) => {
  if (link === '/mypost') {
    router.push(`/mypost/${userStore.userId}`)
  } else {
    router.push(link)
  }
}
</script>

<template>
  <header class="Header">
    <!-- 主內容 -->
    <div class="container hidden md:block">
      <div class="flex justify-between items-center py-[10px] border-b border-font">
        <!-- LOGO -->
        <button @click="GotoHome" class="w-20 ml-[98px]">
          <img src="../assets/logo.svg" alt="logo" />
        </button>

        <!-- 前台顯示 -->
        <template v-if="!isAdmin">
          <!-- Nav -->
          <ul class="flex space-x-12 text-2xl text-font">
            <li v-for="link in headerLinks" :key="link.name">
              <RouterLink :to="link.link" class="flex relative px-5 py-4 overflow-hidden group">
                <p
                  class="absolute left-0 -translate-x-full group-hover:-translate-x-1/2 group-hover:left-1/2 duration-300 ease-in-out"
                >
                  {{ link.hoverName }}
                </p>
                <p class="group-hover:translate-x-[150%] duration-300 ease-in-out">
                  {{ link.name }}
                </p>
              </RouterLink>
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
              <AvatarDropDownList
                :logout="logout"
                :userPhotoPath="userStore.userPhotoPath"
                :render_dropdown_links="render_dropdown_links"
                :goLink="goLink"
              />
            </div>
          </div>
        </template>

        <!-- 後台顯示 -->
        <template v-else></template>
      </div>
    </div>

    <!-- 手機版 -->
    <div class="md:hidden w-full fixed top-0 z-10 border-b border-font bg-white">
      <div class="navbar bg-base-100">
        <div class="navbar-start">
          <div class="dropdown">
            <div class="drawer">
              <input id="my-drawer" type="checkbox" class="drawer-toggle" />
              <!-- 側邊欄觸發 Icon -->
              <div class="drawer-content">
                <label for="my-drawer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </label>
              </div>

              <!-- 側邊欄內容 -->
              <div class="drawer-side">
                <label
                  for="my-drawer"
                  aria-label="close sidebar"
                  class="drawer-overlay !bg-transparent"
                ></label>
                <ul
                  class="menu p-0 w-1/2 max-w-[300px] mt-[65px] min-h-[calc(100vh-65px)] text-base-content bg-white"
                >
                  <li>
                    <div class="py-5 border-b border-font rounded-none flex justify-end shadow-lg">
                      <div class="flex space-x-2 items-center">
                        <img :src="default_user_icon_sm" alt="userPhotoPath" class="w-4" />
                        <p class="text-font font-bold text-xl w-full text-right">會員專區</p>
                      </div>
                    </div>

                    <template v-if="authStore.token">
                      <div
                        class="flex justify-end items-center rounded-none py-3"
                        v-for="link in render_dropdown_links"
                        :key="link.sm_name"
                      >
                        <template v-if="link.sm_name !== '會員登出'">
                          <!-- <RouterLink :to="link.link" class="text-xl text-font">{{
                            link.sm_name
                          }}</RouterLink> -->

                          <button @click="goLink(link.link)" class="text-xl text-font">
                            <p>{{ link.sm_name }}</p>
                          </button>
                        </template>

                        <template v-else>
                          <button @click="logout" class="text-xl text-font">
                            {{ link.sm_name }}
                          </button>
                        </template>
                      </div>
                    </template>

                    <template v-else>
                      <div class="flex justify-end items-center rounded-none py-3">
                        <button @click="modalStore.openModal('login')" class="text-xl text-font">
                          立即登入
                        </button>
                      </div>
                    </template>
                  </li>

                  <li>
                    <RouterLink
                      to="/ecommerce"
                      class="py-5 border-y shadow-lg border-font rounded-none flex justify-end"
                    >
                      <div class="flex space-x-2 items-center">
                        <img :src="default_user_icon_sm" alt="userPhotoPath" class="w-4" />
                        <p class="text-font font-bold text-xl w-full text-right">逛逛商店</p>
                      </div>
                    </RouterLink>
                  </li>

                  <li>
                    <RouterLink
                      to="/community"
                      class="py-5 border-b shadow-lg border-font rounded-none flex justify-end"
                    >
                      <div class="flex space-x-2 items-center">
                        <img :src="default_user_icon_sm" alt="userPhotoPath" class="w-4" />
                        <p class="text-font font-bold text-xl w-full text-right">看看貼文</p>
                      </div>
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="navbar-center">
          <button @click="GotoHome" class="w-[50px]">
            <img src="../assets/logo.svg" alt="logo" />
          </button>
        </div>
        <div class="navbar-end space-x-5 pr-2 relative">
          <RouterLink to="/ecommerce/cart" class="w-[30px] h-[30px]">
            <img tabindex="0" :src="shopping_cart_icon" alt="shopping-cart-icon" />
          </RouterLink>
          <div
            class="absolute top-0 w-3 h-3 bg-[#F16C5D] rounded-full text-xs text-font text-center"
            v-if="cartList.length"
          >
            {{ cartList.length }}
          </div>

          <!-- <button type="" class="w-5 h-5">
            <img :src="default_user_icon_sm" alt="userPhotoPath" />
          </button> -->
        </div>
      </div>
    </div>

    <!-- 手機版佔位格 -->
    <div class="h-[65px] md:hidden"></div>

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
