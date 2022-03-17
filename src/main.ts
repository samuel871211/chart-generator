import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import Home from './views/Home.vue'
import Line from './views/ChartEditor/Line.vue'
import StackedHorizontalBar from './views/ChartEditor/StackedHorizontalBar.vue'
import GroupedBar from './views/ChartEditor/GroupedBar.vue'
import Donut from './views/ChartEditor/Donut.vue'
import TreeMap from './views/ChartEditor/TreeMap.vue'
import ConnectedDotPlot from './views/ChartEditor/ConnectedDotPlot.vue'

const router = createRouter({
    routes: [
        { path: '/', component: Home },
        { path: '/chart-editor/line-chart', component: Line },
        { path: '/chart-editor/grouped-bar-chart', component: GroupedBar },
        { path: '/chart-editor/stacked-horizontal-bar-chart', component: StackedHorizontalBar },
        { path: '/chart-editor/donut-chart', component: Donut },
        { path: '/chart-editor/tree-map', component: TreeMap },
        { path: '/chart-editor/connected-dot-plot', component: ConnectedDotPlot }
    ],
    history: createWebHistory()
})
const AppIns = createApp(App)
AppIns.use(ElementPlus)
AppIns.use(router)
AppIns.mount('#app')
