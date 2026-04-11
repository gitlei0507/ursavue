<template>
    <el-button type="success" @click="showUrsaMessageBox">显示消息弹框</el-button>
</template>

<script setup>
    import { UrsaMessageBox } from '../../../packages/ursacomponents/src/utils/UrsaMessageBox';


    async function showUrsaMessageBox() {
        const confirmed = await UrsaMessageBox({
            message: '你确定要注销吗？',
        })

        if (!confirmed) {
            return
        }
    }

</script>

<style scoped></style>