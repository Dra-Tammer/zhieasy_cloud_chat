import request from '@/utils/request'

export function userRegister(username, password) {
    return request({
        url: '/user/add',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "username": username,
            "password": password
        })
    })
}

export function userLogin(username, password) {
    return request({
        url: '/user/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "username": username,
            "password": password
        })
    })
}
