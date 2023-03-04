const express = require('express');
const axios = require('axios');
const { Lose, Admin, User } = require('./database');
const e = require('express');

const app = express();

// 使用中间件支持req.body
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// 解决跨域
app.all('*', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Headers", '*')
  next();
})

// test
app.get('/hello', (req, res) => {
  res.send('hello world');
})

// publish_lost
app.post('publish/lost', async (req, res) => {
  try {
    /* 将前端传过来的数据放入lose数据表中 */
    const {
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
    await Lose.create({type, classify_1, classify_2, name, date, region, phone, desc, imgList, time});
    res.send('success');
  } catch(error) {
    res.send('error', error);
  }
})

// 用户注册
app.post('/register', async (req, res) => {
  const {openid, username, password} = req.body;
  const result = await User.findOne({
    openid  // 保证每个人只能注册一个账号
  })
  if (result) {
    res.send('fail')
  } else {
    await User.create({
      openid,
      username,
      password
    });
    res.send('success')
  }
}) 

// 用户登录
app.post('/toLogin', async (req, res) => {
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

// 管理员登录接口
app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await Admin.findOne({username});
  if (result && result.password === password) {
    res.send(result);
  } else {
    res.send('error');
  }
})

// 用户管理接口
app.post('admin/user', async (req, res) => {
  const { page, size } = req.body;
  try {
    const result = await User.find()
      .skip((page - 1) * size).limit(size);
    const total = await User.find().countDocuments();
    res.send({
      result,
      total
    })
  } catch(error) {
    res.send(error)
  }
})

app.listen('3060', () => {
  console.log('server running...');
})