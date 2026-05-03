<template>
    <div class="user-list-container">
        <!-- 搜索栏 -->
        <UrsaSearch :model="searchForm" :fields="searchFields" @search="handleSearch" />

        <!-- 列表区域 -->
        <UrsaTable ref="ursaTableRef" :listFun="list" :searchForm="searchForm" :columnFields="columnFields"
            :defaultSort="{ prop: 'serverip', order: 'ascending' }" :showActionColumn="false">
            <template #toolbar>
                <el-button type="success" @click="openViewDialog" :icon="View">查看</el-button>
                <el-button type="primary" @click="openAddDialog" :icon="Plus">新增</el-button>
                <el-button type="warning" @click="openEditDialog()" :icon="Edit">
                    编辑
                </el-button>
                <el-button type="danger" @click="handleDelete(scope.$index, scope.row, {
                    nameField: 'servername',
                    confirmText: '确认要删除SNMP服务器'
                }, deleteSnmpServer)" :icon="Delete">
                    删除
                </el-button>
                <UrsaDropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="enable">启用</el-dropdown-item>
                        <el-dropdown-item command="disable">停用</el-dropdown-item>
                    </el-dropdown-menu>
                </UrsaDropdown>
            </template>
        </UrsaTable>
    </div>


    <!-- 表单 -->
    <UrsaForm ref="snmpServerFormRef" v-model="dialogVisible"
        :title="isView ? '查看SNMP配置' : (isEdit ? '编辑SNMP配置' : '新增SNMP配置')" width="800px" :model="snmpServerForm"
        :fields="formFields" :rules="rules" :readonly="isView" :loading="submitLoading" @submit="submitForm" />
</template>

<script setup>
    import { createSnmpServer, deleteSnmpServer, list, updateSnmpServer } from '@/api/snmpServer';
    import { useSnmpServer } from '@/views/config/composables/useSnmpServer';
    import { createSnmpServerCrudConfig } from '@/views/config/schema/snmpserver.schema';
    import { Delete, Edit, Plus, View } from '@element-plus/icons-vue';

    const ver = [
        { label: 'v2c', value: 'v2c' },
        { label: 'v3', value: 'v3' },
    ]

    const enable = [
        { label: '启用', value: '1' },
        { label: '停用', value: '0' },
    ]

    const certmethodOption = [
        { label: 'SHA', value: '1' },
        { label: 'MD5', value: 'MD5' },
        { label: 'SHA2-256', value: '3' },
        { label: '不认证', value: '99' },
    ]

    const encryptmethodOption = [
        { label: '3DES', value: '1' },
        { label: 'AES-128', value: '2' },
        { label: 'AES-192', value: '3' },
        { label: 'AES-256', value: '4' },
        { label: 'DES-56', value: '5' },
        { label: '不加密', value: '99' },
    ]

    const enableTagMap = {
        1: { label: '启用', type: 'success', effect: 'dark' },
        0: { label: '停用', type: 'danger', effect: 'dark' }
    }

    const { searchForm, searchFields, columnFields, form: snmpServerForm, formFields } = createSnmpServerCrudConfig({ ver, enable, enableTagMap, certmethodOption, encryptmethodOption })

    const ursaTableRef = ref(null)

    // 查询
    const handleSearch = () => ursaTableRef.value?.handleSearch()

    const {
        dialogVisible,
        submitLoading,
        snmpServerFormRef,
        openViewDialog,
        openAddDialog,
        openEditDialog,
        isEdit,
        isView,
        rules,
        submitForm } = useSnmpServer({
            api: {
                create: createSnmpServer,
                update: updateSnmpServer,
                deleteSnmpServer
            },
            onSearch: handleSearch,
            form: snmpServerForm,
            option: {
                ursaTableRef
            }
        })

</script>

<style scoped></style>