const express = require('express');
const { Lose, Admin, User } = require('./database');
const cors = require('cors');


const app = express();

app.use(cors());
app.options('*', cors());

// 使用中间件支持req.body
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// test
app.post('/hello', (req, res) => {
  res.send('hello world');
})

// publish_lost
app.post('/publish/lost', async (req, res) => {
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

// 寻主寻物接口
app.post('/admin/getLose', async (req, res) => {
  const { type, page, size } = req.body;
  try {
    const data = Lose.find({
      type
    }).skip((page-1)*size).limit(size);
    const total = Lose.find({
      type
    }).countDocuments();
    res.send({
      data,
      total
    });
  } catch(error) {
    res.send('error', error);
  }
})

// 用户管理接口
app.post('/admin/getUser', async (req, res) => {
  const { page, size } = req.body;
  try {
    const result = await User.find()
      .skip((page - 1) * size).limit(size);
    const total = await User.find().countDocuments();
    res.send({
      result,
      total
    });
  } catch(error) {
    res.send('error', error)
  }
})

// 删除用户信息接口
app.post('/admin/deleteUser', async (req, res) => {
  const { _id } = req.body;
  try {
    await User.findByIdAndRemove(_id);
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})

// 管理员管理接口
app.post('/admin/getAdmin', async (req, res) => {
  const { page, size } = req.body;
  try {
    const result = await Admin.find()
      .skip((page-1) * size).limit(size);
    const total = await Admin.find().countDocuments();
    res.send({
      result,
      total
    });
  } catch(error) {
    res.send(`error${error}`)
  }
})

// 在3060端口启动服务
app.listen('3060', () => {
  console.log('server running...');
})