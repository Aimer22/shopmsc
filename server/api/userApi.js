// 引入db配置
var conn = require('../db.js')
var $sql = require('../sqlMap.js') // 导入sql语句

console.log($sql);


let sql = 'select * from userinfo_tb where 1=1'
exports.getlist = (req,res) => {
  conn.query(sql, (err, result) => {
    if(err){
      console.log(err);
    }else{
      let data = {
        err: 0,
        msg:'获取成功！',
        result
      }

      res.end(JSON.stringify(data))
    }
  })
}

exports.changeState = (req, res) => {
  console.log('获取中。。。。');
  let form = ''
  req.on('data', chunk => {
    form += chunk;
    console.log(form);
  })
  req.on('end', ()=> {
    let {id , state} = JSON.parse(form);
    console.log(id,state);
  })
  console.log(id);
}


