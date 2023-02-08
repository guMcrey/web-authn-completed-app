import {createApp} from 'vue'
import {router} from '@/router'
import '@/assets/styles/reset.css'
import App from './App.vue'
import i18n from '@/locales'

export const app = createApp(App)

app.use(router).use(i18n).mount('#app')
