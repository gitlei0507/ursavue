<template>
    <el-input v-model="model[field.prop]" :placeholder="field.placeholder || `请输入${field.label || ''}`"
        :clearable="field.clearable ?? true" :class="field.class ?? '!w-48'" :size="field.size ?? 'default'"
        v-bind="field.componentProps">
        <template #prefix>
            <slot name="prefix"></slot>
        </template>
    </el-input>
</template>

<script setup>

    defineOptions({
        name: 'UrsaInput'
    })

    const props = defineProps({
        model: {
            type: Object,
            default: () => ({})
        },
        field: {
            type: Object,
            default: () => ({})
        }
    })


</script>

<style scoped></style>