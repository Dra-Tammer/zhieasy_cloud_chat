import request from '@/utils/request'
export function getCarList() {
    return request({
        url: '/generate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "model": "qwen:0.5b",
            "prompt": "你是谁"
        })
    })
}

export function getData() {
    return request({
        url: '/api/generate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "model": "llama2",
            "prompt": "Why is the sky blue?"
        }),
        responseType: 'stream'
    })
}
