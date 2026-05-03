import { resetForm, setFormData } from '@/utils/form/formData'
import { ElMessage } from 'element-plus'
import { nextTick, ref, watch } from 'vue'



export function useSnmpServer({ api, onSearch, form = {}, option = {} }) {
    const dialogVisible = ref(false)
    const submitLoading = ref(false)
    const snmpServerFormRef = ref(null)
    const isEdit = ref(false)
    const isView = ref(false)


    // 表单校验
    const rules = {}

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


    // 提交表单
    const submitForm = async () => {
        if (!snmpServerFormRef.value) return

        //const valid = await snmpServerFormRef.value.validate().catch(() => false)
        //if (!valid) return

        submitLoading.value = true
        const action = isEdit.value ? '修改' : '新增'
        try {
            const apiFn = isEdit.value ? api.updateSnmpServer : api.createSnmpServer
            const res = await apiFn(form)
            if (res == 1) {
                ElMessage.success(`${action}SNMP服务器成功`)
                dialogVisible.value = false
                onSearch()
            } else {
                ElMessage.error(`${action}SNMP服务器失败`)
            }
        } catch (error) {
            ElMessage.error(`${action}SNMP服务器失败：${error.message || error}`)
        } finally {
            submitLoading.value = false
        }
    }

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
        submitForm,
        rules
    }

}