<template>
    <el-dialog v-model="dialogVisible" title="查看流程图" width="800px">
        <h2>测试</h2>
    </el-dialog>
</template>

<script setup>

    const props = defineProps({
        modelValue: {
            type: Boolean,
            default: false
        },
    })

    const dialogVisible = computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value)
    })

</script>

<style scoped></style>