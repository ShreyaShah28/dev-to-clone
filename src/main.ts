import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import VueObserveVisibility from 'vue-observe-visibility'

const app=createApp(App).use(router)
const pinia = createPinia()

app.use(VueObserveVisibility)
app.use(pinia)
app.mount('#app')
