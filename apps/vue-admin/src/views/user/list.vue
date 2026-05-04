<template>
    <div class="user-list-container">
        <!-- 搜索栏 -->
        <UrsaSearch :model="searchForm" :fields="searchFields" @search="handleSearch" />

        <!-- 列表区域 -->
        <UrsaTable ref="ursaTableRef" :listFun="listUser" :searchForm="searchForm" :columnFields="columnFields"
            :defaultSort="{ prop: 'username', order: 'ascending' }" @view="({ row }) => openViewDialog(row)"
            @edit="({ row }) => openEditDialog(row)" @delete="({ row }) => handleDelete(row)">
            <template #toolbar>
                <el-button type="primary" @click="openAddDialog" :icon="Plus">新增</el-button>
                <el-button type="warning" @click="openNewEdit" :icon="Edit">新开标签编辑</el-button>
                <el-button type="primary" @click="openProcess" :icon="View">查看流程图</el-button>
            </template>
        </UrsaTable>
    </div>


    <!-- 用户表单 -->
    <UrsaForm ref="userFormRef" v-model="dialogVisible" :title="isView ? '查看用户' : (isEdit ? '编辑用户' : '新增用户')"
        :model="userForm" :fields="formFields" :rules="rules" :readonly="isView" :loading="submitLoading"
        @submit="submitForm" />


    <!-- 查看流程图组件 -->
    <ProcessView v-model="processVisible" :xml="xml"></ProcessView>

</template>

<script setup>
    import { getXml } from '@/api/process';
    import { createUser, deleteUser, listUser, updateUser } from '@/api/user';
    import router from '@/router';
    import { createDynamicRoute } from '@/router/dynamic-routes';
    import { useUser } from '@/views/user/composables/useUser';
    import { createUserCrudConfig } from '@/views/user/schema/user.schema';
    import { Edit, Plus, View } from '@element-plus/icons-vue';
    import { ProcessView, UrsaForm, UrsaSearch, UrsaTable } from 'ursacomponents';
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

    const terminalSelTree = [
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
                        { value: 'networkdisk', label: '网络硬盘录像机', isFolderOpened: false }
                    ]
                },
                {
                    value: 'security',
                    label: '安全设备',
                    isFolderOpened: true
                }
            ]
        }
    ]

    // 统一生成查询/表格/表单配置
    const { searchForm, form: userForm, searchFields, columnFields, formFields } = createUserCrudConfig({
        roles,
        roleTagMap,
        terminalSelTree
    })

    // 动态给字段添加属性
    // updateFieldConfig(formFields, 'birth', { readonly: true })

    // 查询
    const handleSearch = () => ursaTableRef.value?.handleSearch()

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
        createDynamicRoute(router, {
            path: '/user/edit',
            name: 'userEdit',
            viewPath: 'user/edit',
            meta: { title: '编辑用户' }
        })

        router.push({
            path: '/user/edit',
            query: { id: String(id) }
        })
    }

    const processVisible = ref(false)
    const xml = ref()
    const openProcess = async () => {
        const resp = await getXml()
        xml.value = resp

        processVisible.value = true
    }


    const {
        dialogVisible,
        submitLoading,
        userFormRef,
        isEdit,
        isView,
        openAddDialog,
        openEditDialog,
        openViewDialog,
        handleDelete,
        submitForm,
        rules
    } = useUser({
        api: {
            createUser,
            updateUser,
            deleteUser
        },
        onSearch: handleSearch,
        form: userForm
    })



</script>

<style scoped></style>
