import { UrsaMessageBox } from 'ursacomponents'


// 表单赋值
export const setFormData = (data = {}, form) => {
    Object.keys(data).forEach(key => {
        if (key in form) {
            form[key] = data[key] ?? ''
        }
    })
}


// 重置表单
export const resetForm = (form) => {
    Object.keys(form).forEach((key) => {
        form[key] = ''
    })
}

// 修改字段属性
export const updateFieldConfig = (formFields, prop, updates) => {
    const field = formFields.find(f => f.prop === prop)
    if (field) {
        Object.assign(field, updates)
    }
}

// @/composables/useCrudSubmit.js
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

/**
 * 通用 CRUD 表单提交逻辑
 * @param {Object} options
 * @param {Object} options.api           - 包含 createXxx、updateXxx 方法的接口对象
 * @param {Ref}    options.formRef       - 表单组件实例（用于调用 validate）
 * @param {Ref}    options.formModel     - 表单数据模型（reactive/ref）
 * @param {Ref}    options.isEdit        - 是否编辑模式
 * @param {Ref}    options.dialogVisible - 对话框显隐控制
 * @param {Function} options.onSuccess   - 提交成功后的回调（如刷新列表）
 * @param {String} options.entityName    - 实体名称（用于消息提示）
 * @returns {Object} { submitForm, submitLoading }
 */
export function useSubmit({ api, formRef, formModel, isEdit, dialogVisible, onSuccess, entityName = '数据' }) {
    const submitLoading = ref(false)


    const submitForm = async () => {
        if (!formRef.value) return


        // 表单校验
        const valid = await formRef.value.validate().catch(() => false)
        if (!valid) return

        submitLoading.value = true
        const action = isEdit.value ? '修改' : '新增'

        try {
            const apiFn = isEdit.value ? api.update : api.create
            const res = await apiFn(formModel.value ?? formModel)

            // 根据实际后端返回格式调整成功判断
            if (res === 1 || res?.code === 200 || res?.success) {
                ElMessage.success(`${action}${entityName}成功`)
                dialogVisible.value = false
                onSuccess?.()
            } else {
                const msg = res?.message || `${action}${entityName}失败`
                ElMessage.error(msg)
            }
        } catch (error) {
            ElMessage.error(`${action}${entityName}失败：${error.message || error}`)
        } finally {
            submitLoading.value = false
        }
    }

    return {
        submitForm,
        submitLoading
    }
}

/**
 * 通用删除逻辑
 * @param {Object}   options
 * @param {Function} options.api.delete  - 删除接口函数 (row) => Promise
 * @param {Function} options.onSuccess   - 删除成功后回调（例如刷新列表）
 * @param {String}   options.entityName  - 实体名称，用于提示信息
 * @param {Function} options.getMessage  - 可自定义确认消息 (row) => string
 * @returns {Function} handleDelete(row) - 返回删除处理函数
 */
export function useDelete({ api, row, onSuccess, entityName = '数据' } = {}) {
    const doDelete = async (row) => {
        const message = `你确定要删除${entityName}吗？`

        const confirmed = await UrsaMessageBox({ message })
        if (!confirmed) return

        try {
            const res = await api.delete(row)

            // 根据实际后端返回值调整成功判断
            if (res === 1 || res?.code === 200 || res?.success) {
                ElMessage.success(`${entityName}删除成功`)
                onSuccess?.()
            } else {
                const msg = res?.message || `${entityName}删除失败`
                ElMessage.error(msg)
            }
        } catch (error) {
            ElMessage.error(`${entityName}删除失败：${error.message || error}`)
        }
    }

    doDelete(row)
}