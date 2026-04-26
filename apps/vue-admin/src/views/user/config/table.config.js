// 列表字段配置
export const columnFields = [
    {
        prop: 'username',
        label: '姓名',
        minWidth: '200',
        valueAlign: 'left'
    },
    {
        prop: 'email',
        label: '邮箱',
        showOverflowTooltip: true
    },
    {
        prop: 'role',
        label: '角色',
        minWidth: '300',
        tagMap: {
            1: { label: '管理员', type: 'danger', effect: 'dark' },
            2: { label: '普通用户', type: 'success', effect: 'dark' }
        },
        tagDefault: ({ value }) => ({ label: value ?? '-' })
    }
]