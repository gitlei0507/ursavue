import { resetForm, setFormData } from '@/utils/form/formData'
import { nextTick, ref, watch } from "vue"



export function useSnmpServer({ api, onSearch, form = {}, option = {} }) {
    const dialogVisible = ref(false)
    const submitLoading = ref(false)
    const snmpServerFormRef = ref()
    const isEdit = ref(false)
    const isView = ref(false)


    // 表单校验
    const rules = {}

    // 统一处理打开弹窗
    const openDialog = (edit, view, row) => {
        resetForm(form)
        form.ver = 'v3'

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
        isEdit,
        isView,
        openAddDialog,
        openEditDialog,
        openViewDialog,
        rules
    }

}