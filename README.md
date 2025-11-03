# 课堂抽问系统 (Classroom Q&A System)

一个基于 Node.js 的课堂随机抽问系统，包含学生管理和抽问记录功能。

## 功能特点

- 📝 学生信息管理（添加、删除、查看）
- 🎲 随机抽取学生回答问题
- 📊 抽问历史记录
- 💾 SQLite 数据库存储
- 🎨 简洁的前端界面

## 技术栈

- **后端**: Node.js + Express
- **数据库**: MySQL 8.0+
- **前端**: HTML5 + CSS3 + JavaScript

## 安装步骤

### 1. 配置 MySQL 数据库

确保 MySQL 服务已启动（端口 3306），然后执行数据库脚本：

```bash
# 方式1：命令行执行
mysql -u root -p < database.sql

# 方式2：进入 MySQL 后执行
mysql -u root -p
source D:\Dif_code\Ask_For_Class\database.sql
```

### 2. 配置数据库连接

修改 `backend/config/dbConfig.js` 文件，设置您的 MySQL 用户名和密码：

```javascript
module.exports = {
  host: 'localhost',
  port: 3306,
  user: 'root',        // 改为您的用户名
  password: 'root',    // 改为您的密码
  database: 'classroom_system'
};
```

### 3. 安装依赖

```bash
npm install
```

### 4. 启动服务器

```bash
npm start
```

### 5. 访问系统

打开浏览器访问：
```
http://localhost:3000
```

## 开发模式

使用 nodemon 自动重启服务器：
```bash
npm run dev
```

## 安全提示

⚠️ **重要**：`backend/config/dbConfig.js` 包含数据库密码，已被添加到 `.gitignore`，不会被提交到 Git。

如需分享项目，请参考 `backend/config/dbConfig.example.js` 模板文件。

## API 接口

### 学生管理
- `GET /api/students` - 获取所有学生
- `POST /api/students` - 添加学生
- `DELETE /api/students/:id` - 删除学生

### 抽问功能
- `GET /api/random-student` - 随机抽取学生
- `GET /api/history` - 获取抽问历史
- `POST /api/history` - 记录抽问

## 项目结构

```
Ask_For_Class/
├── backend/
│   ├── server.js           # 服务器入口
│   ├── models/
│   │   ├── database.js     # 数据库连接
│   │   └── initDatabase.js # 数据库初始化
│   ├── controllers/
│   │   ├── studentController.js  # 学生控制器
│   │   └── historyController.js  # 历史控制器
│   └── routes/
│       ├── students.js     # 学生路由
│       └── history.js      # 历史路由
├── frontend/
│   ├── index.html          # 主页面
│   ├── css/
│   │   └── style.css       # 样式文件
│   └── js/
│       └── app.js          # 前端逻辑
└── package.json
```

## 许可证

ISC
