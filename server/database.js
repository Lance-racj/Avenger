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
  status: {
    type: Number
  },
  time: {
    type: Number
  }
})

// 失物帖收藏表
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
  status: {
    type: Number
  },
  time: {
    type: String
  }
})

// 闲置收藏表
const IdleCollectionSchema = new mongoose.Schema({
  id: {
    type: String
  },
  openid: {
    type: String
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
  phone: {
    type: String
  },
  desc: {
    type: String
  },
  imgList: {
    type: Array
  },
  status: {
    type: Number
  },
  money: {
    type: Number
  },
  time: {
    type: String
  }
})

// 求购收藏表
const NeedCollectionSchema = new mongoose.Schema({
  id: {
    type: String
  },
  openid: {
    type: String
  },
  name: {
    type: String
  },
  phone: {
    type: String
  },
  desc: {
    type: String
  },
  status: {
    type: Number
  },
  time: {
    type: String
  }
})

// 互助收藏表
const HelpCollectionSchema = new mongoose.Schema({
  id: {
    type: String
  },
  openid: {
    type: String
  },
  title: {
    type: String
  },
  desc: {
    type: String
  },
  status: {
    type: Number  // 0: 正在寻找中  1: 已结束
  },
  phone: {
    type: String
  },
  money: {
    type: Number
  },
  status: {
    type: Number
  },
  time: {
    type: String
  }
})

// 闲置物品表
const IdleSchema = new mongoose.Schema({
  openid: {
    type: String
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
  phone: {
    type: String
  },
  desc: {
    type: String
  },
  imgList: {
    type: Array
  },
  money: {
    type: Number
  },
  status: {
    type: Number
  },
  time: {
    type: String
  }
})

// 求购物品表
const NeedSchema = new mongoose.Schema({
  openid: {
    type: String
  },
  name: {
    type: String
  },
  phone: {
    type: String
  },
  desc: {
    type: String
  },
  status: {
    type: Number
  },
  time: {
    type: String
  }
})

// 求助贴表
const HelpSchema = new mongoose.Schema({
  openid: {
    type: String
  },
  title: {
    type: String
  },
  desc: {
    type: String
  },
  status: {
    type: Number  // 0: 正在寻找中  1: 已结束
  },
  phone: {
    type: String
  },
  money: {
    type: Number
  },
  status: {
    type: Number
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
const Idle = mongoose.model("IdleSchema", IdleSchema);
const Need = mongoose.model("NeedSchema", NeedSchema);
const Help = mongoose.model("HelpSchema", HelpSchema);
const IdleCollection = mongoose.model("IdleCollectionSchema", IdleCollectionSchema);
const NeedCollection = mongoose.model("NeedCollectionSchema", NeedCollectionSchema);
const HelpCollection = mongoose.model("HelpCollectionSchema", HelpCollectionSchema);

// 创建一个该表的超管
// Admin.create({
//   username: 'liuzhanchen',
//   password: '123456789',
//   createTime: 1677039376780,
//   role: 0,
//   nickName: 'LZC'
// })

module.exports = {
  Lose,
  Admin,
  User,
  Collection,
  IdleCollection,
  NeedCollection,
  HelpCollection,
  Idle,
  Need,
  Help
}