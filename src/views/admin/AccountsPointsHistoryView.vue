<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { get_user_points_history_api } from '@/api/user'
import MemberCenterDetail from '@/containers/layouts/MemberCenterDetail.vue'
import PointsHistory from '@/containers/PointsHistory.vue'
import { useAlertStore } from '@/stores/alert'

// alert
const alertStore = useAlertStore()

// 取得使用者資料
const route = useRoute()
const userId = route.params.id
const userPointsHistory = ref([])
const getMemberData = async () => {
  try {
    const res = await get_user_points_history_api(userId)
    userPointsHistory.value = res.reverse()
  } catch (error) {
    console.error(error)
    alertStore.openAlert('error', '取得使用者積分紀錄失敗')
  }
}

onMounted(() => {
  getMemberData()
})
</script>

<template>
  <div class="PointsHistory col-span-10">
    <MemberCenterDetail title="積分詳情">
      <PointsHistory :userPointsHistory="userPointsHistory" />
    </MemberCenterDetail>
  </div>
</template>
