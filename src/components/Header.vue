<!-- eslint-disable vue/multi-word-component-names -->
<script>
import router from '@/router'
import shopping_cart_icon from '@/assets/header/shopping-cart.svg'
import plus from '@/assets/header/plus-circle.svg'
import minus from '@/assets/header/minus-circle.svg'
import close from '@/assets/header/close-btn.svg'
import google_icon from '@/assets/modal/google_icon.svg'

import { headerLinks } from '@/constants'
import { useAuthStore } from '@/stores/auth'

export default {
  data() {
    return {
      headerLinks,
      shopping_cart_icon,
      plus,
      minus,
      close,
      google_icon,
      drop_down_links: [
        { name: '我的會員中心', link: '/membercenter' },
        { name: '我的歷史訂單', link: '/membercenter/ordershistory' },
        { name: '我的貼文專區', link: '/mypost' }
        // { name: '後台管理', link: '/item4' },
        // { name: '會員登出', link: '/item5' }
      ],
      fake_shopping_cart: [
        {
          id: 1,
          img: 'https://via.placeholder.com/48',
          name: '狗狗甜甜圈',
          price: 2000,
          quantity: 10
        },
        {
          id: 2,
          img: 'https://via.placeholder.com/48',
          name: '貓咪魚魚餅',
          price: 1000,
          quantity: 5
        },
        {
          id: 3,
          img: 'https://via.placeholder.com/48',
          name: '狗窩',
          price: 4500,
          quantity: 1
        },
        {
          id: 4,
          img: 'https://via.placeholder.com/48',
          name: '貓砂',
          price: 300,
          quantity: 20
        },
        {
          id: 5,
          img: 'https://via.placeholder.com/48',
          name: '狗狗罐頭',
          price: 150,
          quantity: 30
        }
      ]
    }
  },

  methods: {
    GotoHome() {
      router.push({ name: 'home' })
    },
    login() {
      this.$refs.login.showModal()
    },
    logout() {
      this.authStore.clear_token()
    },
    close_all_modal() {
      this.$refs.login.close()
      this.$refs.sign_up.close()
      this.$refs.reset_password.close()
      this.$refs.set_new_password.close()
    },
    open_login_modal() {
      this.$refs.login.showModal()
    },
    close_login_modal() {
      this.$refs.login.close()
    },
    open_sign_up_modal() {
      this.$refs.sign_up.showModal()
    },
    close_sign_up_modal() {
      this.$refs.sign_up.close()
    },
    open_reset_password_modal() {
      this.$refs.reset_password.showModal()
    },
    close_reset_password_modal() {
      this.$refs.reset_password.close()
    },
    open_set_new_password_modal() {
      this.$refs.set_new_password.showModal()
    },
    close_set_new_password_modal() {
      this.$refs.set_new_password.close()
    }
  },

  computed: {
    authStore() {
      return useAuthStore()
    },
    token() {
      return this.authStore.token
    },
    has_token() {
      return this.authStore.has_token
    },
    read_token() {
      return this.authStore.read_cookie
    }
  },

  mounted() {
    this.read_token()
  }
}
</script>
<template>
  <header class="Header">
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
          <div class="dropdown dropdown-end dropdown-hover">
            <img tabindex="0" role="button" :src="shopping_cart_icon" alt="shopping-cart-icon" />
            <ul
              tabindex="0"
              class="dropdown-content z-[1] menu shadow bg-base-100 rounded min-w-[400px] border border-font text-font p-0 py-4"
            >
              <li
                class="flex flex-row items-center justify-between w-full flex-nowrap"
                v-for="item in fake_shopping_cart"
                :key="item.id"
              >
                <!-- 商品圖片 -->
                <div class="pr-0">
                  <img :src="item.img" :alt="item.name" class="w-12 h-12 rounded" />
                </div>

                <!-- 商品名稱 -->
                <div class="min-w-[102px]">
                  <p class="">{{ item.name }}</p>
                </div>

                <!-- 商品價格 -->
                <div class="">
                  <p class="">NT$ {{ item.price }}</p>
                </div>

                <!-- 商品數量（組） -->
                <div class="flex min-w-[105px] justify-between">
                  <button class="hover:opacity-80">
                    <img :src="minus" alt="minus-btn" />
                  </button>

                  <p>{{ item.quantity }}</p>

                  <button class="hover:opacity-80">
                    <img :src="plus" alt="plus-btn" />
                  </button>
                </div>
              </li>
            </ul>
          </div>

          <!-- 登入按鈕 -->
          <button
            v-if="!has_token"
            @click="login"
            class="btn btn-primary text-white font-bold rounded-full py-4 px-5"
          >
            登入／註冊
          </button>

          <!-- 頭像下拉視窗 -->
          <div v-else class="dropdown dropdown-end">
            <div tabindex="0" class="w-[50px] h-[50px] bg-red-400 rounded-full"></div>
            <ul
              tabindex="0"
              class="dropdown-content z-[1] menu shadow bg-base-100 rounded w-[182px] border border-font text-font top-[106px] p-0 overflow-hidden"
            >
              <li
                v-for="link in drop_down_links"
                :key="link.name"
                class="hover:bg-[#EEF1F4] h-[43px] flex justify-center"
              >
                <RouterLink :to="link.link">
                  <p>{{ link.name }}</p>
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- modal - 註冊 -->
    <dialog ref="sign_up" class="modal">
      <div class="modal-box relative flex flex-col items-center px-[57px]">
        <!-- 關閉按鈕 -->
        <div class="absolute right-[29px] top-[33px]">
          <button @click="close_all_modal"><img :src="close" alt="close-btn" /></button>
        </div>

        <!-- 標題 -->
        <h3 class="font-bold text-5xl text-font text-center mt-[46px]">註冊會員</h3>

        <!-- 表單內容 -->
        <div class="w-[392px] h-[388px] bg-slate-300 mt-[25px]"></div>

        <!-- 註冊按鈕 -->
        <div class="w-full flex justify-end">
          <button
            class="btn bg-secondary hover:bg-font text-white font-semibold rounded px-5 text-base mt-[30px] w-[125px]"
          >
            註冊
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button class="cursor-default">close</button>
      </form>
    </dialog>

    <!-- modal - 登入 -->
    <dialog ref="login" class="modal">
      <div class="modal-box relative flex flex-col items-center px-20">
        <!-- 關閉按鈕 -->
        <div class="absolute right-[29px] top-[33px]">
          <button @click="close_all_modal"><img :src="close" alt="close-btn" /></button>
        </div>

        <!-- 標題 -->
        <h3 class="font-bold text-5xl text-font text-center mt-[46px]">登入會員</h3>

        <!-- 表單內容 -->
        <div class="w-[345px] h-[204px] bg-slate-300 mt-[25px]"></div>

        <!-- 忘記密碼 -->
        <div class="w-full flex justify-end mt-4 hover:opacity-80">
          <button @click="open_reset_password_modal" class="underline text-font">忘記密碼</button>
        </div>

        <!-- 註冊按鈕 -->
        <div class="w-full flex justify-between px-[35px] mt-[29px]">
          <button
            @click="open_sign_up_modal"
            class="btn bg-third text-font font-semibold rounded px-5 text-base w-[125px] border-none hover:opacity-80 hover:bg-third"
          >
            註冊
          </button>

          <button
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
            class="bg-[#EEF1F4] p-[10px] rounded flex items-center space-x-5 text-[#545F71] w-[250px]"
          >
            <img :src="google_icon" alt="google_icon" />
            <p>使用GOOGLE登入</p>
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button class="cursor-default">close</button>
      </form>
    </dialog>

    <!-- modal - 重設密碼 -->
    <dialog ref="reset_password" class="modal">
      <div class="modal-box relative flex flex-col items-center px-[75px]">
        <!-- 關閉按鈕 -->
        <div class="absolute right-[29px] top-[33px]">
          <button @click="close_all_modal"><img :src="close" alt="close-btn" /></button>
        </div>

        <!-- 標題 -->
        <h3 class="font-bold text-5xl text-font text-center mt-[46px]">重設密碼</h3>

        <!-- 文字說明 -->
        <p class="mt-[25px] text-font leading-[48px] font-bold">
          請輸入你註冊時的 Email，我們會發送一封信件，點擊信件中的連結以重設密碼。
        </p>

        <!-- 表單內容 -->
        <input
          type="text"
          placeholder="abc@gmail.com"
          class="border border-font rounded p-3 w-full"
        />

        <!-- 按鈕 -->
        <div class="w-full flex justify-center space-x-[23px] px-[35px] mt-[46px]">
          <button
            @click="close_reset_password_modal"
            class="btn bg-[#EEF1F4] text-font rounded text-base border-none hover:opacity-80 hover:bg-[#EEF1F4] font-normal"
          >
            取消
          </button>

          <button
            @click="open_set_new_password_modal"
            class="btn bg-secondary hover:bg-font text-white rounded text-base font-normal"
          >
            確認
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button class="cursor-default">close</button>
      </form>
    </dialog>

    <!-- modal - 重設密碼(確認新密碼) -->
    <dialog ref="set_new_password" class="modal">
      <div class="modal-box relative flex flex-col items-center px-[75px]">
        <!-- 關閉按鈕 -->
        <div class="absolute right-[29px] top-[33px]">
          <button @click="close_all_modal"><img :src="close" alt="close-btn" /></button>
        </div>

        <!-- 標題 -->
        <h3 class="font-bold text-5xl text-font text-center mt-[46px]">重設密碼</h3>

        <!-- 表單內容 -->
        <form class="mt-10 text-font w-full space-y-[14px]">
          <label class="flex flex-col space-y-5">
            <p class="font-semibold">請輸入新密碼</p>
            <input
              type="text"
              placeholder="請輸入密碼"
              class="border border-font rounded p-3 w-full"
            />
          </label>

          <label class="flex flex-col space-y-5">
            <p class="font-semibold">請再次輸入新密碼</p>
            <input
              type="text"
              placeholder="請再次輸入密碼"
              class="border border-font rounded p-3 w-full"
            />
          </label>
        </form>

        <!-- 按鈕 -->
        <div class="w-full flex justify-center space-x-[23px] px-[35px] mt-[46px]">
          <button
            @click="close_set_new_password_modal"
            class="btn bg-[#EEF1F4] text-font rounded text-base border-none hover:opacity-80 hover:bg-[#EEF1F4] font-normal"
          >
            取消
          </button>

          <button class="btn bg-secondary hover:bg-font text-white rounded text-base font-normal">
            確認
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button class="cursor-default">close</button>
      </form>
    </dialog>
  </header>
</template>
