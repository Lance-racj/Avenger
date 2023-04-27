const express = require('express');
const router = express.Router();
const { Help } = require('../../database');

// 发布互助贴接口
router.post('/publish', async (req, res) => {
  try {
    const {
      openid,
      title,
      desc,
      status,
      phone,
      money,
      time
    } = req.body;
    await Help.create({openid, title, desc, status, phone, money, time});
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})

// 获取互助首页数据接口
router.get('/list', async (req, res) => {
  try {
    const result = await Help.find({});
    res.send(result);
  } catch(error) {
    res.send('error');
  }
})

// 将进行中状态改为结束
router.post('/edit', async (req, res) => {
  
})


module.exports = router;
