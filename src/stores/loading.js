import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('LoadingStore', () => {
  const LoadingMode = ref(false)

  const openLoading = () => {
    LoadingMode.value = true
  }

  const closeLoading = () => {
    setTimeout(() => {
      LoadingMode.value = false
    }, 1000)
  }

  return { LoadingMode, openLoading, closeLoading }
})
