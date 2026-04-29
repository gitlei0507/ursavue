<template>
    <div class="user-list-container">
        <!-- 搜索栏 -->
        <UrsaSearch :model="searchForm" :fields="searchFields" @search="handleSearch" />

        <!-- 列表区域 -->
        <UrsaTable ref="ursaTableRef" :listFun="listUser" :searchForm="searchForm" :columnFields="columnFields"
            :defaultSort="{ prop: 'username', order: 'ascending' }" @view="handleViewAction" @edit="handleEditAction"
            @delete="handleDeleteAction">
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
    import { createUser, deleteUser, listUser, updateUser } from '@/api/user';
    import router from '@/router';
    import { useUser } from '@/views/user/composables/useUser';
    import { createFormFields } from '@/views/user/config/form.config';
    import { createSearchFields, searchForm } from '@/views/user/config/search.config';
    import { createColumnFields } from '@/views/user/config/table.config';
    import { Edit, Plus } from '@element-plus/icons-vue';
    import { UrsaForm, UrsaSearch, UrsaTable } from 'ursacomponents';
    import { ref } from 'vue';

    const ursaTableRef = ref(null)

    // 从后台获取的下拉数据
    const roles = [
        { label: '管理员', value: '1' },
        { label: '普通用户', value: '2' }
    ]

    const roleTagMap = {
        1: { label: '管理员', type: 'danger', effect: 'dark' },
        2: { label: '普通用户', type: 'success', effect: 'dark' }
    }

    // 生成查询元素对象
    const searchFields = createSearchFields({ roles })

    // 生成列表元素对象
    const columnFields = createColumnFields({ roleTagMap })

    // 生成表单元素对象
    const formFields = createFormFields({ roles })
    // 动态给字段添加属性
    // updateFieldConfig(formFields, 'birth', { readonly: true })



    // 查询
    const handleSearch = () => {
        ursaTableRef.value.handleSearch()
    }

    // 查看
    const handleViewAction = ({ row }) => {
        openViewDialog(row)
    }

    // 编辑
    const handleEditAction = ({ row }) => {
        openEditDialog(row)
    }

    // 删除
    const handleDeleteAction = async ({ row }) => {
        await handleDelete(row)
    }

    // 控件内容改变时触发
    // const handleChange = ({ field, value }) => {
    //     switch (field) {
    //         case 'role': {
    //             alert(value)
    //         }
    //     }
    // }


    // 新开标签编辑
    function openNewEdit() {
        if (!ursaTableRef.value.isSingleSelect()) return

        const selectedRow = ursaTableRef.value.selectedRows[0]

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
        handleDelete,
        submitForm,
        rules
    } = useUser(createUser, updateUser, deleteUser, handleSearch)



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
