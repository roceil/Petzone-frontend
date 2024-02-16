import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  // Modal 狀態
  const isModalOpen = ref(false)
  const currentModal = ref('')

  // 開啟 Modal
  const openModal = (modalType) => {
    currentModal.value = modalType
    isModalOpen.value = true
  }

  // 關閉 Modal
  const handleCloseModal = () => {
    isModalOpen.value = false
    currentModal.value = ''
  }

  return {
    isModalOpen,
    currentModal,
    openModal,
    handleCloseModal
  }
})
