import { reactive } from "vue"

// 表单对象
export const userForm = reactive({
    id: '',
    uid: '',
    username: '',
    password: '',
    email: '',
    role: ''
})


// 表单字段
export const formFields = [
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
    },
    {
        type: 'input',
        prop: 'username',
        label: '用户名',
    },
    {
        type: 'password',
        prop: 'password',
        label: '密码',
    },
    {
        type: 'input',
        prop: 'email',
        label: '邮箱',
    },
    {
        type: 'select',
        prop: 'role',
        label: '角色',
        options: [
            { label: '管理员', value: '1' },
            { label: '普通用户', value: '2' }
        ]
    }
]