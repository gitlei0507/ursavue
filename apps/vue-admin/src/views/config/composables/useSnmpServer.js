import { resetForm, setFormData } from '@/utils/form/formData'
import { ref } from "vue"



export function useSnmpServer({ api, onSearch, form = {} }) {
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

    const openAddDialog = () => openDialog(false, false)
    const openEditDialog = (row) => openDialog(true, false, row)
    const openViewDialog = (row) => openDialog(false, true, row)






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