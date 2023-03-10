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
    type: Number
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

// 创建一个该表的超管
// Admin.create({
//   username: 'root',
//   password: '123456',
//   createTime: 1677039378080,
//   role: 0,
//   nickName: 'Wt'
// })

module.exports = {
  Lose,
  Admin,
  User
}