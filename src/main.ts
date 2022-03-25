import { createApp } from 'vue'
import { createRouter, createWebHistory, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Line from './views/ChartEditor/Line.vue'
import LinePublish from './views/LinePublish.vue'
import StackedHorizontalBar from './views/ChartEditor/StackedHorizontalBar.vue'
import GroupedBar from './views/ChartEditor/GroupedBar.vue'
import Donut from './views/ChartEditor/Donut.vue'
import TreeMap from './views/ChartEditor/TreeMap.vue'
import ConnectedDotPlot from './views/ChartEditor/ConnectedDotPlot.vue'
import Profile from './views/Profile.vue'
import Projects from './views/Projects.vue'

const router = createRouter({
    routes: [
        { path: '/', component: Login },
        { path: '/template', component: Home },
        { path: '/editor/line-chart', component: Line },
        { path: '/editor/grouped-bar-chart', component: GroupedBar },
        { path: '/editor/stacked-horizontal-bar-chart', component: StackedHorizontalBar },
        { path: '/editor/donut-chart', component: Donut },
        { path: '/editor/tree-map', component: TreeMap },
        { path: '/editor/connected-dot-plot', component: ConnectedDotPlot },
        { path: '/profile/:userId', component: Profile },
        { path: '/projects/:userId', component: Projects },
        { path: '/publish/line-chart/:uuid', component: LinePublish }                                                        
    ],
    history: createWebHistory()
})
// router.beforeEach(function validLogin (
//     to: RouteLocationNormalized,
//     from: RouteLocationNormalized,
//     next: NavigationGuardNext
// ) {
//     console.log(to, from, next)
// })
const AppIns = createApp(App)
AppIns.use(ElementPlus)
AppIns.use(router)
AppIns.mount('#app')
