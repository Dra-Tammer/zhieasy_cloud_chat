import request from '@/utils/request'

export function uploadFile(token, file) {
    const formData = new FormData();
    formData.append('file', file)
    return request({
        url: '/knowledge_base/upload/file',
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
}

export function downloadFile(token, fileName) {
    return request({
        url: '/knowledge_base/download/file',
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "fileName": fileName
        })
    })
}

export function deleteFile(token, fileName) {
    return request({
        url: '/knowledge_base/delete/file',
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "fileName": fileName
        })
    })
}

export function fileList(token, dirName) {
    return request({
        url: '/knowledge_base/list/file',
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "dirName": dirName
        })
    })
}

export function newDir(token, dirName) {
    return request({
        // todo: 路径修改
        url: '/knowledge_base/list/file',
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "dirName": dirName
        })
    })
}
