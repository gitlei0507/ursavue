import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, ref } from 'vue'

export function useUrsaTable(apiFn, searchForm, defaultSort = {}) {
    // 表格核心状态：数据、加载、分页
    const tableData = ref([])
    const loading = ref(false)
    const currentPage = ref(1)
    const pageSize = ref(5)
    const total = ref(0)

    // defaultSort.order 为 Element Plus 格式(ascending/descending)，需转换为后端格式(asc/desc)
    const sortField = ref(defaultSort.prop || '')
    const sortOrder = ref(
        defaultSort.order
            ? (defaultSort.order === 'ascending' ? 'asc' : 'desc')
            : ''
    )

    // 兼容常见后端返回结构，统一转换为 { rows, total }
    const normalizeListResult = (res) => {
        if (Array.isArray(res)) {
            return {
                rows: res,
                total: res.length
            }
        }

        const rows = res?.records || res?.list || res?.rows || res?.data || []
        const totalCount = res?.total ?? res?.count ?? rows.length

        return {
            rows,
            total: totalCount
        }
    }

    // 拉取列表数据：拼接查询条件、分页和排序参数
    const fetchData = async () => {
        loading.value = true
        try {
            const payload = {
                ...searchForm,
                pageNum: currentPage.value,
                pageSize: pageSize.value
            }

            if (sortField.value && sortOrder.value) {
                payload.sortField = sortField.value
                payload.sortOrder = sortOrder.value
            }

            const res = await apiFn(payload)
            const { rows, total: totalCount } = normalizeListResult(res)
            tableData.value = rows
            total.value = Number(totalCount) || 0
        } catch (error) {
            console.error('获取失败：', error)
        } finally {
            loading.value = false
        }
    }

    // 搜索时回到第一页，避免页码越界
    const handleSearch = () => {
        currentPage.value = 1
        fetchData()
    }

    // 切换页码后重新查询
    const handleCurrentChange = (page) => {
        currentPage.value = page
        fetchData()
    }

    // 切换每页条数后回到第一页
    const handleSizeChange = (size) => {
        pageSize.value = size
        currentPage.value = 1
        fetchData()
    }

    const handleSortChange = ({ prop, order }) => {
        // order: ascending(升序) / descending(降序) / null(取消排序)
        if (!order) {
            return
        }

        sortField.value = prop
        sortOrder.value = order === 'ascending' ? 'asc' : 'desc'
        currentPage.value = 1
        fetchData()
    }

    // 通用删除确认流程：确认 -> 调用删除接口 -> 成功后刷新列表
    const handleDelete = (index, row, options = {}, callback) => {
        const { nameField = '', confirmText = '确定要删除', onSuccess } = options
        const msg = row?.[nameField] ? `【${row?.[nameField]}】` : ''

        ElMessageBox.confirm(
            `${confirmText}${msg}吗？`,
            '警告',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(async () => {
            try {
                const res = await callback(row)
                if (res === 1) {
                    ElMessage.success('删除成功')
                    if (typeof onSuccess === 'function') {
                        onSuccess(row)
                    }
                    handleSearch()
                } else {
                    ElMessage.error('删除失败')
                }
            } catch (error) {
                ElMessage.error(`删除失败：${error.message || error}`)
            }
        }).catch(() => {
            // 点击取消
        })
    }


    // 用于收集列表选中的行对象
    const selectedRows = ref([])

    // 勾选行选择框
    const handleSelectionChange = (rows) => {
        selectedRows.value = rows
    }

    // 是否只选中一条记录
    const checkSingleSelect = () => {
        return selectedRows.value.length !== 1
    }

    // 是否选中记录
    const checkHasSelect = () => {
        return selectedRows.value.length !== 0
    }

    // 组件挂载后自动加载数据
    onMounted(fetchData)


    return {
        tableData,
        currentPage,
        pageSize,
        total,
        searchForm,
        fetchData,
        handleSearch,
        handleDelete,
        handleCurrentChange,
        handleSizeChange,
        handleSortChange,
        handleSelectionChange,
        checkSingleSelect,
        checkHasSelect,
        selectedRows
    }
}