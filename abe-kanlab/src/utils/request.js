import axios from 'axios'
// https://axios-http.com/zh/docs/interceptors

// create an axios instance
const service = axios.create({
    // url = base url + request url
    // VUE_APP_BASE_URL 来自 .env 配置文件
    baseURL: process.env.VUE_APP_BASE_URL,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // config contains all options for a request
        // modify config before send this request
        return config
    },
    error => {
        // do something with request error
        console.log('[request error]', error)
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data
        if (res.code !== 200) {
            // if the custom code is not 200, it is judged as an error.
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            /**
             * If you want to get http information such as headers or status
             * Please return  response => response
            **/
            return res
        }
    },
    error => {
        // api calling Error
        // console.log('[error] response interceptor', error)
        // we can mock data here
        return Promise.reject(error)
    }
)

export default service