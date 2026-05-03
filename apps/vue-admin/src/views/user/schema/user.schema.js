import { createCrudConfig } from '@/utils/crud/schema'

// 描述 search/table/form 的字段与模型
const userSchema = {
    search: {
        model: {
            username: '',
            email: '',
            role: '',
            terminal: '',
            cttimestart: '',
            cttimeend: '',
            uptimestart: '',
            uptimeend: ''
        },
        fields: [
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
                // optionsKey 指向字典数据
                optionsKey: 'roles'
            },
            {
                type: 'treeselect',
                prop: 'terminal',
                label: '类型',
                data: 'terminalSelTree'
            },
            {
                type: 'datetime',
                prop: 'cttimestart',
                label: '创建时间开始'
            },
            {
                type: 'date',
                prop: 'cttimeend',
                label: '创建时间结束'
            },
            {
                type: 'datetimerange',
                prop: ['uptimestart', 'uptimeend'],
                label: '更新'
            }
        ]
    },
    table: {
        columns: [
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
                // tagMapKey 指向标签映射
                tagMapKey: 'roleTagMap'
            }
        ]
    },
    form: {
        model: {
            id: '',
            uid: '',
            username: '',
            password: '',
            email: '',
            role: '',
            birth: ''
        },
        fields: [
            {
                type: 'input',
                prop: 'id',
                label: 'ID',
                hidden: true
            },
            {
                type: 'input',
                prop: 'uid',
                label: '用户ID',
                icon: 'User'
            },
            {
                type: 'input',
                prop: 'username',
                label: '用户名'
            },
            {
                type: 'password',
                prop: 'password',
                label: '密码',
                icon: 'Lock'
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
                // optionsKey 指向字典数据
                optionsKey: 'roles'
            }
        ]
    }
}

export function createUserCrudConfig(options = {}) {
    // dicts 由页面传入（如 roles、roleTagMap）
    return createCrudConfig(userSchema, options)
}
