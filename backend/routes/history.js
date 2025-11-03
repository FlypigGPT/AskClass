const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

// 获取历史记录
router.get('/', historyController.getHistory);

// 添加历史记录
router.post('/', historyController.addHistory);

// 删除历史记录
router.delete('/:id', historyController.deleteHistory);

module.exports = router;
