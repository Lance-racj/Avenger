const express = require('express');
const { Lose, Admin, User, Collection } = require('./database');
const cors = require('cors');

const app = express();

app.use(cors());
app.options('*', cors());
// 使用中间件支持req.body
app.use(express.urlencoded({extended: true}));
app.use(express.json())

/* C端接口 */

// publish_lost
app.post('/publish/lost', async (req, res) => {
  try {
    /* 将前端传过来的数据放入lose数据表中 */
    const {
      openid,
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
    await Lose.create({openid, type, classify_1, classify_2, name, date, region, phone, desc, imgList, time});
    res.send('success');
  } catch(error) {
    res.send('error', error);
  }
})

// 上传图片接口
// app.post('/uploadImg', upload.array('file', 6), async (req, res) => {
//   res.send(req.files);
// })

// 获取首页的数据
app.get('/getLose', async (req, res) => {
  try {
    const { type } = req.query;
    const result = await Lose.find({
      type
    });
    res.send(result)
  } catch(error) {
    res.send('error');
  }
})

// 获取单人收藏列表
app.get('/getfollow/list', async (req, res) => {
  try {
    const { openid, type } = req.query;
    const result = await Collection.find({
      openid,
      type
    });
    res.send(result);
  } catch(error) {
    res.send('error');
  }
})

// 获取单个失物招领收藏信息
app.get('/getfollow', async (req, res) => {
  try {
    const { id, openid } = req.query;
    const result = await Collection.find({
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

// 收藏失物招领帖
app.post('/follow/add', async (req, res) => {
  try {
    /* 将前端传过来的数据放入lose数据表中 */
    const {
      openid,
      type,
      classify_1,
      classify_2,
      name,
      date,
      region,
      phone,
      desc,
      imgList,
      time,
      _id
    } = req.body;
    await Collection.create({openid, type, classify_1, classify_2, name, date, region, phone, desc, imgList, time, id: _id});
    res.send('success');
  } catch(error) {
    res.send('error', error);
  }
})

// 取消收藏失物招领帖
app.post('/follow/del', async (req, res) => {
  try {
    const {id, openid} = req.body;
    await Collection.findOneAndRemove({
      id,
      openid
    })
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})

// 用户注册
app.post('/register', async (req, res) => {
  const {openid, username, password, date} = req.body;
  const result = await User.findOne({
    username  // 保证每个人只能注册一个账号
  })
  if (result) {
    res.send('fail')
  } else {
    await User.create({
      openid,
      username,
      password,
      date
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


/* B端接口 */


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

// 寻主寻物接口 && 模糊检索接口
app.post('/admin/getLose', async (req, res) => {
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
app.post('/admin/deleteItem', async (req, res) => {
  const { _id } = req.body;
  try {
    await Lose.findByIdAndRemove(_id);
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})

// 用户管理 && 模糊检索接口
app.post('/admin/getUser', async (req, res) => {
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
app.post('/admin/deleteUser', async (req, res) => {
  const { _id } = req.body;
  try {
    await User.findByIdAndRemove(_id);
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})

// 管理员管理 && 模糊检索接口
app.post('/admin/getAdmin', async (req, res) => {
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
app.post('/admin/addAdmin', async (req, res) => {
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
app.post('/admin/deleteAdmin', async (req, res) => {
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

// 在3060端口启动服务
app.listen('3060', () => {
  console.log('server running...');
})