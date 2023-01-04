import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { VueCookieNext } from 'vue-cookie-next'

import './utils/rem.js'
import 'amfe-flexible'

const app =  createApp(App)
app.use(router)
app.use(VueCookieNext)
app.mount('#app')

