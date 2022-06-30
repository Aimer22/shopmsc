import {mock} from 'mockjs'

//角色数据表
let role = [
    { id: 1, name: '超级管理员', content: '省略', order: 1},
    { id: 2, name: '讲师', content: '省略', order: 2},
    { id: 3, name: '游客', content: '省略', order: 3},
    { id: 4, name: '前台', content: '省略', order: 4},
    { id: 5, name: '财务', content: '省略', order: 5},
  ];

mock('role/list', 'get', () => {
    return {
        err: 0,
        desc: '查询成功！',
        result: role
    }
})

export default role;