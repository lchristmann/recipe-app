import { createApp } from 'vue'
import './style.css'
import App from '@/App.vue'
import router from '@/router'
import Footer from '@/components/Footer.vue'

createApp(App)
    .use(router)    // Install Vue Router
    .component('Footer', Footer) // Register global component
    .mount('#app')      // Mount the app
