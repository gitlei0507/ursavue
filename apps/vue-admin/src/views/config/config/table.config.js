

export const columnFields = [
    {
        prop: 'serverip',
        label: '服务器IP',
        minWidth: '200',
        valueAlign: 'left'
    },
    {
        prop: 'servername',
        label: '服务器名称',
        minWidth: '200',
    },
    {
        prop: 'ver',
        label: '版本',
        minWidth: '200',
    },
    {
        prop: 'enable',
        label: '启用',
        minWidth: '200',
        tagMap: {
            1: { label: '启用', type: 'success', effect: 'dark' },
            0: { label: '停用', type: 'danger', effect: 'dark' }
        }
    },
    {
        prop: 'memo',
        label: '备注',
        minWidth: '300',
    },
    {
        prop: 'ctuser',
        label: '创建人',
        minWidth: '200',
    },
    {
        prop: 'cttime',
        label: '创建时间',
        minWidth: '200',
    },
    {
        prop: 'upuser',
        label: '更新人',
        minWidth: '200',
    },
    {
        prop: 'uptime',
        label: '更新时间',
        minWidth: '200',
    },
]