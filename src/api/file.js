import request from '@/utils/request'

export function uploadFile(token, fileName, file) {
    const formData = new FormData();
    formData.append('file', file)
    formData.append('fileName', fileName);
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
        }),
        responseType: 'blob'
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
        url: '/knowledge_base/upload/directory',
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "name": dirName
        })
    })
}

export function deleteDir(token, fileName) {
    return request({
        url: '/knowledge_base/delete/directory',
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "name": fileName
        })
    })
}
