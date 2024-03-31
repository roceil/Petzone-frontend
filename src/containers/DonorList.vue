<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import crown from '@/assets/home/crown.svg'
import donor_bg from '@/assets/home/donor_bg.svg'
import donor_bg_sm from '@/assets/home/donor_bg_sm.svg'
import { get_monthly_donate_rank_api } from '@/api/user'
import anime from 'animejs'

const donorList = ref({})
const totalDonationRef = ref(null) // 新增一個 ref 來獲取累積金額元素

const getMonthlyDonateRank = async () => {
  try {
    const res = await get_monthly_donate_rank_api()
    donorList.value = res
  } catch (error) {
    console.error(error)
  }
}

const numberFormatter = (num) => {
  return new Intl.NumberFormat('zh-TW').format(num)
}

const router = useRouter()
const goUserPage = (id) => {
  router.push(`/mypost/${id}`)
}

onMounted(() => {
  getMonthlyDonateRank()
  nextTick(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: donorList.value,
              totalDonation: [0, donorList.value.totalDonation],
              round: 1,
              easing: 'linear',
              duration: 3000,
              update: function (anim) {
                totalDonationRef.value.innerText = `NT$${numberFormatter(anim.animations[0].currentValue)}`
              }
            })
            observer.unobserve(entry.target)
          }
        })
      },
      {
        root: null,
        threshold: 0.1
      }
    )

    observer.observe(totalDonationRef.value)
  })
})
</script>

<template>
  <section class="relative">
    <div class="container mt-[50px] md:mt-[323px] flex flex-col items-center justify-center">
      <!-- 標題區塊 -->
      <div class="flex justify-center items-center space-x-2">
        <img :src="crown" alt="裝飾ICON" class="w-10 md:w-auto" />
        <h2 class="text-xl md:text-5xl font-bold text-font text-center">本月最佳慈善捐款者</h2>
      </div>

      <!-- 文字區塊 -->
      <p class="mt-6 text-xs md:text-xl md:leading-8 max-w-[300px] md:max-w-[945px] text-secondary">
        在PetZone你可以透過社群互動獲得積分，並選擇捐贈積分給可愛的毛寶寶們，捐贈的積分將提供給XX平台為流浪的毛小孩們提供必要的食物、醫療照護。您的善舉不僅提供了關懷也為牠們點燃了希望的燈火。
      </p>

      <!-- 捐款者清單 -->
      <ul class="flex items-center justify-center space-x-2 md:space-x-[100px] mt-6">
        <li v-for="donor in donorList.topDonators" :key="donor">
          <button
            type="button"
            class="rounded-full overflow-hidden flex justify-center items-center w-20 h-20 md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px]"
            @click="goUserPage(donor.userId)"
          >
            <img :src="donor.photo" :alt="donor.name" class="object-cover w-full h-full" />
          </button>
        </li>
      </ul>

      <!-- 累積金額 -->
      <p class="mt-6 text-xs md:text-2xl font-bold text-font text-end w-full md:max-w-[1124px]">
        平台總累積捐贈金額：<span ref="totalDonationRef"
          >NT${{ numberFormatter(donorList.totalDonation) }}</span
        >
      </p>
    </div>

    <!-- 背景裝飾 -->
    <img
      :src="donor_bg"
      alt="裝飾ICON"
      class="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
    />

    <img
      :src="donor_bg_sm"
      alt="裝飾ICON"
      class="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[70%] sm:-translate-y-1/2 -z-10"
    />
  </section>
</template>
