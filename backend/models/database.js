const mysql = require('mysql2');
const dbConfig = require('../config/dbConfig');

// 创建连接池
const pool = mysql.createPool(dbConfig);

// 使用 Promise 包装
const promisePool = pool.promise();

// 测试连接
pool.getConnection((err, connection) => {
  if (err) {
    console.error('MySQL 数据库连接失败:', err.message);
    console.error('请确保：');
    console.error('1. MySQL 服务已启动');
    console.error('2. 数据库配置正确 (backend/config/dbConfig.js)');
    console.error('3. 已执行 database.sql 创建数据库和表');
  } else {
    console.log('MySQL 数据库连接成功');
    connection.release();
  }
});

module.exports = promisePool;
