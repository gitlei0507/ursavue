<template>
    <el-tree-select :data="field.data" v-model="model[field.prop]"
        :placeholder="field.placeholder || `请选择${field.label || ''}`" :class="field.class ?? '!w-48'"
        :filterable="field.filterable ?? true" :show-checkbox="field.showCheckbox ?? true"
        :check-strictly="field.checkStrictly ?? true" :multiple="field.multiple ?? false"
        :default-expanded-keys="getTreeSelectExpandedKeys(field)"
        :popper-class="(field.disableRootSelection ?? true) ? 'ursa-tree-select-popper' : ''">
        <template v-if="field.showIcon ?? true" #default="{ data }">
            <span class="node-row">
                <el-icon class="node-icon">
                    <FolderOpened v-if="data.isFolderOpened" />
                    <Document v-else />
                </el-icon>
                <span class="node-label">{{ data.label }}</span>
            </span>
        </template>
    </el-tree-select>
</template>

<script setup>


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

<style>

    /* 去除根节点前的复选框 */
    .ursa-tree-select-popper .el-tree>.el-tree-node>.el-tree-node__content .el-checkbox {
        display: none;
    }
</style>

<style scoped>

    .node-row {
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }

    .node-icon {
        color: blue;
    }

    .node-label {
        color: #303133;
    }
</style>