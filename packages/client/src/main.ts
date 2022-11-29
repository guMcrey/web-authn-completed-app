import {createApp} from 'vue'
import {router} from '@/router'
import '@/assets/styles/reset.css'
import App from './App.vue'

export const app = createApp(App)

app.use(router).mount('#app')
