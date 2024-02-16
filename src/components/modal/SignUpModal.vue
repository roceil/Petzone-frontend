<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

import close from '@/assets/header/close-btn.svg'
import { useModalStore } from '@/stores/modal'
import FormInput from '../validate/FormInput.vue'
import { sign_up_modal_form_items } from '@/constants'
import { sign_up_api } from '@/api/auth'

const modalStore = useModalStore()

const validationSchema = z.object({
  email: z.string().email('Email 格式不正確').min(1, '信箱欄位為必填'),
  password: z.string().min(6, '密碼至少需要 6 個字符'),
  name: z.string().min(3, '名字欄位為必填'),
  nickname: z.string().min(3, '暱稱欄位為必填'),
  phone: z.string().min(10, '電話欄位為必填'),
  address: z.string().min(1, '地址欄位為必填')
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(validationSchema)
})

const onSubmit = handleSubmit(async ({ email, password, name, nickname, phone, address }) => {
  try {
    const status = await sign_up_api(email, password, name, nickname, phone, address)
    if (status === 'success') {
      modalStore.openModal('login')
      alert('註冊成功')
    }
    throw new Error('註冊失敗')
  } catch (error) {
    console.error(error)
    alert('註冊失敗')
  }
})
</script>

<template>
  <div class="modal-box relative flex flex-col items-center px-[57px]">
    <!-- 關閉按鈕 -->
    <div class="absolute right-[29px] top-[33px]">
      <button @click="modalStore.handleCloseModal"><img :src="close" alt="close-btn" /></button>
    </div>

    <!-- 標題 -->
    <h3 class="font-bold text-5xl text-font text-center mt-[46px]">註冊會員</h3>

    <!-- 表單內容 -->
    <form class="w-full mt-[25px] space-y-5">
      <label
        class="flex items-center justify-between"
        v-for="item in sign_up_modal_form_items"
        :key="item.label"
      >
        <div class="flex flex-col justify-center font-semibold text-font">
          <span>{{ item.label }}</span>
          <span>{{ item.sub_label }}</span>
        </div>

        <div class="w-[300px]">
          <FormInput :name="item.tag" :type="item.type" :placeholder="item.label" />
        </div>
      </label>
    </form>

    <!-- 註冊按鈕 -->
    <div class="w-full flex justify-end">
      <button
        @click="onSubmit"
        class="btn bg-secondary hover:bg-font text-white font-semibold rounded px-5 text-base mt-[30px] w-[125px]"
      >
        註冊
      </button>
    </div>
  </div>
</template>
