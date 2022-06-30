// 用于存放sql语句
var sqlMap = {
    home: {
        search: 'select * from userinfo_tb where 1=1',
        
    },
    other: {
        delete: '',//删除语句
        post: '',
        get: '',
        changeState:'update userinfo_tb set state='
    }
}

module.exports = sqlMap