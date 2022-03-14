import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import Home from './views/Home.vue'
import ChartEditor from './views/ChartEditor.vue'

const router = createRouter({
    routes: [
        { path: '/', component: Home },
        { path: '/chart-editor', component: ChartEditor }
    ],
    history: createWebHistory()
})
const AppIns = createApp(App)
AppIns.use(ElementPlus)
AppIns.use(router)
AppIns.mount('#app')
