<script setup>
import { ref, onMounted } from 'vue'
import { get_member_data_api } from '@/api/user'
import MemberCenterDetail from '@/containers/layouts/MemberCenterDetail.vue'
import PointsHistory from '@/containers/PointsHistory.vue'
import { useUserStore } from '@/stores/user'
import { useAlertStore } from '@/stores/alert'

// alert
const alertStore = useAlertStore()

// 取得使用者資料
const userStore = useUserStore()
const userPointsHistory = ref([])
const getMemberData = async () => {
  try {
    const { pointsRecord } = await get_member_data_api(userStore.userId)
    console.log(pointsRecord)
    userPointsHistory.value = pointsRecord.reverse()
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
