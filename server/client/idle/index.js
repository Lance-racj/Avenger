const express = require('express');
const router = express.Router();
const { Idle, Need, IdleCollection, NeedCollection } = require('../../database');

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
      money,
      status,
      time
    } = req.body;
    await Idle.create({openid, classify_1, classify_2, name, phone, money, status, desc, imgList, time});
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
      status,
      time
    } = req.body;
    await Need.create({openid, name, phone, desc, time, status});
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
    await IdleCollection.findOneAndRemove({
      id: _id
    });
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
    await NeedCollection.findOneAndRemove({
      id: _id
    });
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})
// 收藏闲置
router.post('/follow/add', async (req, res) => {
  try {
    const {
      openid,
      classify_1,
      classify_2,
      name,
      phone,
      desc,
      imgList,
      money,
      time,
      status,
      _id
    } = req.body;
    await IdleCollection.create({openid, classify_1, classify_2, name, phone, desc, imgList, money, time, status, id: _id});
    res.send('success');
  } catch(error) {
    res.send('error', error);
  }
})
// 取消收藏闲置
router.post('/follow/del', async (req, res) => {
  try {
    const {id, openid} = req.body;
    await IdleCollection.findOneAndRemove({
      id,
      openid
    })
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})
// 获取单个闲置收藏信息
router.get('/follow/item', async (req, res) => {
  try {
    const { id, openid } = req.query;
    const result = await IdleCollection.find({
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
// 获取闲置收藏列表
router.get('/follow/list', async (req, res) => {
  try {
    const { openid } = req.query;
    const result = await IdleCollection.find({
      openid,
    });
    res.send(result);
  } catch(error) {
    res.send('error');
  }
})
// 收藏求购
router.post('/need/follow/add', async (req, res) => {
  try {
    const {
      openid,
      name,
      phone,
      desc,
      time,
      status,
      _id
    } = req.body;
    await NeedCollection.create({openid, name, phone, desc, time, status, id: _id});
    res.send('success');
  } catch(error) {
    res.send('error', error);
  }
})
// 取消收藏求购
router.post('/need/follow/del', async (req, res) => {
  try {
    const {id, openid} = req.body;
    await NeedCollection.findOneAndRemove({
      id,
      openid
    })
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})
// 获取单个求购收藏信息
router.get('/need/follow/item', async (req, res) => {
  try {
    const { id, openid } = req.query;
    const result = await NeedCollection.find({
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
// 获取求购收藏列表
router.get('/need/follow/list', async (req, res) => {
  try {
    const { openid } = req.query;
    const result = await NeedCollection.find({
      openid
    });
    res.send(result);
  } catch(error) {
    res.send('error');
  }
})

router.post('/edit', async (req, res) => {  // 将status由0修改为1
  try {
    const { _id } = req.body;
    const item = await Idle.findById(_id);
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
    }
    item.status = 1;
    await item.save();
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})

router.post('/need/edit', async (req, res) => {  // 将status由0修改为1
  try {
    const { _id } = req.body;
    const item = await Need.findById(_id);
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
    }
    item.status = 1;
    await item.save();
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})

// 提交评论
router.post('/comment/add', async (req, res) => {
  const { content, nickname, time, _id } = req.body;
  try {
    const { commentList } = await Idle.findById(_id);
    commentList.push({
      nickname,
      content,
      time
    });
    await Idle.findByIdAndUpdate(_id, {
      commentList
    })
    const result = await Idle.findById(_id);
    res.send(result);
  } catch(error) {
    res.send('error');
  }
})

// 提交评论
router.post('/need/comment/add', async (req, res) => {
  const { content, nickname, time, _id } = req.body;
  try {
    const { commentList } = await Need.findById(_id);
    commentList.push({
      nickname,
      content,
      time
    });
    await Need.findByIdAndUpdate(_id, {
      commentList
    })
    const result = await Need.findById(_id);
    res.send(result);
  } catch(error) {
    res.send('error');
  }
})



module.exports = router;
