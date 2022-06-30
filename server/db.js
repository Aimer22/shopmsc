let mysql = require('mysql')

    // 创建连接
    let conn = mysql.createConnection({
        port:3306,
        host:'localhost',
        user:'root',
        password:'123456',
        database: 'shopcms',
    })

    conn.connect(function(err, res){
        if(err){
            console.log(err);
        }else{
            console.log('连接成功');
        }
    })

module.exports = conn