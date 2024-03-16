import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import MasonryWall from '@yeger/vue-masonry-wall'
import Vue3Marquee from 'vue3-marquee'
import infiniteScroll from 'vue3-infinite-scroll-better'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(MasonryWall)
app.use(Vue3Marquee)
app.use(infiniteScroll)

app.mount('#app')
