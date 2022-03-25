<script setup lang="ts">
import Line from '../components/chart/Line.vue'
import { lineChartDefaultData } from '../data/lineChart'
</script>
<template>
    <Line :data="lineChartDefaultData" size="normal" current-page="台北"></Line>
</template>