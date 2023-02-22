const express = require('express');
const axios = require('axios');
const { Lose, Admin } = require('./database');

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

// login
app.get('login', async (req, res) => {

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

app.listen('3060', () => {
  console.log('server running...');
})