<script setup>
import { drop_down_links } from '@/constants'
import default_avatar from '@/assets/default_avatar.png'

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
</script>

<template>
  <div class="AvatarDropDownList">
    <div tabindex="0" class="w-[50px] h-[50px] rounded-full">
      <img v-if="userPhotoPath" :src="userPhotoPath" alt="user_photo" />
      <img v-else :src="default_avatar" alt="default_avatar" />
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
          <RouterLink :to="link.link">
            <p>{{ link.name }}</p>
          </RouterLink>
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
