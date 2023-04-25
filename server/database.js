const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

// 连接mongodb数据库
mongoose.connect("mongodb://root:123456@localhost:27017/?authMechanism=DEFAULT").then(() => {
  console.log('success, 数据库连接成功');
}).catch((err) => {
  console.log('xxxx', err);
})

// 失物表
const LoseSchema = new mongoose.Schema({
  openid: {
    type: String
  },
  type: {
    type: Number
  },
  classify_1: {
    type: String
  },
  classify_2: {
    type: String
  },
  name: {
    type: String
  },
  date: {
    type: String
  },
  region: {
    type: String
  },
  phone: {
    type: String
  },
  desc: {
    type: String
  },
  imgList: {
    type: Array
  },
  time: {
    type: Number | String
  }
})

// 收藏物品表
const CollectionSchema = new mongoose.Schema({
  id: {
    type: String
  },
  openid: {
    type: String
  },
  type: {
    type: Number
  },
  classify_1: {
    type: String
  },
  classify_2: {
    type: String
  },
  name: {
    type: String
  },
  date: {
    type: String
  },
  region: {
    type: String
  },
  phone: {
    type: String
  },
  desc: {
    type: String
  },
  imgList: {
    type: Array
  },
  time: {
    type: String
  }
})

// 用户账号表
const UserSchema = new mongoose.Schema({
  openid: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  date: {
    type: Number
  }
})

// 管理员账号表
const AdminSchema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  createTime: {
    type: Number
  },
  // 权限：超管/管理
  role: {
    type: Number
  },
  nickName: {
    type: String
  }
})

const Lose = mongoose.model("LoseSchema", LoseSchema);
const Admin = mongoose.model("AdminSchema", AdminSchema);
const User = mongoose.model("UserSchema", UserSchema);
const Collection = mongoose.model("CollectionSchema", CollectionSchema);

// 创建一个该表的超管
// Admin.create({
//   username: 'lizuodong',
//   password: '123456789',
//   createTime: 1677039376780,
//   role: 1,
//   nickName: 'LZD'
// })

module.exports = {
  Lose,
  Admin,
  User,
  Collection
}