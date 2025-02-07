import { createApp } from 'vue'
import './style.css'
import App from '@/App.vue'
import Footer from '@/components/Footer.vue'

const app = createApp(App)

app.component('Footer', Footer) // global registration - can be used anywhere

app.mount('#app')
