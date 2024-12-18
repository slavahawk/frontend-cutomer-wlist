import './assets/main.css'
// import { registerSW } from 'virtual:pwa-register'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)




app.use(createPinia())
app.use(router)

app.mount('#app')
//
// const intervalMS = 6000
// const updateSW = registerSW({
//     onRegistered(r) {
//         r && setInterval(() => {
//             r.update()
//         }, intervalMS)
//     }
// })
