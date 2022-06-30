// admin接口包含登陆验证，注册用户，修改用户。删除用户，查询所有用户功能接口

import {mock} from 'mockjs';
import md5 from 'md5';
import { date, pick, uuid } from '@/utils'
import jwt from 'jsonwebtoken';

// 导入角色表
import role from './role.js'

// 用户数据
let admin = [
    { id: 1, username: 'admin',
      password: 'e10adc3949ba59abbe56e057f20f883e' ,
      nickname: '昵称', 
      roleid: 1,
      avatar: require('../assets/img/avatar1.jpg'),
      mobile: '18379910986',
      addtime: '2022-6-22',
      // 账户审核状态
      state: 2
    },
    { id: 2, username: 'test', 
      password: 'e10adc3949ba59abbe56e057f20f883e' ,
      nickname: '昵称', 
      roleid: 2,
      avatar: require('../assets/img/avatar.jpg'),
      mobile: '15970347441',
      addtime: '2022-6-21',
      state: 1
    },
    { id: 3, username: 'guest', 
      password: 'e10adc3949ba59abbe56e057f20f883e' ,
      nickname: '来宾3', 
      roleid: 2,
      avatar: require('../assets/img/avatar.jpg'),
      mobile: '18379910986',
      addtime: '2022-6-21',
      state: 1
    },
    { id: 4, username: 'guest', 
      password: 'e10adc3949ba59abbe56e057f20f883e' ,
      nickname: '来宾4', 
      roleid: 2,
      avatar: require('../assets/img/avatar.jpg'),
      mobile: '18379910986',
      addtime: '2022-6-21',
      state: 1
    },
    { id: 5, username: 'guest', 
      password: 'e10adc3949ba59abbe56e057f20f883e' ,
      nickname: '来宾5', 
      roleid: 2,
      avatar: require('../assets/img/avatar.jpg'),
      mobile: '18379910986',
      addtime: '2022-6-21',
      state: 1
    },
    { id: 6, username: 'guest', 
      password: 'e10adc3949ba59abbe56e057f20f883e' ,
      nickname: '来宾6', 
      roleid: 2,
      avatar: require('../assets/img/avatar.jpg'),
      mobile: '18379910986',
      addtime: '2022-6-21',
      state: 1
    },
    { id: 7, username: 'guest', 
      password: 'e10adc3949ba59abbe56e057f20f883e' ,
      nickname: '来宾7', 
      roleid: 2,
      avatar: require('../assets/img/avatar.jpg'),
      mobile: '18379910986',
      addtime: '2022-6-21',
      state: 1
    },
]


// 查询所有用户
mock('admin/list', 'get', () => {
  const result =  admin.map( item => {
    // 排除密码数据
    if( item.roleid ){
      item.rolename = role.find(entry => entry.id === item.roleid)?.name || '未知';
    }
    return pick(item, ['password']);
    })
    return {
      err: 0,
      desc: '查询成功！',
      result
    }
})

// 批量删除
mock( 'admin/delete', 'post', ({ body }) => {
  let {ids} = JSON.parse( body );

  // 排除法删除
  admin = admin.filter( item => !ids.includes( item.id ));

  return {
    err: 0,
    desc: '执行成功！'
  }
})

//快速审核
mock('admin/state', 'post', ({ body }) => {

  let { id, state } = JSON.parse( body );

  admin = admin.map( item => {
    if( item.id === id ){
      item.state = state;
    }
    return item;
  })

  // console.log( admin );

  return {
    err: 0,
    desc: '执行成功！'
  }

})
// 验证登录接口
mock('admin/login', 'post', ( {body} ) => {
  let { username, password } = JSON.parse(body)

  
  const isExist = admin.some(item => {
    return item.username === username && item.password === md5(password)
  })
  if(isExist){
    
    // 判断用户的审核状态
    const isCheck = admin.some(item => {
      return item.username === username && item.state === 2
    })

    if(!isCheck){
      return {
        err: 10002,
        desc: '该账户未通过审核！'
      }
    }

    const result = admin.find(item => {
      return item.username === username && item.password === md5(password)
    })
    // 生成token
    const token = jwt.sign({nickname: result.nickname},'1030')
    return {
      err: 0,
      desc: '登录验证成功！',
      result: {
        ...pick(result,['password']),
        token: token
      }
    }
  }else{
    return {
      err: 10001,
      desc: '用户名或密码错误！'
    }
  }
})

// 新增用户
mock('admin/add', 'post', ({ body }) => {
  let form = JSON.parse(body)

  // 在数组开头添加
  admin.unshift( {...form, id: uuid(), password: md5(form.password), addtime: date() } )
  console.log(admin);

  return {
    err: 0,
    desc: '执行成功！'
  }
})

// 修改用户
mock('admin/edit', 'post', ({body}) => {
  let form  = JSON.parse(body)
  console.log(form);

  admin = admin.map(item => {
    if(item.id === form.id){
      if(form.password){
        form.password = md5(form.password)
      }
      item.nickname = form.nickname;
      item.avatar = form.avatar
      item.roleid = form.roleid
      item.state = form.state
    }
    return item
  })

  console.log(admin);

  return{
    err: 0,
    desc:'执行成功！'
  }
})