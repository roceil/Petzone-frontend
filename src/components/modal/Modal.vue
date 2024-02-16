<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
// 使用 defineProps 定義接收的 props
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

// 使用 defineEmits 定義可以發出的事件
const emit = defineEmits(['update:isOpen'])

// 定義關閉 modal 的方法
const closeModal = () => {
  emit('update:isOpen', false)
}
</script>

<template>
  <dialog :open="props.isOpen" class="modal" @close="closeModal">
    <slot></slot>
    <form method="dialog" class="modal-backdrop bg-black opacity-50">
      <button @click="closeModal" type="button" class="cursor-default">關閉</button>
    </form>
  </dialog>
</template>
