// 导入样式
import '@/assets/css/style.less'

import Vue from 'vue'
import router from '@/router/index.js'
import store from '@/store'
// 导入element-ui
import ElementUI from 'element-ui'
import '@/assets/theme/index.css'
Vue.use(ElementUI)

// 导入自定义组件
import CsUI from '@/components/CsUI.js'
Vue.use(CsUI)

// 挂载上Vue的原型上
import http from '@/utils/request.js'
Vue.prototype.$http = http;

// 启动mock数据模拟
import '@/apis'

// import '@/assets/css/iconfont.css'






new Vue({
  router,
  store,
  render: h => h('router-view')
}).$mount('#app')
