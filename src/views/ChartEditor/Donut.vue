<script setup lang="ts">
import { Location } from '@element-plus/icons-vue'
import donut from '../../components/chart/donut.vue'
import donutChartDefaultData from '../../data/donutChartDefaultData.json'
import { PUREHTML } from '../../data/PureHTML'
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
            <el-button @click="$router.push('/')">Home</el-button>
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
                                <span>Title</span>
                            </template>
                            <el-menu-item-group title="Mode">
                                <el-menu-item index="1-1">Show</el-menu-item>
                                <el-menu-item index="1-2">Hidden</el-menu-item>
                            </el-menu-item-group>
                            <el-input placeholder="title..."/>
                        </el-sub-menu>
                        <el-sub-menu index="2">
                            <template #title>
                                <el-icon><Location/></el-icon>
                                <span>Subtitle</span>
                            </template>
                            <el-menu-item-group title="Mode">
                                <el-menu-item index="2-1">Show</el-menu-item>
                                <el-menu-item index="2-2">Hidden</el-menu-item>
                            </el-menu-item-group>
                            <el-input placeholder="subtitle..."/>
                        </el-sub-menu>
                        <el-sub-menu index="3">
                            <template #title>
                                <el-icon><Location/></el-icon>
                                <span>Legend</span>
                            </template>
                            <el-menu-item-group title="Mode">
                                <el-menu-item index="3-1">Show</el-menu-item>
                                <el-menu-item index="3-2">Hidden</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="Alignmnet">
                                <el-button-group>
                                    <el-button>Left</el-button>
                                    <el-button>Center</el-button>
                                    <el-button>Right</el-button>
                                </el-button-group>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-sub-menu index="4">
                            <template #title>
                                <el-icon><Location/></el-icon>
                                <span>Colors</span>
                            </template>
                            <el-menu-item-group title="Palette">
                                <el-menu-item index="4-1">UDN Palette 1</el-menu-item>
                                <el-menu-item index="4-2">UDN Palette 2</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-sub-menu index="5">
                            <template #title>
                                <el-icon><Location/></el-icon>
                                <span>X Axis</span>
                            </template>
                            <el-menu-item-group title="Mode">
                                <el-menu-item index="5-1">Show</el-menu-item>
                                <el-menu-item index="5-3">Hidden</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-sub-menu index="6">
                            <template #title>
                                <el-icon><Location/></el-icon>
                                <span>Y Axis</span>
                            </template>
                            <el-menu-item-group title="Mode">
                                <el-menu-item index="6-1">Show</el-menu-item>
                                <el-menu-item index="6-2">Hidden</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-sub-menu index="7">
                            <template #title>
                                <el-icon><Location/></el-icon>
                                <span>Layout</span>
                            </template>
                            <el-menu-item-group title="width">
                                <el-menu-item index="7-1">auto</el-menu-item>
                                <el-menu-item index="7-2">fixed</el-menu-item>
                            </el-menu-item-group>
                            <el-input placeholder="width..."></el-input>
                            <el-menu-item-group title="height">
                                <el-menu-item index="7-1">auto</el-menu-item>
                                <el-menu-item index="7-2">fixed</el-menu-item>
                            </el-menu-item-group>
                            <el-input placeholder="height..."></el-input>
                        </el-sub-menu>
                    </el-menu>
                </el-col>
                <el-col :xs="12" :sm="18" :md="20">
                    <donut :data="donutChartDefaultData"/>
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