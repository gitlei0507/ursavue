import { userForm } from '@/views/user/config/form.config'
import { ElMessage } from "element-plus"
import { UrsaMessageBox } from 'ursacomponents'
import { nextTick, ref } from "vue"


export function useUser(createUser, updateUser, deleteUser, handleSearch) {

    const dialogVisible = ref(false)
    const submitLoading = ref(false)
    const userFormRef = ref()
    const isEdit = ref(false)
    const isView = ref(false)

    // 表单校验
    const rules = {
        uid: [{ required: true, message: '请输入用户ID', trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] }
        ],
        role: [{ required: true, message: '请选择角色', trigger: 'change' }]
    }

    // 赋值
    const setUserFormData = (data = {}) => {
        Object.keys(data).forEach(key => {
            if (key in userForm) {
                userForm[key] = data[key] ?? ''
            }
        })
    }

    // 统一处理打开弹窗
    const openDialog = (edit, view, row) => {
        setUserFormData(row || {})
        isEdit.value = edit
        isView.value = view
        dialogVisible.value = true

        if (!view) {
            // 清除校验
            nextTick(() => userFormRef.value?.clearValidate?.())
        }
    }

    const openAddDialog = () => openDialog(false, false)
    const openEditDialog = (row) => openDialog(true, false, row)
    const openViewDialog = (row) => openDialog(false, true, row)

    // 删除用户
    const handleDelete = async (row) => {
        const confirmed = await UrsaMessageBox({
            message: '你确定要删除吗？',
        })

        if (!confirmed) {
            return
        }

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

    // 提交表单
    const submitForm = async () => {
        if (!userFormRef.value) return

        const valid = await userFormRef.value.validate().catch(() => false)
        if (!valid) return

        submitLoading.value = true
        const action = isEdit.value ? '修改' : '新增'
        try {
            const apiFn = isEdit.value ? updateUser : createUser
            const res = await apiFn(userForm)
            if (res == 1) {
                ElMessage.success(`${action}用户成功`)
                dialogVisible.value = false
                handleSearch()
            } else {
                ElMessage.error(`${action}用户失败`)
            }
        } catch (error) {
            ElMessage.error(`${action}用户失败：${error.message || error}`)
        } finally {
            submitLoading.value = false
        }
    }

    return {
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
    }
}