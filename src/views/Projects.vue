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
import { UserFilled } from '@element-plus/icons-vue'
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
const userId = '4f4e70ce-db80-462d-a02d-025b56c659c9'
const router = useRouter()
function assignTo (chartType: string): void {
  router.push(`/chart-editor/${chartType}`)
}
</script>

<template>
  <el-container>
    <el-header>
      <div :class="$style.headerWrapper">
        <h1>My Projects</h1>
        <el-dropdown>
          <el-icon><user-filled/></el-icon>
          <span>yusheng.chen@udn.group.com</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.push(`/profile/${userId}`)">My Profile</el-dropdown-item>
              <el-dropdown-item @click="$router.push(`/projects/${userId}`)">My Projects</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/')">Sign Out</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-main :class="$style.main">
      <el-row justify="center">
        <el-col :xs="24" :sm="12" :md="8">
          <el-tooltip content="編輯">
            <el-button size="large" @click="assignTo('line-chart')">custom Line Chart - 20220301</el-button>
          </el-tooltip>
          <Line :data="lineChartDefaultData" current-page="台中" size="normal"/>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8">
          <el-tooltip content="編輯">
            <el-button size="large" @click="assignTo('grouped-bar-chart')">custom grouped bar chart - 20220302</el-button>
          </el-tooltip>
          <GroupedBarChart :data="groupedBarChartDefaultData"/>
        </el-col>
        
        <el-col :xs="24" :sm="12" :md="8">
          <el-tooltip content="編輯">
            <el-button size="large" @click="assignTo('stacked-horizontal-bar-chart')">隨意命名的test</el-button>
          </el-tooltip>
          <StackedHorizontalBar :data="stackedHorizontalDefaultData"/>
        </el-col>
        
        <el-col :xs="24" :sm="12" :md="8">
          <el-tooltip content="編輯">
            <el-button size="large" @click="assignTo('donut-chart')">2022年的甜甜圈</el-button>
          </el-tooltip>
          <donut :data="donutChartDefaultData"/>
        </el-col>
        
        <el-col :xs="24" :sm="12" :md="8">
          <el-tooltip content="編輯">
            <el-button size="large" @click="assignTo('tree-map')">這是一個長方形</el-button>
          </el-tooltip>
          <treemap :data="treemapDefaultData"/>
        </el-col>
        
        <el-col :xs="24" :sm="12" :md="8">
          <el-tooltip content="編輯">
            <el-button size="large" @click="assignTo('connected-dot-plot')">2011 - 2020 六縣市成長比例</el-button>
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
.headerWrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #cccccc;
}
.headerWrapper > h1 {
  flex-grow: 1;
}
</style>