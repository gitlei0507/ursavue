import request from '@/utils/request'

export function getXml() {
    return request({
        url: '/api/process/process/model/ad89ed7f-4771-11f1-8840-005056c00008',
        method: 'get',
    })
}