const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4 } = require('uuid');
const { User } = require('../database');
const lost = require('./lost/index');
const idle = require('./idle/index');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./file")
  },
  filename: (req, file, cb) => {
    let type = file.originalname.replace(/.+\./, ".");
    cb(null, `${v4()}${type}`);
  }
})
const upload = multer({storage});

// 上传图片接口
router.post('/uploadImg', upload.array('file', 6), async (req, res) => {
  res.send(req.files);
})

// 用户注册
router.post('/register', async (req, res) => {
  const {openid, username, password, date} = req.body;
  const result = await User.findOne({
    username  // 保证每个人只能注册一个账号
  })
  if (result) {
    res.send('fail')
  } else {
    await User.create({
      openid,
      username,
      password,
      date
    });
    res.send('success')
  }
}) 

// 用户登录
router.post('/toLogin', async (req, res) => {
  const { username, password } = req.body;
  const result = await User.findOne({
    username
  });
  if (result) {
    if (result.password === password) {
      res.send('登录成功');
    } else {
      res.send('用户名或密码错误');
    }
  } else {
    res.send('不存在的账户');
  }
})

router.use('/lost', lost);
router.use('/idle', idle);

// 导出路由器
module.exports = router;
