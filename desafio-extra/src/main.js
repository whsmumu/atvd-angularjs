import { createApp } from 'vue'
import App from './App.vue'
import toast from './plugins/toast'
import './styles/global.css'

createApp(App).use(toast).mount('#app')
