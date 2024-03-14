<script setup>
import { ref, defineProps } from 'vue'
const props = defineProps(['totalPage', 'nowPage'])
const emits = defineEmits(['changePage'])

const currentPage = ref(1)

const changePage = (page) => {
  currentPage.value = page
  emits('changePage', currentPage.value)
}
</script>

<template>
  <div class="flex justify-center mt-4" v-if="props.totalPage !== 0">
    <nav class="inline-flex" aria-label="Pagination">
      <a
        href="#"
        class="text-font items-center px-2 py-2 cursor-pointer"
        :class="{ 'pointer-events-none': props.nowPage === 1 }"
        @click.prevent="changePage(currentPage - 1)"
      >
        <span class="sr-only">Previous</span>
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fill-rule="evenodd"
            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
      <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
      <a
        href="#"
        aria-current="page"
        class="text-font items-center px-4 py-2 text-sm font-semibold"
        :class="{ 'text-input_font': page === props.nowPage }"
        v-for="page in props.totalPage"
        :key="page"
        @click.prevent="changePage(page)"
        >{{ page }}</a
      >
      <a
        href="#"
        class="text-font items-center px-2 py-2 cursor-pointer"
        :class="{ 'pointer-events-none': props.nowPage === props.totalPage }"
        @click.prevent="changePage(currentPage + 1)"
      >
        <span class="sr-only">Next</span>
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fill-rule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </nav>
  </div>
</template>
