// 列表字段配置

export function createColumnFields(options = {}) {
    return [
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
            tagMap: options.roleTagMap || {}
        }
    ]
}