import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('LoadingStore', () => {
  const LoadingMode = ref(false)

  return { LoadingMode }
})
