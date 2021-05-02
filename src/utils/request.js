import axios from 'axios'
import { getToken } from './auth'

// Create axios instance
// const CSRF_COOKIE_NAME = 'csrftoken'
// const CSRF_HEADER_NAME = 'X-CSRFToken'

const session = axios.create({
  // baseURL: config.apiUrl, // api of base_url
  baseURL: process.env.REACT_APP_BASE_API,
  timeout: 15000, // Request timeout
  withCredentials: true
  // xsrfCookieName: CSRF_COOKIE_NAME,
  // xsrfHeaderName: CSRF_HEADER_NAME
})

// Request interceptor
session.interceptors.request.use(config => {
  console.log('Inside session.interceptors.request.use config')
  if (getToken()) {
    // config.headers['X-Token'] = getToken() // Let each request carry a custom token Please modify it according to the actual situation
    var strToken = 'Token ' + getToken()
    console.log('Sending Authorization as ' + strToken)
    config.headers['Authorization'] = strToken
  }
  // config.headers['Access-Control-Allow-Origin'] = '*'
  // config.headers['Access-Control-Allow-Methods'] = 'GET, PUT, POST, DELETE, OPTIONS'
  return config
  }, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// Response interceptor
session.interceptors.response.use(
  response => {
    const res = response.data
    console.log(response)
    return res
  },
  error => {
    console.log('err' + error)// for debug
    // TBD
    if (error.response.data) {
      var strDetailError = JSON.stringify(error.response.data)
      console.log(strDetailError)
    }
    return Promise.reject(strDetailError)
  }
)
export default session
