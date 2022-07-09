let express = require('express')

let router = express.Router()

let user = require('./api/userApi') //导入数据库操作

router.get('/getUser', user.getlist)
router.post('/changeState', user.changeState)
router.post('/uploadAvatar', user.uploadAvatar)

module.exports = router