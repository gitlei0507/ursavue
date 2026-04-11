const s=`<template>\r
    <el-button type="success" @click="showUrsaMessageBox">显示消息弹框</el-button>\r
</template>\r
\r
<script setup>\r
    import { UrsaMessageBox } from '../../../../packages/ursacomponents/src/utils/UrsaMessageBox';\r
\r
\r
    async function showUrsaMessageBox() {\r
        const confirmed = await UrsaMessageBox({\r
            message: '你确定要注销吗？',\r
        })\r
\r
        if (!confirmed) {\r
            return\r
        }\r
    }\r
\r
<\/script>\r
\r
<style scoped></style>`;export{s as default};
