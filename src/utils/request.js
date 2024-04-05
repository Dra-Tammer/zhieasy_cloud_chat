import axios from 'axios'

const service = axios.create({
    baseURL: 'http://8.146.199.214:8080',
    // baseURL: 'http://127.0.0.1:8081',

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
