const db = require('../models/database');

// 获取所有学生
exports.getAllStudents = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM students ORDER BY created_at DESC');
    res.json({
      message: 'success',
      data: rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 添加学生
exports.addStudent = async (req, res) => {
  const { name, student_id, class_name } = req.body;
  
  if (!name || !student_id) {
    res.status(400).json({ error: '姓名和学号不能为空' });
    return;
  }

  try {
    const [result] = await db.query(
      'INSERT INTO students (name, student_id, class_name) VALUES (?, ?, ?)',
      [name, student_id, class_name || '']
    );
    
    res.json({
      message: 'success',
      data: {
        id: result.insertId,
        name,
        student_id,
        class_name
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 删除学生
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  
  try {
    const [result] = await db.query('DELETE FROM students WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      res.status(404).json({ error: '学生不存在' });
      return;
    }
    
    res.json({
      message: 'success',
      changes: result.affectedRows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 随机抽取学生
exports.getRandomStudent = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM students ORDER BY RAND() LIMIT 1');
    
    if (rows.length === 0) {
      res.status(404).json({ error: '没有学生数据' });
      return;
    }
    
    res.json({
      message: 'success',
      data: rows[0]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
