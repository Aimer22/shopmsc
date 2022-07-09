import { mock }  from 'mockjs';
import { uuid, date } from '@/utils';

//产品分类数据表
let productcate = [
  { 
    id: 1, 
    name: 'iQOO系列',
    picurl: require('@/assets/img/productcate1.png'),
    orderid: 3,
    addtime: '2022-6-10',
    state: 2, //1 未审核  2 已审核
  },
  { 
    id: 2, 
    name: 'NEX系列',
    picurl: require('@/assets/img/productcate1.png'),
    orderid: 1,
    addtime: '2022-6-11',
    state: 2, //1 未审核  2 已审核
  },
  { 
    id: 3, 
    name: 'X系统',
    picurl: require('@/assets/img/productcate1.png'),
    orderid: 2,
    addtime: '2022-6-15',
    state: 2, //1 未审核  2 已审核
  },
];

//查询所有产品分类
mock('productcate/list', 'get', () => {
  return {
    err: 0,
    desc: '查询成功！',
    result: productcate
  }
})

//批量删除
mock('productcate/delete', 'post', ({ body }) => {
 
  let { ids } = JSON.parse( body ); // ids = [1,3]

  //排除法删除
  productcate = productcate.filter(item => !ids.includes( item.id ) );

  return {
    err: 0,
    desc: '执行成功！'
  }

})

//快速审核
mock('productcate/state', 'post', ({ body }) => {

  let { id, state } = JSON.parse( body );

  productcate = productcate.map( item => {
    if( item.id === id ){
      item.state = state;
    }
    return item;
  });

  return {
    err: 0,
    desc: '执行成功！'
  }

})

//新增产品分类
mock('productcate/add', 'post', ({ body }) => {

  let form = JSON.parse( body );

  //往数组的开头
  productcate.unshift( {...form, id: uuid(), addtime: date() } );

  return {
    err: 0,
    desc: '执行成功！'
  }

})

//修改产品分类
mock('productcate/edit', 'post', ({ body }) => {

  let form = JSON.parse( body );

  productcate = productcate.map(item => {
    if( item.id === form.id ){
      item.name = form.name;
      item.picurl = form.picurl;
      item.orderid = form.orderid;
      item.state = form.state;
    }
    return item;
  })

  return {
    err: 0,
    desc: '执行成功！'
  }

})