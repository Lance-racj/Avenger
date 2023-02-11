const express = require('express');
const axios = require('axios');
const {lose} = require('./database');

const app = express();

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
    await lose.create({type, classify_1, classify_2, name, date, region, phone, desc, imgList, time});
    res.send('success');
  } catch(error) {
    res.send('error', error);
  }
})

// login
app.get('login', async (req, res) => {

})

app.listen('3060', () => {
  console.log('server running...');
})