import { createFormFields } from '@/views/user/config/form.config'
import { createSearchFields, searchForm } from '@/views/user/config/search.config'
import { createColumnFields } from '@/views/user/config/table.config'

export { searchForm }

export function createUserCrudConfig({ roles = [], roleTagMap = {} } = {}) {
    const searchFields = createSearchFields({ roles })
    const columnFields = createColumnFields({ roleTagMap })
    const formFields = createFormFields({ roles })

    return {
        searchFields,
        columnFields,
        formFields
    }
}
