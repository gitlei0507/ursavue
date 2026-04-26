import { onMounted, ref } from 'vue'

export function useUrsaTable(apiFn, searchForm, defaultSort = {}, showPagination = true, defaultPageSize = 20) {
    // 表格核心状态：数据、加载、分页
    const tableData = ref([])
    const loading = ref(false)
    const currentPage = ref(1)
    const pageSize = ref(Number(defaultPageSize) > 0 ? Number(defaultPageSize) : 20)
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
                ...searchForm
            }

            if (showPagination) {
                payload.pageNum = currentPage.value
                payload.pageSize = pageSize.value
            }

            if (sortField.value && sortOrder.value) {
                payload.sortField = sortField.value
                payload.sortOrder = sortOrder.value
            }

            const res = await apiFn(payload)
            const { rows, total: totalCount } = normalizeListResult(res)

            tableData.value = rows
            total.value = Number(totalCount) || rows.length
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
        handleCurrentChange,
        handleSizeChange,
        handleSortChange,
        handleSelectionChange,
        checkSingleSelect,
        checkHasSelect,
        selectedRows
    }
}