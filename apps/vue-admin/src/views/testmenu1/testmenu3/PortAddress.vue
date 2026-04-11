<template>
    <h2>端口组</h2>
</template>

<script setup>
    const refresh = () => {
        console.log('PortGroup请求数据');

    }

    defineExpose({ refresh })
</script>

<style scoped></style>