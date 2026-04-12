<template>
    <el-select :model-value="getValue(field.prop)" @update:model-value="(value) => setValue(field.prop, value)"
        :placeholder="field.placeholder || `请选择${field.label || ''}`" :clearable="field.clearable ?? true"
        :multiple="field.multiple ?? false" :filterable="field.filterable ?? true" :class="field.class || '!w-48'"
        v-bind="field.componentProps" @change="handleChange" @blur="handleBlur">
        <slot name="option">
            <el-option v-for="option in field.options || []" :key="option.value" :label="option.label"
                :value="option.value" :disabled="option.disabled ?? false" />
        </slot>
    </el-select>
</template>

<script setup>
    import { useFieldModel } from '../../utils/model/useFieldModel';

    defineOptions({
        name: 'UrsaSelect',
    })

    const emit = defineEmits(['change', 'blur'])

    const props = defineProps({
        field: {
            type: Object,
            default: () => ({})
        },
        model: {
            type: Object,
            default: () => ({})
        },
    })

    const { getValue, setValue } = useFieldModel(props.model)

    const handleChange = (value) => {
        emit('change', value)
    }

    const handleBlur = (value) => {
        emit('blur', value)
    }

</script>
