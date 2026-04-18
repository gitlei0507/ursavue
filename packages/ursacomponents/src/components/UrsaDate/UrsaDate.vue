<template>
    <el-date-picker v-if="!isDaterange" :model-value="getValue(field.prop)"
        @update:model-value="(value) => setValue(field.prop, value)" :type="field.type ?? 'date'"
        :placeholder="field.placeholder || `请选择${field.label || ''}`" :size="field.size ?? 'default'"
        :format="field.format" :value-format="field.valueFormat ?? 'YYYY-MM-DD HH:mm:ss'" />

    <el-date-picker v-else :model-value="daterangeValue" @update:model-value="handleDaterangeChange" :type="field.type"
        :range-separator="field.rangeSeparator ?? '至'"
        :start-placeholder="field.placeholder || `请选择${field.label || ''}开始时间`"
        :end-placeholder="field.placeholder || `请选择${field.label || ''}结束时间`" :size="field.size ?? 'default'"
        :format="field.format" :value-format="field.valueFormat ?? 'YYYY-MM-DD HH:mm:ss'" />
</template>

<script setup>

    import { computed } from 'vue';
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

    const isDaterange = computed(() => {
        return props.field.type === 'daterange' || props.field.type === 'datetimerange'

    })

    const { getValue, setValue } = useFieldModel(props.model)

    // daterange 且 prop 为数组时，表示双字段模式（如 ['startTime', 'endTime']）
    const hasSplitRangeProp = computed(() => {
        return isDaterange.value && Array.isArray(props.field.prop) && props.field.prop.length >= 2
    })

    const startRangeProp = computed(() => {
        if (!hasSplitRangeProp.value) return undefined
        return props.field.prop[0]
    })

    const endRangeProp = computed(() => {
        if (!hasSplitRangeProp.value) return undefined
        return props.field.prop[1]
    })

    const daterangeValue = computed(() => {
        if (!isDaterange.value) return getValue(props.field.prop)

        // 双字段模式下，组装为日期组件需要的 [start, end] 结构用于回显
        if (hasSplitRangeProp.value) {
            return [
                getValue(startRangeProp.value),
                getValue(endRangeProp.value)
            ]
        }

        // 单字段模式：prop 为字符串，值保持数组
        return getValue(props.field.prop)
    })

    const handleDaterangeChange = (value) => {
        // 双字段模式下，将日期组件返回的数组拆分写回两个字段
        if (hasSplitRangeProp.value) {
            const [start, end] = Array.isArray(value) ? value : [null, null]
            setValue(startRangeProp.value, start)
            setValue(endRangeProp.value, end)
            return
        }

        setValue(props.field.prop, value)
    }

</script>

<style scoped></style>