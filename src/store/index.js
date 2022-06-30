import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isCollapse: false,
    sidenavs: [
      {
        id: 1,
        name: '控制面板',
        icon: 'el-icon-monitor',
        children: [
          { id: 11, name: '管理首页', path: '/control/dashboard' },
          {
            id: 12,
            name: '数据备份',
            path: 'backup',
            children: [
              { id: 121, name: '三级栏目1', path: 'three1' },
              { id: 121, name: '三级栏目2', path: 'three2' }
            ]
          },
          { id:13, name: '修改密码', path: '/control/editpass'}
        ]
      },
      {
        id: 2,
        name: '用户管理',
        icon: 'el-icon-user',
        children: [
          { id: 21, name: '用户列表', path: '/control/admin' }
        ]
      },
      {
        id: 3,
        name: '产品管理',
        icon: 'el-icon-shopping-bag-2',
        children: [
          { id: 31, name: '产品分类', path: '/control/productcate' },
          { id: 32, name: '产品列表', path: '/control/product' }
        ]
      }
              ],
  },
  mutations:{
    saveUserInfo( state, payload){
      state.userInfo = payload
    },
    collapseAside( state ){
      state.isCollapse = !state.isCollapse;
    }
  }
})

export default store
