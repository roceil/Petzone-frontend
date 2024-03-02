<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { get_member_data_api, put_user_data_api, donate_point_api } from '@/api/user'
import default_avatar from '@/assets/default_avatar.png'

const formItems = ref([
  {
    label: '密碼',
    class: 'btn',
    type: 'button',
    value: '',
    placeholder: '重設密碼'
  },
  {
    label: '姓名',
    class: '',
    type: 'text',
    value: '',
    placeholder: '拉拉熊'
  },
  {
    label: '暱稱',
    class: '',
    type: 'text',
    value: '',
    placeholder: '拉拉熊'
  },
  {
    label: '電話',
    class: '',
    type: 'tel',
    value: '',
    placeholder: '09123456789'
  },
  {
    label: '地址',
    class: '',
    type: 'text',
    value: '',
    placeholder: '台灣省台灣縣台灣市'
  }
])

const fileInput = ref(null)
const fileName = ref('') // 用於存儲檔案名稱

function triggerFileInput() {
  fileInput.value.click()
}

function handleFileChange(event) {
  const files = event.target.files
  if (files.length > 0) {
    fileName.value = files[0].name // 更新 fileName 為選擇的檔案名稱
  }
}

// 使用者資料
const userStore = useUserStore()
const userId = userStore.userId
const userIntro = ref('')
const userData = ref({})
const userAvatar = ref(default_avatar)

// 取得使用者資料
const getMemberData = async (userId) => {
  const data = await get_member_data_api(userId)

  userData.value = data

  // 將資料填入表單
  // 1. 姓名
  formItems.value[1].placeholder = data.name
  // 2. 暱稱
  formItems.value[2].placeholder = data.nickName
  // 3. 電話
  formItems.value[3].placeholder = data.phone
  // 4. 地址
  formItems.value[4].placeholder = data.address

  // 更換大頭貼
  if (data.avatar) {
    userAvatar.value = data.avatar
  }
}

// 更改使用者資料
const submit = async () => {
  try {
    // 1. 檢查表單是否有修改
    userData.value.intro = userIntro.value || userData.value.intro
    userData.value.name = formItems.value[1].value || formItems.value[1].placeholder
    userData.value.nickName = formItems.value[2].value || formItems.value[2].placeholder
    userData.value.phone = formItems.value[3].value || formItems.value[3].placeholder
    userData.value.address = formItems.value[4].value || formItems.value[4].placeholder

    // 2. 將修改後的資料送出
    await put_user_data_api(userId, userData.value)

    // 3. 將新資料填入表單
    await getMemberData(userId)

    // 4. 清空表單
    formItems.value.forEach((item) => {
      item.value = ''
    })
    userIntro.value = ''

    // 5. 提示使用者資料已更新
    alert('使用者資料已更新')
  } catch (error) {
    console.error(error)
    alert('使用者資料更新失敗')
  }
}

// 捐贈點數
const donatePoint = ref()
const donateSubmit = async () => {
  if (isNaN(donatePoint.value)) {
    alert('請輸入數字')
    return
  }

  try {
    await donate_point_api(userId, donatePoint.value)
    await getMemberData(userId)
    donatePoint.value = ''
    alert('捐贈成功')
  } catch (error) {
    console.error(error)
    alert('捐贈失敗')
  }
}


onMounted(() => {
  getMemberData(userId)
})
</script>

<template>
  <div class="MemberCenter">
    <div class="container mt-[46px] flex justify-center px-[42px]">
      <!-- 個資表單 -->
      <form class="flex w-[400px] h-[469px] flex-col space-y-[30px] mr-[37px]">
        <p class="font-semibold text-font">帳號(Email)： {{ userData.account }}</p>

        <label class="flex items-center" v-for="item in formItems" :key="item.label">
          <template v-if="item.type === 'button'">
            <span class="w-[104px] font-semibold text-font">{{ item.label }}：</span>
            <button
              class="btn bg-secondary font-semibold text-white px-[30.5px] py-[9px] hover:bg-font text-base"
            >
              {{ item.placeholder }}
            </button>
          </template>

          <template v-else>
            <span class="w-[104px] font-semibold text-font">{{ item.label }}：</span>
            <input
              :type="item.type"
              :placeholder="item.placeholder"
              v-model="item.value"
              class="input input-bordered w-full max-w-[280px] text-sm pl-3 max-h-10 focus:outline-font border-font focus:border-font text-font font-semibold"
            />
          </template>
        </label>
      </form>

      <!-- 自我介紹 -->
      <div class="w-[277px] h-[353px] mr-[59px]">
        <p class="font-semibold text-font">自我介紹：</p>
        <textarea
          :placeholder="userData.intro"
          v-model="userIntro"
          class="w-full h-[353px] border border-font text-font px-8 py-[21px] mt-[10px] leading-[19px] focus:outline-black rounded-md"
        />
        <div class="w-full flex justify-center mt-5">
          <button
            @click="submit"
            class="btn bg-secondary font-semibold text-white px-6 py-[9px] hover:bg-font text-base"
          >
            儲存
          </button>
        </div>
      </div>

      <!-- 大頭貼 -->
      <div class="min-h-[469px] min-w-[280px] flex flex-col items-center">
        <p class="text-font font-semibold text-center">更換大頭貼照片</p>
        <div class="w-[150px] h-[150px] rounded-full mt-[17px]">
          <img :src="userAvatar" alt="user_avatar" srcset="" />
        </div>

        <div class="flex items-center space-x-[7px] mt-4">
          <div v-if="!fileName" class="text-sm text-font min-w-[157.6px]">
            <p>從電腦中選取圖檔</p>
            <p>最佳大小為600 x 600 px</p>
          </div>
          <p v-else class="text-font text-sm min-w-[157.6px]">{{ fileName }}</p>
          <input
            type="file"
            ref="fileInput"
            @change="handleFileChange"
            class="file-input w-full max-w-xs"
            style="display: none"
          />
          <button
            @click="triggerFileInput"
            class="btn bg-secondary font-semibold text-white px-2 py-[9px] hover:bg-font text-base border-none"
          >
            選擇照片
          </button>
        </div>

        <div class="mt-[53px]">
          <div class="text-font">
            <span>累計積分：{{ userData.historyPoints }} 點｜</span>
            <span>可用積分：{{ userData.points }} 點</span>
          </div>

          <div class="relative mt-[6px]">
            <input
              type="text"
              placeholder="0"
              v-model="donatePoint"
              class="input input-bordered w-full max-w-xs border-font text-font"
            />
            <button
              @click="donateSubmit"
              class="btn absolute bg-secondary font-semibold text-white right-0 top-0 border-none hover:bg-font"
            >
              捐贈
            </button>
          </div>
        </div>

        <div class="mt-[27px]">
          <RouterLink
            to="/membercenter/pointshistory"
            class="btn bg-third text-font border-none hover:bg-font hover:text-white px-[15px] py-[9px]"
          >
            查看積分詳情
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
