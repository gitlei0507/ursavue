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

// 表单元素
export function createFormFields(options = {}) {
    return [
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
            label: '用户名',
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
            options: options.roles || []
        }
    ]
}



