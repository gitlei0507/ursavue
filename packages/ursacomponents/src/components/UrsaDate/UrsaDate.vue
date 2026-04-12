<template>
    <el-date-picker :model-value="getValue(field.prop)" @update:model-value="(value) => setValue(field.prop, value)"
        :type="field.type ?? 'date'" :placeholder="field.placeholder || `请选择${field.label || ''}`"
        :size="field.size ?? 'default'" />
</template>

<script setup>

    import { useFieldModel } from '../../utils/model/useFieldModel';

    const props = defineProps({
        field: {
            type: Object,
            default: () => ({})
        },
        model: {
            type: Object,
            default: () => ({})
        }
    })

    const { getValue, setValue } = useFieldModel(props.model)

</script>

<style scoped></style>