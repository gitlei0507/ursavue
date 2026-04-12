<template>
    <el-card class="search-card" shadow="never">
        <el-form :inline="inline" class="search-form">
            <template v-if="fields.length > 0">
                <!-- 单行输入框 -->
                <el-form-item v-for="field in fields" :key="field.prop || field.label" :label="field.label">
                    <el-input v-if="field.type === 'input'" :model-value="getFieldValue(field.prop)"
                        @update:model-value="(value) => setFieldValue(field.prop, value)"
                        :placeholder="field.placeholder || `请输入${field.label || ''}`"
                        :clearable="field.clearable ?? true" :class="field.class ?? '!w-48'"
                        v-bind="field.componentProps" />

                    <!-- 下拉框     -->
                    <UrsaSelect v-else-if="field.type === 'select'" :field="field" :model="model" />

                    <!-- 树形下拉框 -->
                    <el-tree-select v-else-if="field.type === 'treeselect'" :data="field.data"
                        :model-value="getFieldValue(field.prop)"
                        @update:model-value="(value) => setFieldValue(field.prop, value)"
                        :placeholder="field.placeholder || `请选择${field.label || ''}`" :class="field.class ?? '!w-48'"
                        :disabled="false" :show-checkbox="true"
                        :default-expanded-keys="getTreeSelectExpandedKeys(field)" />

                    <!-- 其他控件 -->
                    <slot v-else name="field" :field="field" :value="getFieldValue(field.prop)"
                        :set-value="(value) => setFieldValue(field.prop, value)" />
                </el-form-item>
            </template>
            <slot v-else />
            <el-form-item>
                <el-button type="primary" @click="emit('search')" :icon="Search">查询</el-button>
                <el-button @click="handleReset" :icon="Refresh">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup>
    import { Refresh, Search } from '@element-plus/icons-vue'
    import UrsaSelect from '../UrsaSelect/UrsaSelect.vue'
    import { useUrsaSearch } from './useUrsaSearch'

    defineOptions({
        name: 'UrsaSearch'
    })

    const props = defineProps({
        model: {
            type: Object,
            default: () => ({})
        },
        fields: {
            type: Array,
            default: () => []
        },
        inline: {
            type: Boolean,
            default: true
        }
    })

    const emit = defineEmits(['search', 'reset'])

    const { resetSearch } = useUrsaSearch(
        props.model,
        () => emit('search'),
        () => emit('reset')
    )

    const handleReset = () => {
        resetSearch()
    }

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

    // 获取树节点主键字段，优先读取组件透传配置，未配置时回退到 value。
    const getTreeNodeKeyField = (field) => {
        return field?.componentProps?.props?.value || field?.componentProps?.nodeKey || field?.componentProps?.['node-key'] || 'value'
    }

    // 默认展开根节点，使树形下拉初始展示到“根节点下一层”。
    const getTreeSelectExpandedKeys = (field) => {
        const data = Array.isArray(field?.data) ? field.data : []
        const keyField = getTreeNodeKeyField(field)

        return data
            .map((node) => node?.[keyField])
            .filter((key) => key !== undefined && key !== null && key !== '')
    }
</script>

<style scoped>
    .search-card {
        margin-bottom: 16px;
        border-radius: 8px;
        flex-shrink: 0;
    }

    .search-form {
        margin-bottom: 0;
    }
</style>
