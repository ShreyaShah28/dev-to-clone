import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

const app=createApp(App).use(router)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
