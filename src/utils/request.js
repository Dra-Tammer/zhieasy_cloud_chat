import axios from 'axios'

const service = axios.create({
    baseURL: 'http://rv35ab.natappfree.cc',
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
