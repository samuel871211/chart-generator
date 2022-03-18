<script setup lang="ts">
import {
    ElButton,
    ElButtonGroup,
    ElDivider,
    ElInput,
    ElAlert
} from 'element-plus'
import { ref } from 'vue'
const currentRows = ref(8)
const currentColumns = ref(6)
const isAdded = ref(false)
const temp = ref(12345)
const table = ref<HTMLTableElement>()
const fileInput = ref<HTMLInputElement>()

function insertRow () {
    currentRows.value += 1
}
function insertColumn () {
    currentColumns.value += 1
}
function handleCtxMenu (e: MouseEvent) {
    e.preventDefault();
    const inputEl = e.currentTarget as HTMLInputElement
    const bgColor = inputEl.style.backgroundColor
    if (bgColor === 'rgb(103, 194, 58)') {
        inputEl.style.backgroundColor = ''
    } else {
        isAdded.value = true
        inputEl.style.backgroundColor = 'rgb(103, 194, 58)'
        setTimeout(() => isAdded.value = false, 1000)
    }
}
</script>
<template>
    <ElDivider></ElDivider>
    <ElButtonGroup>
        <ElButton @click="insertRow">Insert row</ElButton>
        <ElButton @click="insertColumn">Insert column</ElButton>
        <ElButton @click="fileInput?.click()">Upload data</ElButton>
        <ElButton>Download as CSV</ElButton>
        <ElButton>Download as JSON</ElButton>
    </ElButtonGroup>
    <ElDivider></ElDivider>
    <table ref="table" :class="$style.table">
        <thead>
            <tr>
                <th>@@@</th>
                <th>台北</th>
                <th>新北</th>
                <th>桃園</th>
                <th>台中</th>
                <th>台南</th>
                <th>高雄</th>
                <th v-for="cols in currentColumns - 6">
                    column
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td v-for="cols in currentColumns">
                    <ElInput v-model="temp" @contextmenu="handleCtxMenu"/>
                </td>
            </tr>
            <tr>
                <td>2</td>
                <td v-for="cols in currentColumns">
                    <ElInput v-model="temp" @contextmenu="handleCtxMenu"/>
                </td>
            </tr>
            <tr>
                <td>3</td>
                <td v-for="cols in currentColumns">
                    <ElInput v-model="temp" @contextmenu="handleCtxMenu"/>
                </td>
            </tr>
            <tr>
                <td>4</td>
                <td v-for="cols in currentColumns">
                    <ElInput v-model="temp" @contextmenu="handleCtxMenu"/>
                </td>
            </tr>
            <tr>
                <td>5</td>
                <td v-for="cols in currentColumns">
                    <ElInput v-model="temp" @contextmenu="handleCtxMenu"/>
                </td>
            </tr>
            <tr>
                <td>6</td>
                <td v-for="cols in currentColumns">
                    <ElInput v-model="temp" @contextmenu="handleCtxMenu"/>
                </td>
            </tr>
            <tr>
                <td>7</td>
                <td v-for="cols in currentColumns">
                    <ElInput v-model="temp" @contextmenu="handleCtxMenu"/>
                </td>
            </tr>
            <tr>
                <td>8</td>
                <td v-for="cols in currentColumns">
                    <ElInput v-model="temp" @contextmenu="handleCtxMenu"/>
                </td>
            </tr>
            <tr v-for="rows in currentRows - 8">
                <td>{{rows + 8}}</td>
                <td v-for="cols in currentColumns">
                    <ElInput v-model="temp" @contextmenu="handleCtxMenu"/>
                </td>
            </tr>
        </tbody>
    </table>
    <el-alert :class="$style.alert" v-show="isAdded" title="successfully added target point" type="success" effect="dark" />
    <input ref="fileInput" type="file" accept=".csv" :style="{ display: 'none' }"/>
</template>
<style module>
.table {
    width: 100%;
    overflow-x: auto;
}
.table th, .table td {
    border: 1px solid black;
    height: 32px;
}
.alert span {
    font-size: 24px !important;
}
</style>