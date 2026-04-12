<template>
    <el-select :model-value="getFieldValue(field.prop)"
        @update:model-value="(value) => setFieldValue(field.prop, value)"
        :placeholder="field.placeholder || `请选择${field.label || ''}`" :clearable="field.clearable ?? true"
        :multiple="field.multiple ?? false" :filterable="field.filterable ?? true" :class="field.class || '!w-48'"
        v-bind="field.componentProps">
        <slot name="option">
            <el-option v-for="option in field.options || []" :key="option.value" :label="option.label"
                :value="option.value" :disabled="option.disabled ?? false" />
        </slot>
    </el-select>
</template>

<script setup>
    defineOptions({
        name: 'UrsaSelect',
    })

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

    const getFieldValue = (prop) => {
        if (!prop || !props.model) {
            return ''
        }
        return props.model[prop]
    }

    const setFieldValue = (prop, value) => {
        if (!prop || !props.model) {
            return
        }
        props.model[prop] = value
    }
</script>
