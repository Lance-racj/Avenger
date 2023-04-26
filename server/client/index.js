const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4 } = require('uuid');
const { Lose, User, Collection, Idle, Need } = require('../database');

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

// 发布失物接口
router.post('/lost/publish', async (req, res) => {
  try {
    /* 将前端传过来的数据放入lose数据表中 */
    const {
      openid,
      type,
      classify_1,
      classify_2,
      name,
      date,
      region,
      phone,
      desc,
      imgList,
      time
    } = req.body;
    await Lose.create({openid, type, classify_1, classify_2, name, date, region, phone, desc, imgList, time});
    res.send('success');
  } catch(error) {
    res.send('error', error);
  }
})

// 发布闲置接口
router.post('/idle/publish', async (req, res) => {
  try {
    const {
      openid,
      classify_1,
      classify_2,
      name,
      phone,
      desc,
      imgList,
      time
    } = req.body;
    await Idle.create({openid, classify_1, classify_2, name, phone, desc, imgList, time});
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})

// 发布求购接口
router.post('/idle/need/publish', async (req, res) => {
  try {
    const {
      openid,
      name,
      phone,
      desc,
      time
    } = req.body;
    await Need.create({openid, name, phone, desc, time});
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})

// 获取首页的数据
router.get('/lost/list', async (req, res) => {
  try {
    const { type, openid } = req.query;
    let result;
    if (openid) { // 我的失物招领发布
      result = await Lose.find({
        openid,
        type
      })
    } else { // 获取失物招领信息
      result = await Lose.find({
        type
      });
    }
    res.send(result)
  } catch(error) {
    res.send('error');
  }
})

// 获取单人收藏列表
router.get('/lost/follow/list', async (req, res) => {
  try {
    const { openid, type } = req.query;
    const result = await Collection.find({
      openid,
      type
    });
    res.send(result);
  } catch(error) {
    res.send('error');
  }
})

// 获取单个失物招领收藏信息
router.get('/lost/follow/item', async (req, res) => {
  try {
    const { id, openid } = req.query;
    const result = await Collection.find({
      id,
      openid
    })
    if (result.length > 0) {
      res.send('success');
    } else {
      res.send('error');
    }
  } catch(error) {
    res.send('error');
  }
})

// 收藏失物招领帖
router.post('/lost/follow/add', async (req, res) => {
  try {
    /* 将前端传过来的数据放入lose数据表中 */
    const {
      openid,
      type,
      classify_1,
      classify_2,
      name,
      date,
      region,
      phone,
      desc,
      imgList,
      time,
      _id
    } = req.body;
    await Collection.create({openid, type, classify_1, classify_2, name, date, region, phone, desc, imgList, time, id: _id});
    res.send('success');
  } catch(error) {
    res.send('error', error);
  }
})

// 取消收藏失物招领帖
router.post('/lost/follow/del', async (req, res) => {
  try {
    const {id, openid} = req.body;
    await Collection.findOneAndRemove({
      id,
      openid
    })
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})

// 删除失物招领帖子
router.post('/lost/delete', async (req, res) => {
  const { _id } = req.body;
  try {
    await Lose.findByIdAndRemove(_id);
    res.send('success');
  } catch(error) {
    res.send('error');
  }
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

// 导出路由器
module.exports = router;
