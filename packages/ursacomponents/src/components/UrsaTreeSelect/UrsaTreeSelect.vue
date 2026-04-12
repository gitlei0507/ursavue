<template>
    <el-tree-select :data="field.data" :model-value="getValue(field.prop)"
        @update:model-value="(value) => setValue(field.prop, value)"
        :placeholder="field.placeholder || `请选择${field.label || ''}`" :class="field.class ?? '!w-48'" :disabled="false"
        :show-checkbox="true" :default-expanded-keys="getTreeSelectExpandedKeys(field)" />
</template>

<script setup>

    import { useFieldModel } from '../../utils/model/useFieldModel'

    defineOptions({
        name: 'UrsaTreeSelect',
    })

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


    // 获取树节点主键字段，优先读取组件透传配置，未配置时回退到 value。
    const getTreeNodeKeyField = (field) => {
        return field?.componentProps?.props?.value || field?.componentProps?.nodeKey || field?.componentProps?.['node-key'] || 'value'
    }

    // 默认展开根节点
    const getTreeSelectExpandedKeys = (field) => {
        const data = Array.isArray(field?.data) ? field.data : []
        const keyField = getTreeNodeKeyField(field)

        return data
            .map((node) => node?.[keyField])
            .filter((key) => key !== undefined && key !== null && key !== '')
    }

</script>

<style scoped></style>