const express = require('express');
const router = express.Router();
const { Idle, Need } = require('../../database');

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

module.exports = router;
