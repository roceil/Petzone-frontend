<script setup>
import { drop_down_links } from '@/constants'
import avatar from '@/assets/avatar.svg'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

defineProps({
  logout: {
    type: Function,
    required: true
  },
  userPhotoPath: {
    type: String,
    required: true
  }
})

const router = useRouter()
const userStore = useUserStore()
const goLink = (link) => {
  if (link === '/mypost') {
    router.push(`/myPost/${userStore.userId}`)
  } else {
    router.push(link)
  }
}
</script>

<template>
  <div class="AvatarDropDownList">
    <div tabindex="0" class="w-[50px] h-[50px] rounded-full overflow-hidden">
      <img
        v-if="userPhotoPath"
        :src="userPhotoPath"
        alt="user_photo"
        class="object-cover w-full h-full"
      />
      <img v-else :src="avatar" alt="avatar" class="object-cover w-full h-full" />
    </div>

    <ul
      tabindex="0"
      class="dropdown-content z-[1] menu shadow bg-base-100 rounded w-[182px] border border-font text-font p-0 overflow-hidden"
    >
      <li
        v-for="link in drop_down_links"
        :key="link.name"
        class="hover:bg-[#EEF1F4] h-[43px] flex justify-center"
      >
        <template v-if="link.name !== '會員登出'">
          <button @click="goLink(link.link)">
            <p>{{ link.name }}</p>
          </button>
        </template>

        <template v-else>
          <button @click="logout">
            <p>{{ link.name }}</p>
          </button>
        </template>
      </li>
    </ul>
  </div>
</template>
