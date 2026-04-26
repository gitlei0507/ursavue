<template>
    <el-card class="search-card" shadow="never">
        <el-form :inline="inline" class="search-form">
            <template v-if="fields.length > 0">
                <el-form-item v-for="field in fields" :key="field.prop || field.label" :label="field.label">
                    <!-- 单行输入框 -->
                    <UrsaInput v-if="field.type === 'input'" :field="field" :model="model" source="search" />

                    <!-- 下拉框     -->
                    <UrsaSelect v-else-if="field.type === 'select'" :field="field" :model="model" @change="field.change"
                        @blur="field.blur" />

                    <!-- 树形下拉框 -->
                    <ursa-tree-select v-else-if="field.type === 'treeselect'" :field="field" :model="model" />

                    <!-- 日期时间 -->
                    <UrsaDate
                        v-else-if="['date', 'week', 'year', 'month', 'dates', 'years', 'months', 'daterange', 'datetime', 'datetimerange'].includes(field.type)"
                        :field="field" :model="model" />


                    <!-- 其他控件 -->
                    <slot v-else name="field" :field="field" :value="getFieldValue(field.prop)"
                        :set-value="(value) => setFieldValue(field.prop, value)" />
                </el-form-item>
            </template>
            <slot v-else />
            <el-form-item>
                <slot name="btnArea">
                    <el-button type="primary" @click="emit('search')" :icon="Search">查询</el-button>
                    <el-button @click="handleReset" :icon="Refresh">重置</el-button>
                </slot>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup>
    import { Refresh, Search } from '@element-plus/icons-vue'
    import UrsaInput from '../UrsaInput/UrsaInput.vue'
    import UrsaSelect from '../UrsaSelect/UrsaSelect.vue'
    import UrsaTreeSelect from '../UrsaTreeSelect/UrsaTreeSelect.vue'
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
