import { createCrudConfig } from '@/utils/crud/schema'

const snmpServerSchema = {
    search: {
        model: {
            serverip: '',
            servername: '',
            ver: '',
            enable: ''
        },
        fields: [
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
                optionsKey: 'ver'
            },
            {
                type: 'select',
                prop: 'enable',
                label: '是否启用',
                optionsKey: 'enable'
            }
        ]
    },
    table: {
        columns: [
            {
                prop: 'serverip',
                label: '服务器IP',
                minWidth: '200',
                valueAlign: 'left',
                hasLink: true
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
                tagMapKey: 'enableTagMap'
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
    },
    form: {
        model: {
            servercode: '',
            ver: '',
            servername: '',
            serverip: '',
            port: '',
            username: '',
            certmethod: '',
            certpwd: '',
            encryptmethod: '',
            encryptpwd: '',
            community: '',
            memo: ''
        },
        fields: [
            {
                type: 'input',
                prop: 'servercode',
                label: 'servercode',
                hidden: true
            },
            {
                type: 'select',
                prop: 'ver',
                label: 'SNMP版本',
                optionsKey: 'ver'
            },
            {
                type: 'input',
                prop: 'servername',
                label: '服务器名称'
            },
            {
                type: 'input',
                prop: 'serverip',
                label: '服务器IP'
            },
            {
                type: 'input',
                prop: 'port',
                label: '端口'
            },
            {
                type: 'input',
                prop: 'username',
                label: 'v3安全用户名',
                visible: (model) => model.ver === 'v3'
            },
            {
                type: 'select',
                prop: 'certmethod',
                label: '认证方式',
                optionsKey: 'certmethodOption',
                visible: (model) => model.ver === 'v3'
            }, {
                type: 'password',
                prop: 'certpwd',
                label: '认证密码',
                visible: (model) => model.ver === 'v3'
            },
            {
                type: 'select',
                prop: 'encryptmethod',
                label: '加密方式',
                optionsKey: 'encryptmethodOption',
                visible: (model) => model.ver === 'v3'
            },
            {
                type: 'password',
                prop: 'encryptpwd',
                label: '加密密码',
                visible: (model) => model.ver === 'v3'
            },
            {
                type: 'password',
                prop: 'community',
                label: 'v2c团体名',
                visible: (model) => model.ver !== 'v3'
            },
            {
                type: 'textarea',
                prop: 'memo',
                label: '备注'
            }
        ]
    }
}


export function createSnmpServerCrudConfig(options = {}) {
    return createCrudConfig(snmpServerSchema, options)
}
