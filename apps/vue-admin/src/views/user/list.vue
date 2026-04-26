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
        :model="userForm" :fields="formFields" :rules="rules" :readonly="isView" :loading="submitLoading"
        @submit="submitForm" />

</template>

<script setup>
    import { createUser, deleteUser, list, updateUser } from '@/api/user';
    import router from '@/router';
    import { useUser } from '@/views/user/composables/useUser';
    import { formFields } from '@/views/user/config/form.config';
    import { searchFields, searchForm } from '@/views/user/config/search.config';
    import { columnFields } from '@/views/user/config/table.config';
    import { Edit, Plus } from '@element-plus/icons-vue';
    import { UrsaForm, UrsaMessageBox, UrsaSearch, UrsaTable } from 'ursacomponents';
    import { ref } from 'vue';

    const ursaTableRef = ref(null)

    // 查询
    const handleSearch = () => {
        ursaTableRef.value?.handleSearch?.()
    }

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
</style>
