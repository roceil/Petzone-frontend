<script setup>
import { ref, defineProps, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
const props = defineProps(['view', 'pagination', 'filterProducts', 'filterOrders'])

const userStore = useUserStore()
const currentPage = ref(1)

const changePage = (page) => {
  if (page < 1) {
    page = 1
    userStore.changeCurrentPage(page)
  } else if (page > props.pagination) {
    page = props.pagination
  }
  currentPage.value = page
  userStore.changeCurrentPage(page)

  if (props.view === 'products') {
    props.filterProducts('page', currentPage.value)
  } else if (props.view === 'orders') {
    props.filterOrders('page', currentPage.value)
  }
}

onMounted(() => {
  currentPage.value = userStore.currentPage
})
</script>

<template>
  <div class="flex justify-center mt-4" v-if="pagination !== 0">
    <nav class="inline-flex" aria-label="Pagination">
      <ul class="page-item">
        <li
          href="#"
          class="text-font items-center px-2 py-2 cursor-pointer"
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
        </li>
      </ul>
      <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
      <a
        href="#"
        aria-current="page"
        class="text-font items-center px-4 py-2 text-sm font-semibold rounded-[10px]"
        :class="{ 'bg-font text-white': currentPage === page }"
        v-for="page in pagination"
        :key="page"
        @click.prevent="changePage(page)"
        >{{ page }}</a
      >
      <ul>
        <li
          href="#"
          class="text-font items-center px-2 py-2 cursor-pointer"
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
        </li>
      </ul>
    </nav>
  </div>
</template>
