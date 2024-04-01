import request from '@/utils/request'

export function primaryChat(token, query, sessionId) {
    return request({
        url: '/chat',
        method: 'POST',
        headers: {
            // 'Authorization': `Bearer ${token}`,
            'token': token,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "query": query,
            "sessionId": sessionId
        })
    })
}

export function knowledgeBaseChat(token, query, sessionId) {
    return request({
        url: '/knowledge_base/chat',
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "query": query,
            "session_id": sessionId
        })
    })
}
