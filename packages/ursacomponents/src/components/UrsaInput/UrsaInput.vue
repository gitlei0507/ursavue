<template>
    <el-input :model-value="getValue(field.prop)" @update:model-value="(value) => setValue(field.prop, value)"
        :placeholder="field.placeholder || `请输入${field.label || ''}`" :clearable="field.clearable ?? true"
        :class="field.class ?? '!w-48'" :size="field.size ?? 'default'" v-bind="field.componentProps">
        <template #prefix>
            <slot name="prefix"></slot>
        </template>
    </el-input>
</template>

<script setup>
    import { useFieldModel } from '../../utils/model/useFieldModel';

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

    const { getValue, setValue } = useFieldModel(props.model)

</script>

<style scoped></style>