import { reactive } from "vue";


// 查询对象
export const searchForm = reactive({
    serverip: '',
    servername: '',
    ver: '',
    enable: ''
})

export function createSearchFields(options = {}) {
    return reactive([
        {
            type: 'input',
            prop: 'serverip',
            label: '服务器IP'
        },
        {
            type: 'input',
            prop: 'servername',
            label: '服务器名称'
        },
        {
            type: 'select',
            prop: 'ver',
            label: '版本',
            options: options.ver || []
        },
        {
            type: 'select',
            prop: 'enable',
            label: '是否启用',
            options: options.enable || []
        }

    ])
}

