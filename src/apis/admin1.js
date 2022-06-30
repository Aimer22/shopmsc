// admin接口包含登陆验证，注册用户，修改用户。删除用户，查询所有用户功能接口

import {mock , Random} from 'mock';

// 用户数据
admin = [
    { id: 1, username: 'admin',
      password: 'e10adc3949ba59abbe56e057f20f883e' ,
      nickname: '昵称', 
      avatar: 'https://m.qqtn.com/c/308675',
      addtime: '2022-6-22'
    },
    { id: 2, username: 'test', 
      password: 'e10adc3949ba59abbe56e057f20f883e' ,
      nickname: '昵称', 
      avatar: 'https://m.qqtn.com/c/308675',
      addtime: '2022-6-21'
    },
]

// 查询所有用户
mock('admin/list', 'get', () => {
    
})

// 验证登录接口
mock('admin/login', 'post', (body) => {
    console.log(body);
})