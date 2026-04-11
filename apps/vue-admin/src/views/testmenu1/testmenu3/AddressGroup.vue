<template>
    <h2>地址组</h2>
</template>

<script setup>

    const refresh = () => {
        console.log('AddressGroup请求数据');

    }

    defineExpose({ refresh })
</script>

<style scoped></style>