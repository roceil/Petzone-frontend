<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { watch, computed } from 'vue'
import { useAlertStore } from '@/stores/alert'

const alertStore = useAlertStore()

// 這個 computed 屬性將根據 alertStore 中的 isOrderShow 值來決定類別
const showAlert = computed(() =>
  alertStore.isOrderShow ? '-translate-y-0' : '-translate-y-[200%]'
)

// 監聽 isOrderShow 的變化，當它被設為 true 時，啟動計時器 2 秒後將其設為 false
watch(
  () => alertStore.isOrderShow,
  (newVal) => {
    if (newVal) {
      setTimeout(() => {
        alertStore.isOrderShow = false
      }, 2000)
    }
  }
)

// 測試打開 Alert
// setTimeout(() => {
//   alertStore.isOrderShow = true
// }, 1000)
</script>

<template>
  <div class="alert" v-if="alertStore.isOrderShow">
    <div
      class="fixed z-[9999] top-10 left-1/2 -translate-x-1/2 transition-transform duration-500"
      :class="showAlert"
    >
      <!-- success -->
      <template v-if="alertStore.alertType === 'success'">
        <div role="alert" class="flex" :class="`alert alert-success`">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{{ alertStore.alertMessage }}</span>
        </div>
      </template>

      <!-- Error -->
      <template v-if="alertStore.alertType === 'error'">
        <div role="alert" class="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{{ alertStore.alertMessage }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
