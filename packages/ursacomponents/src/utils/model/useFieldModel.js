/**
 * 表单字段值读写 Hook
 * @param {Object} model - 响应式表单模型
 */
export function useFieldModel(model) {
    return {
        getValue: (prop) => model?.[prop] ?? '',
        setValue: (prop, value) => {
            if (model && prop) model[prop] = value
        }
    }
}