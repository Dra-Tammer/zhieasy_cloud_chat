import request from '@/utils/request'

export function addKnowledge(token, kbName, rule) {
    return request({
        url: '/knowledge_base/add',
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "kbName": kbName,
            "rule": rule
        })
    })
}

export function knowledgeList(token) {
    return request({
        url: '/knowledge_base/list',
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
    })
}

export function switchToKnowledge(token, kbId, switchToNormalChat) {
    return request({
        url: '/knowledge_base/switch',
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "kbId": kbId,
            "switchToNormalChat": switchToNormalChat
        })
    })
}

export function switchToPrimaryChat(token, switchToNormalChat) {
    return request({
        url: '/knowledge_base/switch',
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "switchToNormalChat": switchToNormalChat
        })
    })
}

export function knowledgeGroupInvite(token, kbId, username) {
    return request({
        url: '/knowledge_base/invite',
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "username": username,
            "kbId": kbId
        })
    })
}

export function deleteKnowledge(token, kbId) {
    return request({
        url: '/knowledge_base/delete',
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "kbId": kbId
        })
    })
}

export function knowledgeMemberList(token, kbId) {
    return request({
        url: '/knowledge_base/members/list',
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "kbId": kbId,
        })
    })
}

export function knowledgeMemberRemove(token, kbId, ids) {
    return request({
        url: '/knowledge_base/members/remove',
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "kbId": kbId,
            "ids": ids
        })
    })
}
