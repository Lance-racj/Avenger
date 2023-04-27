const express = require('express');
const router = express.Router();
const { Idle, Need } = require('../../database');

// 发布闲置接口
router.post('/publish', async (req, res) => {
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
router.post('/need/publish', async (req, res) => {
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

// 获取首页闲置接口(？我的)
router.get('/list', async (req, res) => {
  try {
    const { openid } = req.query;
    if (openid) { // 我的
      result = await Idle.find({openid})
    } else { // 全部
      result = await Idle.find({})
    }
    res.send(result);
  } catch(error) {
    res.send('error')
  }
})

// 获取首页求购信息接口
router.get('/need/list', async (req, res) => {
  try {
    const { openid } = req.query;
    if (openid) { // 我的
      result = await Need.find({openid})
    } else { // 全部
      result = await Need.find({})
    }
    res.send(result);
  } catch(error) {
    res.send('error')
  }
})

// 删除我发布的闲置
router.post('/del', async (req, res) => {
  const { _id } = req.body;
  try {
    await Idle.findByIdAndRemove(_id);
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})

// 删除我发布的求购
router.post('/need/del', async (req, res) => {
  const { _id } = req.body;
  try {
    await Need.findByIdAndRemove(_id);
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})

module.exports = router;
