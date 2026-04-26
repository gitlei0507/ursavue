<template>
    <div class="user-list-container">
        <!-- 搜索栏 -->
        <UrsaSearch :model="searchForm" :fields="searchFields" @search="handleSearch" />

        <!-- 列表区域 -->
        <UrsaTable ref="ursaTableRef" :listFun="list" :searchForm="searchForm" :columnFields="columnFields"
            :defaultSort="{ prop: 'username', order: 'ascending' }" @add="handleAddAction" @view="handleViewAction"
            @edit="handleEditAction" @delete="handleDeleteAction">
            <template #toolbar>
                <el-button type="primary" @click="openAddDialog" :icon="Plus">新增</el-button>
                <el-button type="warning" @click="openNewEdit" :icon="Edit">新开标签编辑</el-button>
            </template>
        </UrsaTable>
    </div>


    <!-- 用户表单 -->
    <UrsaForm ref="userFormRef" v-model="dialogVisible" :title="isView ? '查看用户' : (isEdit ? '编辑用户' : '新增用户')"
        :model="userForm" :fields="userFormFields" :rules="rules" :readonly="isView" :loading="submitLoading"
        @submit="submitForm" />

</template>

<script setup>
    import { createUser, deleteUser, list, updateUser } from '@/api/user';
    import { useUser } from '@/composables/useUser';
    import router from '@/router';
    import { Edit, Plus } from '@element-plus/icons-vue';
    import { UrsaForm, UrsaMessageBox, UrsaSearch, UrsaTable } from 'ursacomponents';
    import { reactive, ref } from 'vue';

    const ursaTableRef = ref(null)

    // 查询对象
    const searchForm = reactive({
        username: '',
        email: '',
        role: '',
        terminal: '',
        cttimestart: '',
        cttimeend: '',
        uptimestart: '',
        uptimeend: ''

    })

    // 查询字段配置
    const searchFields = [
        {
            type: 'input',
            prop: 'username',
            label: '姓名'
        },
        {
            type: 'input',
            prop: 'email',
            label: '邮箱'
        },
        {
            type: 'select',
            prop: 'role',
            label: '角色',
            options: [
                { label: '系统管理员', value: '1' },
                { label: '普通用户', value: '2' },
            ]
        },
        {
            type: 'treeselect',
            prop: 'terminal',
            label: '类型',
            data: [
                {
                    value: 'root',
                    label: '资产类型',
                    isFolderOpened: true,
                    children: [
                        {
                            value: 'camera',
                            label: '网络设备',
                            isFolderOpened: true,
                            children: [
                                { value: 'networkcamera', label: '网络摄像机', isFolderOpened: false },
                                { value: 'networkdisk', label: '网络硬盘录像机', isFolderOpened: false },
                            ],
                        },
                        {
                            value: 'security',
                            label: '安全设备',
                            isFolderOpened: true
                        },
                    ],
                },
            ]
        },
        {
            type: 'datetime',
            prop: 'cttimestart',
            label: '创建时间开始',
        },
        {
            type: 'date',
            prop: 'cttimeend',
            label: '创建时间结束',
        },
        {
            type: 'datetimerange',
            prop: ['uptimestart', 'uptimeend'],
            label: '更新',
        }
    ]

    // 列表字段配置
    const columnFields = [
        {
            prop: 'username',
            label: '姓名',
            minWidth: '200',
            valueAlign: 'left'
        },
        {
            prop: 'email',
            label: '邮箱',
            showOverflowTooltip: true
        },
        {
            prop: 'role',
            label: '角色',
            minWidth: '300',
            tagMap: {
                1: { label: '管理员', type: 'danger', effect: 'dark' },
                2: { label: '普通用户', type: 'success', effect: 'dark' }
            },
            tagDefault: ({ value }) => ({ label: value ?? '-' })
        }
    ]

    // 表单字段
    const userFormFields = [
        {
            type: 'input',
            prop: 'id',
            label: 'ID',
            hidden: true
        },
        {
            type: 'input',
            prop: 'uid',
            label: '用户ID',
        },
        {
            type: 'input',
            prop: 'username',
            label: '用户名',
        },
        {
            type: 'password',
            prop: 'password',
            label: '密码',
        },
        {
            type: 'input',
            prop: 'email',
            label: '邮箱',
        },
        {
            type: 'select',
            prop: 'role',
            label: '角色',
            options: [
                { label: '管理员', value: '1' },
                { label: '普通用户', value: '2' }
            ]
        }
    ]


    const handleSearch = () => {
        ursaTableRef.value?.handleSearch?.()
    }




    const {
        dialogVisible,
        submitLoading,
        userForm,
        userFormRef,
        isEdit,
        isView,
        openAddDialog,
        openEditDialog,
        openViewDialog,
        submitForm,
        rules
    } = useUser(createUser, updateUser, handleSearch)

    // 查看
    const handleViewAction = ({ row }) => {
        openViewDialog(row)
    }

    // 新增
    const handleAddAction = () => {
        openAddDialog()
    }

    // 编辑
    const handleEditAction = ({ row }) => {
        openEditDialog(row)
    }

    // 删除
    const handleDeleteAction = async ({ row }) => {
        const confirmed = await UrsaMessageBox({
            message: '你确定要删除吗？',
        })

        if (!confirmed) {
            return
        }
        console.log('##', row);

        try {
            const res = await deleteUser(row)
            if (res === 1) {
                ElMessage.success('删除成功')
                handleSearch()
            } else {
                ElMessage.error('删除失败')
            }
        } catch (error) {
            ElMessage.error(`删除失败：${error.message || error}`)
        }
    }


    // 新开标签编辑
    function openNewEdit() {
        if (ursaTableRef.value?.checkSingleSelect?.()) {
            ElMessage.warning('请选择一条数据进行编辑')
            return
        }

        const selectedRow = ursaTableRef.value?.selectedRows?.[0]

        const id = selectedRow.id
        router.push({
            path: '/user/edit',
            query: { id: String(id) }
        })
    }

</script>

<style scoped>
    .user-list-container {
        padding: 20px;
        background-color: #f0f2f5;
        height: 100%;
        min-height: 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }

    :deep(.el-button + .el-button) {
        margin-left: 8px;
    }

    /* 弹窗样式 */
    .user-form {
        padding: 10px 20px 0;
    }

    .dialog-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
    }

    :deep(.el-dialog__header) {
        padding: 20px 20px 15px;
        border-bottom: 1px solid #f0f0f0;
        margin-right: 0;
    }

    :deep(.el-dialog__body) {
        padding: 20px 20px 10px;
    }

    :deep(.el-dialog__footer) {
        padding: 15px 20px 20px;
        border-top: 1px solid #f0f0f0;
    }

    :deep(.el-form-item) {
        margin-bottom: 22px;
    }

    :deep(.el-input__prefix) {
        display: flex;
        align-items: center;
    }

    :deep(.el-select .el-input__prefix) {
        left: 8px;
    }

    /* 只读模式样式 */
    :deep(.el-input[readonly] .el-input__wrapper) {
        background-color: #f5f7fa;
        box-shadow: 0 0 0 1px #e4e7ed inset;
        cursor: default;
    }

    :deep(.el-input[readonly] .el-input__inner) {
        color: #606266;
        cursor: default;
    }

    :deep(.el-select.is-disabled .el-input__wrapper) {
        background-color: #f5f7fa;
        box-shadow: 0 0 0 1px #e4e7ed inset;
        cursor: default;
    }

    /* 禁用 el-tag 过渡动画 */
    :deep(.el-tag) {
        transition: none !important;
        min-width: 80px;
        justify-content: center;
    }
</style>
