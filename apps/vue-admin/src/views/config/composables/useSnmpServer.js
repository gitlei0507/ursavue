import { deleteSnmpServer } from '@/api/snmpServer'
import { resetForm, setFormData, useDelete, useSubmit } from '@/utils/form/formData'
import { createRules } from '@/utils/form/formRules'
import { nextTick, ref, watch } from 'vue'



export function useSnmpServer({ api, onSearch, form = {}, option = {} }) {
    const dialogVisible = ref(false)
    const snmpServerFormRef = ref(null)
    const isEdit = ref(false)
    const isView = ref(false)


    // 表单校验
    const rules = createRules({
        ver: { required: true, message: '请选择版本' },
        servername: { required: true, message: '请输入服务器名称' },
        serverip: { required: true, message: '请输入服务器IP' },
        port: { required: true, message: '请输入端口' },
        username: {
            validator: (rule, value, callback) => {
                if (form.ver === 'v3' && value === '') {
                    callback(new Error('请输入v3安全用户名'))
                    return
                }
                callback()
            },
        },
        certpwd: {
            validator: (rule, value, callback) => {
                if (form.certmethod !== '99' && value === '') {
                    callback(new Error('请输入认证密码'))
                    return
                }
                callback()
            }
        },
        encryptpwd: {
            validator: (rule, value, callback) => {
                if (form.encryptmethod !== '99' && value === '') {
                    callback(new Error('请输入加密密码'))
                    return
                }
                callback()
            },
        },
        community: {
            validator: (rule, value, callback) => {
                if (form.ver === 'v2c' && value === '') {
                    callback(new Error('请输入v2c团体名'))
                    return
                }
                callback()
            },
        },
    })

    // 统一处理打开弹窗
    const openDialog = (edit, view, row) => {
        resetForm(form)
        // 设置默认值
        form.ver = 'v3'
        form.port = '161'

        if (row) {
            // 表单赋值
            setFormData(row, form)
        }
        isEdit.value = edit
        isView.value = view
        dialogVisible.value = true

        // 清除校验
        nextTick(() => snmpServerFormRef.value?.clearValidate?.())
    }

    // 新增
    const openAddDialog = () => openDialog(false, false)

    // 查看
    const openViewDialog = () => {
        const ursaTableRef = option.ursaTableRef
        if (!ursaTableRef.value.isSingleSelect()) return
        const row = ursaTableRef.value.selectedRows[0]
        openDialog(false, true, row)
    }

    // 修改
    const openEditDialog = () => {
        const ursaTableRef = option.ursaTableRef
        if (!ursaTableRef.value.isSingleSelect()) return
        const row = ursaTableRef.value.selectedRows[0]
        openDialog(true, false, row)
    }

    // 删除
    const handleDelete = () => {
        const ursaTableRef = option.ursaTableRef
        if (!ursaTableRef.value.isSingleSelect()) return
        const row = ursaTableRef.value.selectedRows[0]
        useDelete({
            api: { delete: deleteSnmpServer },
            row,
            onSuccess: onSearch,
            entityName: 'SNMP配置'
        })
    }


    // 提交表单
    const { submitForm, submitLoading } = useSubmit({
        api,
        formRef: snmpServerFormRef,
        formModel: form,
        isEdit,
        dialogVisible,
        onSuccess: onSearch,
        entityName: 'SNMP服务器'
    })

    // 版本切换时，清空表单元素
    watch(
        () => form.ver,
        (newValue) => {
            if (newValue === 'v3') {
                form.community = ''
            } else {
                form.username = ''
                form.certmethod = ''
                form.certpwd = ''
                form.encryptmethod = ''
                form.encryptpwd = ''
            }
        }
    )



    return {
        dialogVisible,
        submitLoading,
        snmpServerFormRef,
        isEdit,
        isView,
        openAddDialog,
        openEditDialog,
        openViewDialog,
        handleDelete,
        submitForm,
        rules
    }

}