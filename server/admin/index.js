const express = require('express');
const router = express.Router();
const { Lose, Admin, User, Idle, Need, Help } = require('../database');

// 管理员登录接口
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await Admin.findOne({username});
  if (result && result.password === password) {
    res.send(result);
  } else {
    res.send('error');
  }
})

// 寻主寻物接口 && 模糊检索接口
router.post('/getLose', async (req, res) => {
  const { type, page, size, keyWord } = req.body;
  try {
    let result = [], total = 0;
    if (keyWord !== '') { // 有关键词返回检索数据
      const name = new RegExp(keyWord, 'i');
      result = await Lose.find({
        type,
        name
      }).skip((page - 1) * size).limit(size);
      total = await Lose.find({
        type,
        name
      }).countDocuments();
    } else { // 无关键词返回全部数据
      result = await Lose.find({
        type
      }).skip((page - 1) * size).limit(size);
      total = await Lose.find({
        type
      }).countDocuments();
    }
    res.send({
      result,
      total
    });
  } catch(error) {
    res.send('error', error);
  }
})

// 删除寻主寻物信息接口
router.post('/deleteItem', async (req, res) => {
  const { _id } = req.body;
  try {
    await Lose.findByIdAndRemove(_id);
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})

// 闲置物品接口 && 模糊检索接口
router.post('/getIdle', async (req, res) => {
  const { page, size, keyWord } = req.body;
  try {
    let result = [], total = 0;
    if (keyWord !== '') {
      const name = new RegExp(keyWord, 'i');
      result = await Idle.find({name})
        .skip((page - 1) * size).limit(size);
      total = await Idle.find({name}).countDocuments();
    } else {
      result = await Idle.find({}).skip((page - 1) * size).limit(size);
      total = await Idle.find({}).countDocuments();
    }
    res.send({result, total});
  } catch(error) {
    res.send('error');
  }
})

// 删除闲置物品信息接口
router.post('/delIdle/item', async (req, res) => {
  const { _id } = req.body;
  try {
    await Idle.findByIdAndRemove(_id);
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})

// 求购信息接口 && 模糊检索
router.post('/getNeed', async (req, res) => {
  const { page, size, keyWord } = req.body;
  try {
    let result = [], total = 0;
    if (keyWord !== '') {
      const name = new RegExp(keyWord, 'i');
      result = await Need.find({name})
        .skip((page - 1) * size).limit(size);
      total = await Need.find({name}).countDocuments();
    } else {
      result = await Need.find({}).skip((page - 1) * size).limit(size);
      total = await Need.find({}).countDocuments();
    }
    res.send({result, total});
  } catch(error) {
    res.send('error');
  }
})

// 删除单个求购信息接口
router.post('/delNeed/item', async (req, res) => {
  const { _id } = req.body;
  try {
    await Need.findByIdAndRemove(_id);
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})

// 获取校园互助信息
router.post('/getHelp', async (req, res) => {
  const { page, size, keyWord } = req.body;
  try {
    let result = [], total = 0;
    if (keyWord !== '') {
      const name = new RegExp(keyWord, 'i');
      result = await Help.find({name})
        .skip((page - 1) * size).limit(size);
      total = await Help.find({name}).countDocuments();
    } else {
      result = await Help.find({}).skip((page - 1) * size).limit(size);
      total = await Help.find({}).countDocuments();
    }
    res.send({result, total});
  } catch(error) {
    res.send('error');
  }
})

// 删除单个校园互助信息接口
router.post('/delHelp/item', async (req, res) => {
  const { _id } = req.body;
  try {
    await Help.findByIdAndRemove(_id);
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})

// 用户管理 && 模糊检索接口
router.post('/getUser', async (req, res) => {
  const { page, size, keyWord} = req.body;
  try {
    let result = [], total = 0;
    if (keyWord !== '') { // 有关键词检索
      const userName = new RegExp(keyWord, 'i');
      result = await User.find({
        username: userName
      }).skip((page - 1) * size).limit(size);
      total = await User.find({
        username: userName
      }).countDocuments();
    } else { // 无关键词返回全部
      result = await User.find()
        .skip((page - 1) * size).limit(size);
      total = await User.find().countDocuments();
    }
    res.send({
      result,
      total
    });
  } catch(error) {
    res.send('error', error)
  }
})

// 删除用户信息接口
router.post('/deleteUser', async (req, res) => {
  const { _id } = req.body;
  try {
    await User.findByIdAndRemove(_id);
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})

// 管理员管理 && 模糊检索接口
router.post('/getAdmin', async (req, res) => {
  const { page, size, keyWord} = req.body;
  try {
    let result = [], total = 0;
    if (keyWord !== '') { // 有关键词检索
      const userName = new RegExp(keyWord, 'i');
      result = await Admin.find({
        username: userName
      }).skip((page - 1) * size).limit(size);
      total = await Admin.find({
        username: userName
      }).countDocuments();
    } else { // 无关键词返回全部
      result = await Admin.find()
        .skip((page - 1) * size).limit(size);
      total = await Admin.find().countDocuments();
    }
    res.send({
      result,
      total
    });
  } catch(error) {
    res.send('error', error)
  }
})

// 新增管理员接口
router.post('/addAdmin', async (req, res) => {
  const { username, password, role, nickname, create_time, _id } = req.body;
  try {
    if (_id) {
      await Admin.findByIdAndUpdate(_id, {
        username,
        password,
        role,
        nickName: nickname,
      })
    } else {
      await Admin.create({
        username,
        password,
        role,
        nickName: nickname,
        createTime: create_time
      })
    }
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})

// 删除管理员信息接口
router.post('/deleteAdmin', async (req, res) => {
  const { _id, username } = req.body;
  try {
    const { role } = await Admin.findOne({
      username
    });
    if (role) {
      res.send("noPower")
    } else {
      await Admin.findByIdAndRemove(_id);
      res.send('success');
    }
  } catch(error) {
    res.send('error');
  }
})

// 导出路由器
module.exports = router;
