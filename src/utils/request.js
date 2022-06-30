import Vue from 'vue'
import axios from 'axios'

const vm = Vue.prototype

// 1. 创建axios实例
const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
    'CS-Token': localStorage.getItem('CS-Token')
  }
})

// 2. 设置请求和响应错误处理
// （错误有2种，1. 系统错误401、404  2. 自己定义的 10001 ）
const error = err => {
  if (err.response) {
    const { status } = err.response
    if (status === 401) {
      vm.$notify.error({ title: '401 错误', message: '访问被拒绝！' })
    } else if (status === 403) {
      vm.$notify.error({ title: '403 错误', message: '资源不可用！' })
    } else if (status === 404) {
      vm.$notify.error({ title: '404 错误', message: '找不到页面！' })
    } else if (status === 405) {
      vm.$notify.error({ title: '405 错误', message: '不允许此方法！' })
    } else if (status === 500) {
      vm.$notify.error({ title: '500 错误', message: '服务内部错误！' })
    } else if (status === 503) {
      vm.$notify.error({ title: '503 错误', message: '服务过载错误！' })
    } else {
      vm.$notify.error({ title: '错误', message: '未知错误！' })
    }
  }

  // 返回输出错误
  return Promise.reject(err)
}

// 3. 设置请求拦截器
http.interceptors.request.use(function(config) {
  return config
}, error)

// 4. 设置响应拦截器
http.interceptors.response.use(function (response) {
  return response.data
}, error)



// 5. 导出http实例
export default http
