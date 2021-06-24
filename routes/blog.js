const express = require('express');
const router = express.Router();
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const loginCheck = require('../middleware/loginCheck');

//获取博客列表
router.get('/list', async (req, res) => {
    const query = req.query;
    const { author = '', keyword = '' } = query;
    if (req.query.isadmin) {
        //管理员界面
        if (req.session.username == null) {
            //未登录
            return res.json(new ErrorModel('未登录'));
        }
        //强制查询自己的博客
        author = req.session.username;
    }

    const listData = await getList(author, keyword);
    res.json(new SuccessModel(listData));
});

//获取博客列表
router.get('/detail', async (req, res) => {
    const query = req.query;
    const { id } = query;
    const Blog = await getDetail(id);
    res.json(new SuccessModel(Blog));
});

//新建一篇博客
router.post('/new', loginCheck, async (req, res) => {
    const data = await newBlog(req.body);
    res.json(new SuccessModel(data));
});

//更新一篇博客
router.post('/update', loginCheck, async (req, res) => {
    const result = await updateBlog(id, req.body);
    if (result) {
        res.json(new SuccessModel());
    } else {
        res.json(new ErrorModel('更新博客失败'));
    }
});

//删除一篇博客
router.post('/update', loginCheck, async (req, res) => {
    const result = await delBlog(id, req.body.author);
    if (result) {
        res.json(new SuccessModel());
    } else {
        res.json(new ErrorModel('删除博客失败'));
    }
});

module.exports = router;
