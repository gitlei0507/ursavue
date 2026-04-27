<template>
    <el-select v-model="model[field.prop]" :placeholder="field.placeholder || `请选择${field.label || ''}`"
        :clearable="field.clearable ?? true" :multiple="field.multiple ?? false" :filterable="field.filterable ?? true"
        :disabled="effectiveReadonly" :class="field.class ?? source === 'form' ? '!w-full' : '!w-48'"
        :size="field.size ?? 'default'" v-bind="field.componentProps" @change="handleChange" @blur="handleBlur">
        <slot name="option">
            <el-option v-for="option in field.options || []" :key="option.value" :label="option.label"
                :value="option.value" :disabled="option.disabled ?? false" />
        </slot>
        <template v-if="field.icon" #prefix>
            <slot name="prefixIcon">
                <el-icon>
                    <component :is="field.icon" />
                </el-icon>
            </slot>
        </template>
    </el-select>
</template>

<script setup>

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
        readonly: {
            type: Boolean,
            default: false
        },
        source: {
            type: String,
            default: 'form'
        }
    })

    const effectiveReadonly = computed(() => {
        return props.field.readonly ?? props.readonly
    })


    const handleChange = (value) => {
        emit('change', value)
    }

    const handleBlur = (value) => {
        emit('blur', value)
    }

</script>
