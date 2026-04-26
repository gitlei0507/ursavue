<template>
    <el-card class="table-card" shadow="never">
        <div v-if="props.showToolbar && $slots.toolbar" class="toolbar">
            <slot name="toolbar" />
        </div>

        <div class="table-wrapper">
            <el-table stripe border style="width: 100%" height="100%" :data="tableData" v-loading="loading"
                :default-sort="props.defaultSort" @sort-change="handleSortChange"
                @selection-change="handleSelectionChange">
                <el-table-column v-if="props.showIndex" type="index" :label="props.indexLabel" :width="props.indexWidth"
                    align="center" :index="calcIndex" />
                <el-table-column v-if="props.showSelection" type="selection" :width="props.selectionWidth"
                    align="center" />

                <template v-if="!Array.isArray(props.columnFields) || props.columnFields.length === 0">
                    <slot />
                </template>

                <template v-else>
                    <el-table-column v-for="column in props.columnFields" :key="column.prop || column.label"
                        :prop="column.prop" :label="column.label" :width="column.width ?? undefined"
                        :min-width="column.minWidth" :align="column.valueAlign ?? 'center'"
                        :header-align="column.headerAlign ?? 'center'" :sortable="column.sortable ?? 'custom'"
                        :fixed="column.fixed" :show-overflow-tooltip="column.showOverflowTooltip ?? false">
                        <template #default="scope">
                            <slot v-if="hasColumnSlot(column)" :name="getColumnSlotName(column)" :row="scope.row"
                                :index="scope.$index" :column="column" :value="getCellValue(scope.row, column)"></slot>

                            <template v-else-if="hasTagStyle(column)">
                                <el-tag v-if="resolveTagConfig(column, scope.row, scope.$index)"
                                    :type="resolveTagConfig(column, scope.row, scope.$index).type"
                                    :effect="resolveTagConfig(column, scope.row, scope.$index).effect"
                                    :size="resolveTagConfig(column, scope.row, scope.$index).size"
                                    :round="resolveTagConfig(column, scope.row, scope.$index).round"
                                    :hit="resolveTagConfig(column, scope.row, scope.$index).hit">
                                    {{ resolveTagConfig(column, scope.row, scope.$index).label }}
                                </el-tag>
                                <span v-else>{{ formatCellText(column, scope.row, scope.$index) }}</span>
                            </template>

                            <span v-else>{{ formatCellText(column, scope.row, scope.$index) }}</span>
                        </template>
                    </el-table-column>
                </template>

                <!-- 操作区域 -->
                <el-table-column v-if="props.showActionColumn" :label="resolvedActionColumn.label"
                    :width="resolvedActionColumn.width" :align="resolvedActionColumn.align"
                    :fixed="resolvedActionColumn.fixed">
                    <template #default="scope">
                        <template v-for="button in resolvedActionButtons"
                            :key="button.key ?? button.event ?? button.label">
                            <el-button v-if="isActionVisible(button, scope.row, scope.$index)"
                                :link="button.link ?? true" :type="button.type ?? 'primary'"
                                :size="button.size ?? 'small'" :icon="button.icon"
                                @click="handleActionClick(button, scope)">
                                {{ button.label }}
                            </el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 分页区域 -->
        <template v-if="props.showPagination">
            <div class="pagination-container">
                <div class="pagination-wrapper">
                    <el-pagination :current-page="currentPage" :page-size="pageSize" background
                        layout="total, sizes, prev, pager, next, jumper" :total="total"
                        @current-change="handleCurrentChange" @size-change="handleSizeChange" />
                </div>
            </div>
        </template>
    </el-card>
</template>

<script setup>
    import { Delete, Edit, View } from '@element-plus/icons-vue'
import { computed, useSlots } from 'vue'
import { useUrsaTable } from './useUrsaTable.js'


    defineOptions({
        name: 'UrsaTable'
    })

    // 接收组件传递的属性
    const props = defineProps({
        // 查询方法
        listFun: {
            type: Function,
            default: undefined
        },
        // 查询区域对象
        searchForm: {
            type: Object,
            default: () => ({})
        },
        // 要显示的数据列
        columnFields: {
            type: Array,
            default: () => []
        },
        // 默认排序方式
        defaultSort: {
            type: Object,
            default: () => ({})
        },
        // 是否显示序号，默认显示
        showIndex: {
            type: Boolean,
            default: true
        },
        // 序号列列名
        indexLabel: {
            type: String,
            default: '序号'
        },
        // 序号列宽度 
        indexWidth: {
            type: Number,
            default: 70
        },
        // 是否显示行选择框
        showSelection: {
            type: Boolean,
            default: true
        },
        // 行选择框宽度
        selectionWidth: {
            type: Number,
            default: 55
        },
        // 是否在每行最后显示操作列
        showActionColumn: {
            type: Boolean,
            default: true
        },
        // 是否显示分页
        showPagination: {
            type: Boolean,
            default: true
        },
        // 默认每页显示数量
        defaultPageSize: {
            type: Number,
            default: 20
        },
        // 是否显示顶部操作栏
        showToolbar: {
            type: Boolean,
            default: true
        },
        actionColumn: {
            type: Object,
            default: () => ({
                label: '操作',
                width: 240,
                align: 'center',
                fixed: 'right'
            })
        }
    })

    const {
        tableData,
        loading,
        currentPage,
        pageSize,
        total,
        handleSearch,
        handleCurrentChange,
        handleSizeChange,
        handleSortChange,
        handleSelectionChange,
        checkSingleSelect,
        checkHasSelect,
        selectedRows
    } = useUrsaTable(props.listFun, props.searchForm, props.defaultSort, props.showPagination, props.defaultPageSize)


    // 计算序号
    const calcIndex = (index) => (currentPage.value - 1) * pageSize.value + index + 1

    const emit = defineEmits([
        'view',
        'edit',
        'delete',
    ])

    const slots = useSlots()

    // 列表操作列默认按钮组合
    const defaultActionButtons = [
        {
            key: 'view',
            label: '查看',
            type: 'info',
            size: 'small',
            link: true,
            icon: View,
            event: 'view'
        },
        {
            key: 'edit',
            label: '编辑',
            type: 'primary',
            size: 'small',
            link: true,
            icon: Edit,
            event: 'edit'
        },
        {
            key: 'delete',
            label: '删除',
            type: 'danger',
            size: 'small',
            link: true,
            icon: Delete,
            event: 'delete'
        }
    ]

    const resolvedActionColumn = computed(() => ({
        label: props.actionColumn?.label ?? '操作',
        width: props.actionColumn?.width ?? 240,
        align: props.actionColumn?.align ?? 'center',
        fixed: props.actionColumn?.fixed ?? 'right'
    }))

    const resolvedActionButtons = computed(() => {
        const configButtons = props.actionColumn?.buttons
        if (Array.isArray(configButtons) && configButtons.length > 0) {
            return configButtons
        }
        return defaultActionButtons
    })

    const getCellValue = (row, column) => {
        if (!column?.prop) {
            return undefined
        }
        return row?.[column.prop]
    }

    const formatCellText = (column, row, index) => {
        const value = getCellValue(row, column)
        if (typeof column?.formatter === 'function') {
            return column.formatter({ value, row, index, column })
        }
        return value ?? ''
    }

    const getColumnSlotName = (column) => column?.slot || (column?.prop ? `col-${column.prop}` : '')

    const hasColumnSlot = (column) => {
        const slotName = getColumnSlotName(column)
        return Boolean(slotName && slots[slotName])
    }

    const hasTagStyle = (column) => {
        return typeof column?.tagMap === 'function' || typeof column?.tagMap === 'object'
    }

    const normalizeTagConfig = (rawConfig, fallbackLabel) => {
        if (!rawConfig) {
            return null
        }
        if (typeof rawConfig === 'string') {
            return { label: rawConfig }
        }
        return {
            label: rawConfig.label ?? fallbackLabel,
            type: rawConfig.type,
            effect: rawConfig.effect,
            size: rawConfig.size,
            round: rawConfig.round,
            hit: rawConfig.hit
        }
    }

    const resolveTagConfig = (column, row, index) => {
        const value = getCellValue(row, column)
        let tagConfig = null

        if (typeof column?.tagMap === 'function') {
            tagConfig = column.tagMap({ value, row, index, column })
        } else if (column?.tagMap && typeof column.tagMap === 'object') {
            tagConfig = column.tagMap[value]
        }

        if (!tagConfig && typeof column?.tagDefault === 'function') {
            tagConfig = column.tagDefault({ value, row, index, column })
        } else if (!tagConfig) {
            tagConfig = column?.tagDefault
        }

        return normalizeTagConfig(tagConfig, value)
    }

    // 控制按钮是否显示
    const isActionVisible = (button, row, index) => {
        if (!button || typeof button !== 'object') {
            return false
        }
        if (typeof button.visible === 'function') {
            return button.visible({ row, index })
        }
        if (typeof button.visible === 'boolean') {
            return button.visible
        }
        return true
    }

    // 操作列按钮点击统一封装
    const handleActionClick = (button, scope) => {
        const payload = {
            action: button.key ?? button.event ?? 'action',
            row: scope.row,
            index: scope.$index,
            button
        }

        if (typeof button.onClick === 'function') {
            button.onClick(payload)
            return
        }

        emit(button.event ?? button.key ?? 'action', payload)
    }

    // 对外暴露方法
    defineExpose({ handleSearch, checkSingleSelect, checkHasSelect, selectedRows })

</script>

<style scoped>
    .table-card {
        border-radius: 8px;
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .table-card :deep(.el-card__body) {
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow: hidden;
        padding: 20px;
    }

    .toolbar {
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        flex-shrink: 0;
    }

    .table-wrapper {
        flex: 1;
        overflow: hidden;
        min-height: 0;
    }

    .pagination-container {
        margin-top: 20px;
        padding-top: 20px;
        display: flex;
        justify-content: flex-end;
        flex-shrink: 0;
        border-top: 1px solid #f0f0f0;
    }

    .pagination-wrapper {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    :deep(.el-table) {
        font-size: 14px;
    }

    :deep(.el-table th.el-table__cell) {
        background-color: #fafafa;
        color: #333;
        font-weight: 600;
    }

    :deep(.el-button + .el-button) {
        margin-left: 8px;
    }

    :deep(.el-tag) {
        transition: none !important;
        min-width: 80px;
        justify-content: center;
    }
</style>
