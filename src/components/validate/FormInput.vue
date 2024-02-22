<script setup>
import { computed } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  name: String,
  type: String,
  placeholder: String
})

const { value, errorMessage } = useField(props.name)

// 判斷是否有錯誤訊息
const inputClass = computed(() => {
  return errorMessage.value
    ? 'w-full border border-red-500 rounded px-5 py-4 focus:outline-red-500'
    : 'w-full border border-font rounded px-5 py-4 focus:outline-font'
})

// 轉換錯誤訊息
const convert_error_message = computed(() => {
  const result = errorMessage.value === 'Required' ? '此欄位必填' : errorMessage
  return result
})
</script>

<template>
  <div class="flex flex-col">
    <input
      :type="type"
      v-model="value"
      :class="inputClass"
      :placeholder="placeholder"
      autocomplete="current-password"
    />
    <p class="text-red-500">{{ convert_error_message }}</p>
  </div>
</template>
