<script setup lang="ts">
import {
    ElDescriptions,
    ElButton,
    ElDescriptionsItem,
    ElIcon
} from 'element-plus'
import {
  User,
  Iphone,
  Location,
  Tickets,
  OfficeBuilding,
} from '@element-plus/icons-vue'
</script>

<template>
    <el-descriptions
        class="margin-top"
        title="陳昱昇的Profile"
        :column="3"
        size="large"
        border
    >
        <template #extra>
        <el-button type="primary" @click="$router.push('/home')">Home</el-button>
        </template>
        <el-descriptions-item>
        <template #label>
            <div class="cell-item">
            <el-icon>
                <user />
            </el-icon>
            Username
            </div>
        </template>
        kooriookami
        </el-descriptions-item>
        <el-descriptions-item>
        <template #label>
            <div class="cell-item">
            <el-icon>
                <iphone />
            </el-icon>
            Telephone
            </div>
        </template>
        18100000000
        </el-descriptions-item>
        <el-descriptions-item>
        <template #label>
            <div class="cell-item">
            <el-icon>
                <location />
            </el-icon>
            Place
            </div>
        </template>
        Suzhou
        </el-descriptions-item>
        <el-descriptions-item>
        <template #label>
            <div class="cell-item">
            <el-icon>
                <tickets />
            </el-icon>
            Remarks
            </div>
        </template>
        <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
        <template #label>
            <div class="cell-item">
            <el-icon>
                <office-building />
            </el-icon>
            Address
            </div>
        </template>
        No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item>
    </el-descriptions>
</template>