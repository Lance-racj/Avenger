const express = require('express');
const router = express.Router();
const { Help, HelpCollection } = require('../../database');

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
router.post('/edit', async (req, res) => {  // 将status由0修改为1
  try {
    const { _id } = req.body;
    const item = await Help.findById(_id);
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
// 收藏求助
router.post('/follow/add', async (req, res) => {
  try {
    const {
      openid,
      title,
      phone,
      desc,
      money,
      status,
      time,
      _id
    } = req.body;
    await HelpCollection.create({openid, title, phone, desc, status, money, time, id: _id});
    res.send('success');
  } catch(error) {
    res.send('error', error);
  }
})
// 取消收藏求助
router.post('/follow/del', async (req, res) => {
  try {
    const {id, openid} = req.body;
    await HelpCollection.findOneAndRemove({
      id,
      openid
    })
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})
// 获取单个求助收藏信息
router.get('/follow/item', async (req, res) => {
  try {
    const { id, openid } = req.query;
    const result = await HelpCollection.find({
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
// 获取求助收藏列表
router.get('/follow/list', async (req, res) => {
  try {
    const { openid } = req.query;
    const result = await HelpCollection.find({
      openid,
    });
    res.send(result);
  } catch(error) {
    res.send('error');
  }
})
// 删除求助帖子
router.post('/delete', async (req, res) => {
  const { _id } = req.body;
  try {
    await Help.findByIdAndRemove(_id);
    await HelpCollection.findOneAndRemove({
      id: _id
    });   // 同时删掉收藏里的帖子
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})

// 提交评论
router.post('/comment/add', async (req, res) => {
  const { content, nickname, time, _id } = req.body;
  try {
    const { commentList } = await Help.findById(_id);
    commentList.push({
      nickname,
      content,
      time
    });
    await Help.findByIdAndUpdate(_id, {
      commentList
    })
    const result = await Help.findById(_id);
    res.send(result);
  } catch(error) {
    res.send('error');
  }
})

// 模糊检索物品名字
router.get('/search/name', async (req, res) => {
  try {
    const { title } = req.query;
    const _title = new RegExp(title, 'i');
    const result = await Help.find({
      title: _title
    });
    res.send(result);
  } catch(error) {
    res.send('error');
  }
})

module.exports = router;
