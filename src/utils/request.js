import axios from 'axios'

const service = axios.create({
    baseURL: 'http://127.0.0.1:11434',
    timeout: 500000
})

service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)
service.interceptors.response.use(

)

export default service
