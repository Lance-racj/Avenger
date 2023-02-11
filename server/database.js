const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

// 连接mongodb数据库
mongoose.connect("mongodb://localhost:27017/loseMg").then(() => {
  console.log('success');
}).catch((err) => {
  console.log(err);
})

// 创建表
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

const lose = mongoose.model("LoseSchema", LoseSchema);

module.exports = {
  lose
}