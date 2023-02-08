const mysql = require('mysql');

// 创建链接对象
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lzc18791473857',
  port: 3306,
  database: 'mysql'
});

// 开始连接
connection.connect();

const sql = `select * from db`;
connection.query(sql, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('result', result);
})

connection.end();
