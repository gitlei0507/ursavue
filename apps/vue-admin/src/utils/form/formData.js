
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