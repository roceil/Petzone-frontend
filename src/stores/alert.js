import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useModalStore } from './modal'

export const useAlertStore = defineStore('alertStore', () => {
  const modalStore = useModalStore()

  const isOrderShow = ref(false)

  const alertMessage = ref('')

  const alertType = ref('')

  const openAlert = (type, message) => {
    alertMessage.value = message
    alertType.value = type
    isOrderShow.value = true

    setTimeout(() => {
      if (type === 'success') {
        modalStore.handleCloseModal()
      }
    }, 2000)
  }

  return { isOrderShow, alertMessage, alertType, openAlert }
})
