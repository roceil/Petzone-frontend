<script setup>
import router from '@/router'
import { sidebarLinks } from '@/constants'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const goAnotherPage = (link) => {
  userStore.resetCurrentPage()
  router.push(link)
}
</script>

<template>
  <div class="col-span-2 justify-end">
    <aside class="h-full border-r border-font">
      <div class="mx-[25px] py-[80px] text-font">
        <div>
          <ul>
            <li
              class="flex items-center cursor-pointer my-[50px]"
              v-for="link in sidebarLinks"
              :key="link.name"
            >
              <img class="hidden lg:block mr-2" :src="link.icon" :alt="link.name" />
              <button
                type="button"
                @click="goAnotherPage(link.link)"
                class="flex items-center text-xl lg:text-2xl font-bold first-letter:hover:text-dark"
              >
                {{ link.name }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  </div>
</template>
