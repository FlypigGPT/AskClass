const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// 获取所有学生
router.get('/', studentController.getAllStudents);

// 添加学生
router.post('/', studentController.addStudent);

// 删除学生
router.delete('/:id', studentController.deleteStudent);

// 随机抽取学生
router.get('/random', studentController.getRandomStudent);

module.exports = router;
