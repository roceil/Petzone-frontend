<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

import close from '@/assets/header/close-btn.svg'
import google_icon from '@/assets/modal/google_icon.svg'
import { useModalStore } from '@/stores/modal'
import { useAuthStore } from '@/stores/auth'
import { login_api } from '@/api/auth'
import FormInput from '../validate/FormInput.vue'
import { login_modal_form_items } from '@/constants'

const modalStore = useModalStore()
const authStore = useAuthStore()

const validationSchema = z.object({
  email: z.string().email('Email 格式不正確').min(1, '信箱欄位為必填'),
  password: z.string().min(6, '密碼欄位為必填')
})
const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(validationSchema)
})

const onSubmit = handleSubmit(async ({ email, password }) => {
  const login_status = await login_api(email, password)
  if (login_status) {
    authStore.set_token(login_status)
  }
  modalStore.handleCloseModal()
  alert('登入成功')
})

// Google 登入
// import axios from 'axios'
// const google_login_submit = async () => {
//   try {
//     const res = await axios.get('/auth/google')
//     console.log(res)
//   } catch (error) {
//     console.error(error)
//   }
// }

const google_redirect = () => {
  window.location.href = 'https://petzone-backend-dev.zeabur.app/auth/google'
}
</script>

<template>
  <div class="modal-box relative flex flex-col items-center px-20">
    <!-- 關閉按鈕 -->
    <div class="absolute right-[29px] top-[33px]">
      <button @click="modalStore.handleCloseModal"><img :src="close" alt="close-btn" /></button>
    </div>

    <!-- 標題 -->
    <h3 class="font-bold text-5xl text-font text-center mt-[46px]">登入會員</h3>

    <!-- 表單內容 -->
    <form class="mt-[25px] w-full space-y-5">
      <label v-for="item in login_modal_form_items" :key="item.tag" class="flex flex-col space-y-5">
        <p class="font-semibold text-font">會員帳號</p>
        <FormInput :name="item.tag" :type="item.type" :placeholder="item.label" />
      </label>
    </form>

    <!-- 忘記密碼 -->
    <div class="w-full flex justify-end mt-4 hover:opacity-80">
      <button @click="modalStore.openModal('reset_password')" class="underline text-font">
        忘記密碼
      </button>
    </div>

    <!-- 註冊按鈕 -->
    <div class="w-full flex justify-between px-[35px] mt-[29px]">
      <button
        @click="modalStore.openModal('sign_up')"
        class="btn bg-third text-font font-semibold rounded px-5 text-base w-[125px] border-none hover:opacity-80 hover:bg-third"
      >
        註冊
      </button>

      <button
        @click="onSubmit"
        class="btn bg-secondary hover:bg-font text-white font-semibold rounded px-5 text-base w-[125px]"
      >
        登入
      </button>
    </div>

    <!-- 分隔線 -->
    <div class="w-full h-[1px] bg-font mt-[30px]"></div>

    <!-- 第三方登入 -->
    <div class="w-full flex justify-center mt-[37px]">
      <button
        @click="google_redirect"
        class="bg-[#EEF1F4] p-[10px] rounded flex items-center space-x-5 text-[#545F71] w-[250px]"
      >
        <img :src="google_icon" alt="google_icon" />
        <p>使用GOOGLE登入</p>
      </button>
    </div>
  </div>
</template>
