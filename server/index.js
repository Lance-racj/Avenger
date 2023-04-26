const express = require('express');
const cors = require('cors');
const admin = require('./admin/index');
const client = require('./client/index');

const app = express();

app.use(cors());
app.options('*', cors());
// 使用中间件支持req.body
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname));


app.use('/admin', admin);
app.use('/api', client);


// 在3060端口启动服务
app.listen('3060', () => {
  console.log('server running...');
})