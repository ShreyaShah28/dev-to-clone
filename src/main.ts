import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import 'intersection-observer'
import VueObserveVisibility from 'vue-observe-visibility'

const app=createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(VueObserveVisibility)
app.mount('#app')
