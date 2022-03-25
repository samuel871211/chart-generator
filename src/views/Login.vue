<script setup lang="ts">
import {
    ElInput,
    ElButton,
    ElButtonGroup
} from 'element-plus'
import { ref } from 'vue'

const username = ref('yusheng.chen@udngroup.com')
const password = ref('thisisonlyatestpassword')

function forgotPassword (): void {
    alert('我們已經寄信到您的信箱了，請於xx分鐘內完成重設密碼的流程')
}
</script>

<template>
    <div :class="$style.container">
        <div :class="$style.content">
            <h1>Udn Chart Generator</h1>
            <ElInput v-model="username" placeholder="username"></ElInput>
            <ElInput v-model="password" type="password" placeholder="password"></ElInput>
            <ElButtonGroup>
                <ElButton @click="forgotPassword">忘記密碼</ElButton>
                <ElButton @click="$router.push('/template')">登入</ElButton>
            </ElButtonGroup>
        </div>
    </div>
</template>

<style module>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-image: url('../assets/Login.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}
.content {
    border: 0px;
}
.content > h1 {
    text-align: center;
}
</style>