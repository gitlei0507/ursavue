// 查询对象
export const searchForm = reactive({
    username: '',
    email: '',
    role: '',
    terminal: '',
    cttimestart: '',
    cttimeend: '',
    uptimestart: '',
    uptimeend: ''

})


// 查询字段配置
export const searchFields = [
    {
        type: 'input',
        prop: 'username',
        label: '姓名'
    },
    {
        type: 'input',
        prop: 'email',
        label: '邮箱'
    },
    {
        type: 'select',
        prop: 'role',
        label: '角色',
        options: [
            { label: '系统管理员', value: '1' },
            { label: '普通用户', value: '2' },
        ]
    },
    {
        type: 'treeselect',
        prop: 'terminal',
        label: '类型',
        data: [
            {
                value: 'root',
                label: '资产类型',
                isFolderOpened: true,
                children: [
                    {
                        value: 'camera',
                        label: '网络设备',
                        isFolderOpened: true,
                        children: [
                            { value: 'networkcamera', label: '网络摄像机', isFolderOpened: false },
                            { value: 'networkdisk', label: '网络硬盘录像机', isFolderOpened: false },
                        ],
                    },
                    {
                        value: 'security',
                        label: '安全设备',
                        isFolderOpened: true
                    },
                ],
            },
        ]
    },
    {
        type: 'datetime',
        prop: 'cttimestart',
        label: '创建时间开始',
    },
    {
        type: 'date',
        prop: 'cttimeend',
        label: '创建时间结束',
    },
    {
        type: 'datetimerange',
        prop: ['uptimestart', 'uptimeend'],
        label: '更新',
    }
]