const express = require('express');
const router = express.Router();
const {
    login
} = require('../controller/user');

router.post('/login', async(req, res, next)=> {
    const { username, password } = req.body;
    const result = await login(username, password);
    if (result.username) {
        //设置session
        req.session.username = result.username;
        req.session.realName = result.realName;
        
        return res.json(new SuccessModel('登录成功'))
    };
    res.json(new ErrorModel('登录失败'))
});

module.exports = router;
