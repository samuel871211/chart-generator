<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Line from '../components/chart/Line.vue'
import GroupedBarChart from '../components/chart/GroupedBar.vue'
import StackedHorizontalBar from '../components/chart/StackedHorizontalBar.vue'
import donut from '../components/chart/donut.vue'
import treemap from '../components/chart/treemap.vue'
import dotplot from '../components/chart/dotplot.vue'
import { lineChartDefaultData } from '../data/lineChart'
import { groupedBarChartDefaultData } from '../data/groupedBarChart'
import { stackedHorizontalDefaultData } from '../data/poll'
import donutChartDefaultData from '../data/donutChartDefaultData.json'
import treemapDefaultData from '../data/treemapDefaultData.json'
import dotplotDefaultData from '../data/dotplotDefaultData.json'
import {
  ElContainer,
  ElHeader,
  ElMain,
  ElDivider,
  ElRow,
  ElCol,
  ElTooltip,
  ElButton
} from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
function assignTo (chartType: string): void {
  router.push(`/chart-editor/${chartType}`)
}
</script>

<template>
  <el-container>
    <el-header>
      <h1>Udn Chart Genrator</h1>
      <el-divider></el-divider>
    </el-header>
    <el-main :class="$style.main">
      <el-row justify="center">
        <el-col :xs="24" :sm="24" :md="24">
          <h2>Choose a template</h2>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <el-tooltip content="line chart">
            <el-button size="large" @click="assignTo('line-chart')">line chart</el-button>
          </el-tooltip>
          <Line :data="lineChartDefaultData" current-page="台中" size="normal"/>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8">
          <el-tooltip content="grouped bar chart">
            <el-button size="large" @click="assignTo('grouped-bar-chart')">grouped bar chart</el-button>
          </el-tooltip>
          <GroupedBarChart :data="groupedBarChartDefaultData"/>
        </el-col>
        
        <el-col :xs="24" :sm="12" :md="8">
          <el-tooltip content="stacked horizontal bar chart">
            <el-button size="large" @click="assignTo('stacked-horizontal-bar-chart')">stacked horizontal bar chart</el-button>
          </el-tooltip>
          <StackedHorizontalBar :data="stackedHorizontalDefaultData"/>
        </el-col>
        
        <el-col :xs="24" :sm="12" :md="8">
          <el-tooltip content="donut chart">
            <el-button size="large" @click="assignTo('donut-chart')">donut chart</el-button>
          </el-tooltip>
          <donut :data="donutChartDefaultData"/>
        </el-col>
        
        <el-col :xs="24" :sm="12" :md="8">
          <el-tooltip content="tree map">
            <el-button size="large" @click="assignTo('tree-map')">tree map</el-button>
          </el-tooltip>
          <treemap :data="treemapDefaultData"/>
        </el-col>
        
        <el-col :xs="24" :sm="12" :md="8">
          <el-tooltip content="connected dot plot">
            <el-button size="large" @click="assignTo('connected-dot-plot')">connected dot plot</el-button>
          </el-tooltip>
          <dotplot :data="dotplotDefaultData"/>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<style module>
.main {
  overflow: hidden;
}
</style>