const db = require('../models/database');

// 获取抽问历史
exports.getHistory = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        qh.id,
        qh.question,
        qh.answer_quality,
        qh.created_at,
        s.name,
        s.student_id,
        s.class_name
      FROM question_history qh
      JOIN students s ON qh.student_id = s.id
      ORDER BY qh.created_at DESC
      LIMIT 50
    `);
    
    res.json({
      message: 'success',
      data: rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 添加抽问记录
exports.addHistory = async (req, res) => {
  const { student_id, question, answer_quality } = req.body;
  
  if (!student_id) {
    res.status(400).json({ error: '学生ID不能为空' });
    return;
  }

  try {
    const [result] = await db.query(
      'INSERT INTO question_history (student_id, question, answer_quality) VALUES (?, ?, ?)',
      [student_id, question || '', answer_quality || null]
    );
    
    res.json({
      message: 'success',
      data: {
        id: result.insertId
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 删除历史记录
exports.deleteHistory = async (req, res) => {
  const { id } = req.params;
  
  try {
    const [result] = await db.query('DELETE FROM question_history WHERE id = ?', [id]);
    
    res.json({
      message: 'success',
      changes: result.affectedRows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
