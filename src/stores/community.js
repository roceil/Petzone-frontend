import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { get_tags_api } from '@/api/community'

export const useCommunityStore = defineStore('community', () => {
  const tags = ref([])
  const tagsOptions = computed(() => {
    return tags.value.reduce((acc, curr) => {
      const existing = acc.find((item) => item.type === curr.type)
      if (existing) {
        existing.name.push(curr.name)
      } else {
        acc.push({ type: curr.type, name: [curr.name] })
      }
      return acc
    }, [])
  })
  const getTags = async () => {
    const { data } = await get_tags_api()
    if (data) {
      tags.value = data
    }
  }

  return { tags, tagsOptions, getTags }
})
