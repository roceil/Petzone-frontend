<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

import close from '@/assets/header/close-btn.svg'
import google_icon from '@/assets/modal/google_icon.svg'
import { useModalStore } from '@/stores/modal'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import { cartStore } from '@/stores/cart'
import { useAlertStore } from '@/stores/alert'
import { login_api } from '@/api/auth'
import FormInput from '../validate/FormInput.vue'
import { login_modal_form_items } from '@/constants'
import { closeSidebar } from '@/lib'
import Cookies from 'js-cookie'
import { useLoadingStore } from '@/stores/loading'
import { storeToRefs } from 'pinia'

const { VITE_API_BASE_URL } = import.meta.env
const modalStore = useModalStore()
const authStore = useAuthStore()
const userStore = useUserStore()
const cartHandler = cartStore()
const alertStore = useAlertStore()
const LoadingStore = useLoadingStore()
const { LoadingMode } = storeToRefs(LoadingStore)

const validationSchema = z.object({
  email: z.string().email('Email 格式不正確').min(1, '信箱欄位為必填'),
  password: z.string().min(6, '密碼欄位為必填')
})
const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(validationSchema)
})

const onSubmit = handleSubmit(async ({ email, password }) => {
  LoadingMode.value = true
  const { accessToken, photo, userId, permission } = await login_api(email, password)
  if (!accessToken) {
    alertStore.openAlert('error', '登入失敗，請檢查帳號密碼是否正確')
    LoadingMode.value = false
    return
  }

  if (permission === 'admin') {
    authStore.set_permissions(permission)
  }

  Cookies.set('type', 'nomal')
  authStore.set_token(accessToken)
  userStore.setUserPhotoPath(photo)
  userStore.setUserId(userId)
  cartHandler.getCart()
  closeSidebar()
  alertStore.openAlert('success', '登入成功')
  modalStore.handleCloseModal()
  LoadingMode.value = false
})

const google_redirect = () => {
  window.location.href = `${VITE_API_BASE_URL}/auth/google`
}
</script>

<template>
  <div class="modal-box relative flex flex-col items-center md:px-20">
    <!-- 關閉按鈕 -->
    <div class="absolute right-[29px] top-[33px]">
      <button type="button" @click="modalStore.handleCloseModal">
        <img :src="close" alt="close-btn" />
      </button>
    </div>

    <!-- 標題 -->
    <h3 class="font-bold text-5xl text-font text-center mt-[46px]">登入會員</h3>

    <!-- 表單內容 -->
    <form class="mt-[25px] w-full space-y-5">
      <label
        v-for="item in login_modal_form_items"
        :key="item.tag"
        class="flex flex-col space-y-5"
        @keydown.enter="onSubmit"
      >
        <p class="font-semibold text-font">{{ item.label }}</p>
        <FormInput :name="item.tag" :type="item.type" :placeholder="item.label" />
      </label>
    </form>

    <!-- 忘記密碼 -->
    <div class="w-full flex justify-end mt-4 hover:opacity-80">
      <button
        type="button"
        @click="modalStore.openModal('reset_password')"
        class="underline text-font"
      >
        忘記密碼
      </button>
    </div>

    <!-- 註冊按鈕 -->
    <div class="w-full flex justify-center space-x-4 md:justify-between md:px-[35px] mt-[29px]">
      <button
        type="button"
        @click="modalStore.openModal('sign_up')"
        class="btn bg-third text-font font-semibold rounded px-5 text-base w-1/2 md:w-[125px] border-none hover:opacity-80 hover:bg-third"
      >
        註冊
      </button>

      <button
        type="button"
        @click="onSubmit"
        class="btn bg-secondary hover:bg-font text-white font-semibold rounded px-5 text-base w-1/2 md:w-[125px]"
      >
        登入
      </button>
    </div>

    <!-- 分隔線 -->
    <div class="w-full h-[1px] bg-font mt-[30px]"></div>

    <!-- 第三方登入 -->
    <div class="w-full flex justify-center mt-[37px]">
      <button
        type="button"
        @click="google_redirect"
        class="bg-[#EEF1F4] p-[10px] rounded flex items-center space-x-5 text-[#545F71] w-[250px]"
      >
        <img :src="google_icon" alt="google_icon" />
        <p>使用GOOGLE登入</p>
      </button>
    </div>
  </div>
</template>
