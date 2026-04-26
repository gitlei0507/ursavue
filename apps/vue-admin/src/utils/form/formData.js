
// 表单赋值
export const setFormData = (data = {}, form) => {
    Object.keys(data).forEach(key => {
        if (key in form) {
            form[key] = data[key] ?? ''
        }
    })
}