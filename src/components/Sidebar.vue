<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { sidebarLinks } from '@/constants'
</script>

<template>
  <div class="container flex flex-col text-font">
    <aside class="flex flex-col w-[200px] border-r border-font" id="sidenav-main">
      <div class="relative my-[50px]">
        <div class="flex flex-col">
          <ul>
            <li
              class="flex items-center cursor-pointer my-[50px]"
              v-for="link in sidebarLinks"
              :key="link.name"
            >
              <img :src="link.icon" :alt="link.name" />
              <RouterLink
                :to="link.link"
                class="flex items-center text-2xl font-bold first-letter:hover:text-dark"
                >{{ link.name }}</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
    </aside>
  </div>
</template>
