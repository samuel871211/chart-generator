<script setup lang="ts">
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting
} from '@element-plus/icons-vue'
import Line from '../components/chart/Line.vue'
import BarChart from '../components/chart/Bar.vue'
import StackedHorizontalBar from '../components/chart/StackedHorizontalBar.vue'
import donut from '../components/chart/donut.vue'
import treemap from '../components/chart/treemap.vue'
import dotplot from '../components/chart/dotplot.vue'
import { lineChartDefaultData } from '../data/lineChart'
import { barChartDefaultData } from '../data/barChart'
import { stackedHorizontalDefaultData } from '../data/poll'
import donutChartDefaultData from '../data/donutChartDefaultData.json'
import treemapDefaultData from '../data/treemapDefaultData.json'
import dotplotDefaultData from '../data/dotplotDefaultData.json'
import { PUREHTML } from '../data/PureHTML'
import { ref } from 'vue'
const showHTMLResult = ref(false)
const disabled = ref(true)
const type = ref<'primary' | 'success'>('primary')
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
function test () {
    disabled.value = false
    type.value = 'success'
    setTimeout(() => {
        disabled.value = true
        type.value = 'primary'
    }, 1000)
}
</script>

<template>
    <el-container>
        <el-header>
            <br/>
            <el-button>Home</el-button>
            <el-button @click="showHTMLResult = !showHTMLResult">export as HTML</el-button>
            <el-button>export as Image</el-button>
            <el-divider></el-divider>
        </el-header>
        <el-main>
            <el-row>
                <el-col :xs="12" :sm="6" :md="4">
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                    >
                        <el-sub-menu index="1">
                        <template #title>
                            <el-icon><Location/></el-icon>
                            <span>Chart type</span>
                        </template>
                        <el-menu-item index="1-1">Line chart</el-menu-item>
                        <el-menu-item index="1-2">Grouped bar chart</el-menu-item>
                        <el-menu-item index="1-3">Stacked horizontal bar chart</el-menu-item>
                        <el-menu-item index="1-4">Donut chart</el-menu-item>
                        <el-menu-item index="1-5">Tree map</el-menu-item>
                        <el-menu-item index="1-6">Connected dot plot</el-menu-item>
                        <!-- <el-menu-item-group title="Group One">
                            <el-menu-item index="1-1">item one</el-menu-item>
                            <el-menu-item index="1-2">item one</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="Group Two">
                            <el-menu-item index="1-3">item three</el-menu-item>
                        </el-menu-item-group> -->
                        <!-- <el-sub-menu index="1-4">
                            <template #title>item four</template>
                            <el-menu-item index="1-4-1">item one</el-menu-item>
                        </el-sub-menu> -->
                        </el-sub-menu>
                        <el-menu-item index="2">
                            <el-icon><IconMenu/></el-icon>
                            <span>Colors</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <el-icon><Document/></el-icon>
                            <span>X Axis</span>
                        </el-menu-item>
                        <el-menu-item index="5">
                            <el-icon><Setting/></el-icon>
                            <span>Y Axis</span>
                        </el-menu-item>
                        <el-menu-item index="6">
                            <el-icon><Setting/></el-icon>
                            <span>Y Axis</span>
                        </el-menu-item>
                        <el-menu-item index="7">
                            <el-icon><Setting/></el-icon>
                            <span>Background</span>
                        </el-menu-item>
                        <el-menu-item index="8">
                            <el-icon><Setting/></el-icon>
                            <span>Legend</span>
                        </el-menu-item>
                        <el-menu-item index="9">
                            <el-icon><Setting/></el-icon>
                            <span>Title</span>
                        </el-menu-item>
                        <el-menu-item index="10">
                            <el-icon><Setting/></el-icon>
                            <span>SubTitle</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :xs="12" :sm="18" :md="20">
                    <Line :data="lineChartDefaultData" size="normal" current-page="台北"></Line>
                </el-col>
                <el-col :xs="24" v-show="showHTMLResult">
                <el-tooltip :disabled="disabled" content="Copied">
                    <el-button @click="test" :type="type">Copy Result</el-button>
                </el-tooltip>
                    <pre>
                        <code>
                            {{PUREHTML}}
                        </code>
                    </pre>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>