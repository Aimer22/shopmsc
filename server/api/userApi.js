// 此文件对数据库进行增删改查的操作
// 引入db配置
var conn = require('../db.js')
var $sql = require('../sqlMap.js') // 导入sql语句
// 解决接收不到formdata文件类型的问题
let multiparty = require('multiparty');

console.log($sql);




let sql = `
          select s.id,s.username,s.nickname,s.avatar,s.mobile,s.addtime,s.state,s.roleid,rt.rolename from userinfo_tb s
          inner join role_tb rt on s.roleid = rt.roleid;
          `
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
  let {id, state} = req.body
  console.log(state==1?2:1);
  conn.query(`update userinfo_tb set state=${state == 1? 1 : 2} where id=${id}`, (err, result) => {
    if(err){
      console.log(err);
    }else{
      let data = {
        err: 0,
        desc: '更改成功！',
        result
      }
      res.end(JSON.stringify(data))
    } 
  })
}

exports.uploadAvatar = (req, res) => {
  
  let form = new multiparty.Form();
  let path = require('path')
  let imgpath = ''
  let avatarid = ''
  console.log('项目路径为---->',__dirname);
  form.uploadDir = path.resolve(__dirname,'../public/images')
  form.keepExtensions=true;   //是否保留后缀
  form.autoFiels=true;       //启用文件事件，并禁用部分文件事件，如果监听文件事件，则默认为true。
  console.log(form.uploadDir);
  form.parse(req, function(err, fields, files){
    
    avatarid = fields.avatarid[0];
    imgpath = files.file[0].path
    /* console.log(avatarid);
    console.log(files.file[0]); */
    // console.log('http://localhost:3030'+imgpath.split('public')[1]);

    conn.query(`update userinfo_tb set avatar='${imgpath.replaceAll('\\','\\\\')}' where id=${avatarid}`,(err, result) => {
      if(err){
        data = {
          desc:'执行失败！'
        }
      }else{
        data ={
          err: 0,
          desc:'执行成功！',
          avatarImg: 'http://localhost:3030'+imgpath.split('public')[1]
        }
        res.end(JSON.stringify(data))
      }
    })
  })
  
}


