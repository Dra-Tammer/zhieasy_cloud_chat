import request from "@/utils/request";

export function sessionAdd(token, sessionName, type) {
    return request({
        url: '/knowledge_base/session/add',
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "sessionName": sessionName,
            "type": type
        })
    })
}

export function sessionGet(token, type) {
    return request({
        url: '/knowledge_base/session/get',
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "type": type
        })
    })
}
