import { reactive } from 'vue'

// 将 schema 字段中的 key 映射为真实的 options/tagMap
function cloneField(field, dicts) {
    const next = { ...field }

    if (Object.prototype.hasOwnProperty.call(next, 'optionsKey')) {
        const key = next.optionsKey
        delete next.optionsKey
        next.options = dicts[key] || []
    }

    if (Object.prototype.hasOwnProperty.call(next, 'tagMapKey')) {
        const key = next.tagMapKey
        delete next.tagMapKey
        next.tagMap = dicts[key] || {}
    }

    if (Object.prototype.hasOwnProperty.call(next, 'data')) {
        const key = next.data
        delete next.data
        next.data = dicts[key] || {}
    }

    return next
}

export function createCrudConfig(schema, dicts = {}) {
    // 基于 schema 生成响应式模型与字段配置
    const searchForm = reactive({ ...(schema.search?.model || {}) })
    const form = reactive({ ...(schema.form?.model || {}) })
    const searchFields = reactive((schema.search?.fields || []).map((field) => cloneField(field, dicts)))
    const columnFields = (schema.table?.columns || []).map((field) => cloneField(field, dicts))
    const formFields = reactive((schema.form?.fields || []).map((field) => cloneField(field, dicts)))

    return {
        searchForm,
        searchFields,
        columnFields,
        form,
        formFields
    }
}
