<script setup lang="ts">
import { Location } from '@element-plus/icons-vue'
import Line from '../../components/chart/Line.vue'
import { lineChartDefaultData } from '../../data/lineChart'
import {
    ElContainer,
    ElHeader,
    ElButton,
    ElDivider,
    ElMain,
    ElRow,
    ElCol,
    ElMenu,
    ElSubMenu,
    ElMenuItemGroup,
    ElMenuItem,
    ElIcon,
    ElInput
} from 'element-plus'
import CSVTable from '../../components/CSVTable.vue'
import { PUREHTML } from '../../data/PureHTML'
import { reactive, ref } from 'vue'
const isShow = reactive({
    htmlResult: false,
    title: true,
    subTitle: true,
    legend: true,
    xAxis: true,
    yAxis: true,
    chartPreview: true
})
const customTitle = ref('')
const type = ref<'primary' | 'success'>('primary')
function handleSelect (index: string) {
    switch (index) {
    case 'titleShow': {
        isShow.title = true
        // todo: flag作為props傳入Line Component，目前先用暴力解，直接修改DOM
        const elements = document.getElementsByClassName('chart-line-title');
        (elements[0] as HTMLDivElement).style.display = 'block'
        return
    }
    case 'titleHidden': {
        isShow.title = false
        // todo: flag作為props傳入Line Component，目前先用暴力解，直接修改DOM
        const elements = document.getElementsByClassName('chart-line-title');
        (elements[0] as HTMLDivElement).style.display = 'none'
        return
    }
    case 'subTitleShow': {
        isShow.subTitle = true
        // todo: flag作為props傳入Line Component，目前先用暴力解，直接修改DOM
        const elements = document.getElementsByClassName('chart-line-subTitle');
        (elements[0] as HTMLDivElement).style.display = 'block'
        return
    }
    case 'subTitleHidden': {
        isShow.subTitle = false
        // todo: flag作為props傳入Line Component，目前先用暴力解，直接修改DOM
        const elements = document.getElementsByClassName('chart-line-subTitle');
        (elements[0] as HTMLDivElement).style.display = 'none'
        return
    }
    case 'legendShow': {
        isShow.legend = true
        // todo: flag作為props傳入Line Component，目前先用暴力解，直接修改DOM
        const elements = document.getElementsByClassName('chart-line-legendList');
        (elements[0] as HTMLDivElement).style.display = 'flex'
        return
    }
    case 'legendHidden': {
        isShow.legend = false
        // todo: flag作為props傳入Line Component，目前先用暴力解，直接修改DOM
        const elements = document.getElementsByClassName('chart-line-legendList');
        (elements[0] as HTMLDivElement).style.display = 'none'
        return
    }
    case 'colorsPalette1':
        // todo: handle css
        return
    case 'colorsPalette2':
        // todo: handle css
        return
    case 'xAxisShow': {
        isShow.xAxis = true
        // todo: flag作為props傳入Line Component，目前先用暴力解，直接修改DOM
        const elements = document.getElementsByClassName('chart-line-xAxisScales');
        (elements[0] as HTMLDivElement).style.display = 'flex'
        return
    }
    case 'xAxisHidden': {
        isShow.xAxis = false
        // todo: flag作為props傳入Line Component，目前先用暴力解，直接修改DOM
        const elements = document.getElementsByClassName('chart-line-xAxisScales');
        (elements[0] as HTMLDivElement).style.display = 'none'
        return
    }
    case 'yAxisShow': {
        isShow.yAxis = true
        // todo: flag作為props傳入Line Component，目前先用暴力解，直接修改DOM
        const elements = document.getElementsByClassName('chart-line-yAxisScales');
        (elements[0] as HTMLDivElement).style.display = 'flex'
        return
    }
    case 'yAxisHidden': {
        isShow.yAxis = false
        // todo: flag作為props傳入Line Component，目前先用暴力解，直接修改DOM
        const elements = document.getElementsByClassName('chart-line-yAxisScales');
        (elements[0] as HTMLDivElement).style.display = 'none'
        return
    }
    case 'widthAuto':
        // todo: handle auto width
        return
    case 'widthFixed':
        // todo: handle fixed width
        return
    case 'heightAuto':
        // todo: handle auto height
        return
    case 'heightFixed':
        // todo: handle fixed height
        return
    }
}
function temp () {
    type.value = 'success'
    setTimeout(() => {
        type.value = 'primary'
    }, 1000)
}
function temp2 () {
    const elements = document.getElementsByClassName('chart-line-title');
    (elements[0] as HTMLDivElement).innerText = customTitle.value
}
function handleLegendAlignment (align: string) {
    const elements = document.getElementsByClassName('chart-line-legendList');
    (elements[0] as HTMLDivElement).style.justifyContent = align
}
</script>

<template>
    <el-container>
        <el-header>
            <br/>
            <el-button @click="$router.push('/')">Home</el-button>
            <el-button @click="isShow.htmlResult = !isShow.htmlResult">export as HTML</el-button>
            <el-button>export as Image</el-button>
            <el-divider></el-divider>
        </el-header>
        <el-main>
            <el-row>
                <el-col :xs="24" :sm="24" :md="24">
                    <div :class="$style.btnGroupWrapper">
                        <el-button-group>
                            <el-button @click="isShow.chartPreview = true">Preview</el-button>
                            <el-button @click="isShow.chartPreview = false">Data</el-button>
                        </el-button-group>
                    </div>
                </el-col>
                <el-col :xs="12" :sm="6" :md="4" v-show="isShow.chartPreview">
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @select="handleSelect"
                    >
                        <el-sub-menu index="title">
                            <template #title>
                                <el-icon><Location/></el-icon>
                                <span>Title</span>
                            </template>
                            <el-menu-item-group title="Mode">
                                <el-menu-item index="titleShow">Show</el-menu-item>
                                <el-menu-item index="titleHidden">Hidden</el-menu-item>
                            </el-menu-item-group>
                            <el-input @blur="temp2" v-model="customTitle" placeholder="title..."/>
                        </el-sub-menu>
                        <el-sub-menu index="subtitle">
                            <template #title>
                                <el-icon><Location/></el-icon>
                                <span>Subtitle</span>
                            </template>
                            <el-menu-item-group title="Mode">
                                <el-menu-item index="subTitleShow">Show</el-menu-item>
                                <el-menu-item index="subTitleHidden">Hidden</el-menu-item>
                            </el-menu-item-group>
                            <el-input placeholder="subtitle..."/>
                        </el-sub-menu>
                        <el-sub-menu index="legend">
                            <template #title>
                                <el-icon><Location/></el-icon>
                                <span>Legend</span>
                            </template>
                            <el-menu-item-group title="Mode">
                                <el-menu-item index="legendShow">Show</el-menu-item>
                                <el-menu-item index="legendHidden">Hidden</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="Alignment">
                                <el-button-group>
                                    <el-button @click="handleLegendAlignment('left')">Left</el-button>
                                    <el-button @click="handleLegendAlignment('center')">Center</el-button>
                                    <el-button @click="handleLegendAlignment('right')">Right</el-button>
                                </el-button-group>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-sub-menu index="colors">
                            <template #title>
                                <el-icon><Location/></el-icon>
                                <span>Colors</span>
                            </template>
                            <div>Recommend</div>
                            <div :class="$style.paletteGroup">
                                <div :style="{ backgroundColor: '#dbf4adff' }"></div>
                                <div :style="{ backgroundColor: '#a9e190ff' }"></div>
                                <div :style="{ backgroundColor: '#cdc776ff' }"></div>
                                <div :style="{ backgroundColor: '#a5aa52ff' }"></div>
                                <div :style="{ backgroundColor: '#767522ff' }"></div>
                            </div>
                            <div :class="$style.paletteGroup">
                                <div :style="{ backgroundColor: '#edadc7ff' }"></div>
                                <div :style="{ backgroundColor: '#d199b6ff' }"></div>
                                <div :style="{ backgroundColor: '#c493b0ff' }"></div>
                                <div :style="{ backgroundColor: '#a68ba5ff' }"></div>
                                <div :style="{ backgroundColor: '#5c5d67ff' }"></div>
                            </div>
                            <div :class="$style.paletteGroup">
                                <div :style="{ backgroundColor: '#f2f3aeff' }"></div>
                                <div :style="{ backgroundColor: '#edd382ff' }"></div>
                                <div :style="{ backgroundColor: '#fc9e4fff' }"></div>
                                <div :style="{ backgroundColor: '#f4442eff' }"></div>
                                <div :style="{ backgroundColor: '#020122ff' }"></div>
                            </div>
                            <div :class="$style.paletteGroup">
                                <div :style="{ backgroundColor: '#94b9afff' }"></div>
                                <div :style="{ backgroundColor: '#90a583ff' }"></div>
                                <div :style="{ backgroundColor: '#9d8420ff' }"></div>
                                <div :style="{ backgroundColor: '#942911ff' }"></div>
                                <div :style="{ backgroundColor: '#593837ff' }"></div>
                            </div>
                            <div :class="$style.paletteGroup">
                                <div :style="{ backgroundColor: '#ffaf87ff' }"></div>
                                <div :style="{ backgroundColor: '#ff8e72ff' }"></div>
                                <div :style="{ backgroundColor: '#ed6a5eff' }"></div>
                                <div :style="{ backgroundColor: '#4ce0b3ff' }"></div>
                                <div :style="{ backgroundColor: '#377771ff' }"></div>
                            </div>
                            <el-divider></el-divider>
                            <div>Custom override</div>
                            <el-input
                                :rows="5"
                                type="textarea"
                                placeholder="available type: hex rgb hsl"
                            />
                        </el-sub-menu>
                        <el-sub-menu index="xAxis">
                            <template #title>
                                <el-icon><Location/></el-icon>
                                <span>X Axis</span>
                            </template>
                            <el-menu-item-group title="Mode">
                                <el-menu-item index="xAxisShow">Show</el-menu-item>
                                <el-menu-item index="xAxisHidden">Hidden</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-sub-menu index="yAxis">
                            <template #title>
                                <el-icon><Location/></el-icon>
                                <span>Y Axis</span>
                            </template>
                            <el-menu-item-group title="Mode">
                                <el-menu-item index="yAxisShow">Show</el-menu-item>
                                <el-menu-item index="yAxisHidden">Hidden</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-sub-menu index="layout">
                            <template #title>
                                <el-icon><Location/></el-icon>
                                <span>Layout</span>
                            </template>
                            <el-menu-item-group title="width">
                                <el-menu-item index="widthAuto">auto</el-menu-item>
                                <el-menu-item index="widthFixed">fixed</el-menu-item>
                            </el-menu-item-group>
                            <el-input placeholder="width..."></el-input>
                            <el-menu-item-group title="height">
                                <el-menu-item index="heightAuto">auto</el-menu-item>
                                <el-menu-item index="heightFixed">fixed</el-menu-item>
                            </el-menu-item-group>
                            <el-input placeholder="height..."></el-input>
                        </el-sub-menu>
                    </el-menu>
                </el-col>
                <el-col v-show="isShow.chartPreview" :xs="12" :sm="18" :md="20">
                    <Line :data="lineChartDefaultData" size="normal" current-page="台北"></Line>
                </el-col>
                <el-col v-show="!isShow.chartPreview" :xs="24" :sm="24" :md="24">
                    <CSVTable/>
                </el-col>
                <el-col :xs="24" v-show="isShow.htmlResult">
                    <el-button @click="temp" :type="type">Copy Result</el-button>
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

<style module>
.paletteGroup {
    display: flex;
    width: 100%;
    height: 24px;
    margin-bottom: 4px;
}
.paletteGroup > div {
    width: 20%;
    height: 100%;
}
.btnGroupWrapper {
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>