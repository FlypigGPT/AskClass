// Vue 3 应用配置
const { createApp } = Vue;

const API_BASE_URL = 'http://localhost:3000/api';

createApp({
  data() {
    return {
      // 数据状态
      students: [],           // 学生列表
      history: [],            // 历史记录
      selectedStudent: null,  // 当前选中的学生
      isRandoming: false,     // 是否正在抽取
      showAddForm: false,     // 是否显示添加表单
      
      // 表单数据
      newStudent: {
        name: '',
        student_id: '',
        class_name: ''
      },
      questionInput: '',
      qualitySelect: ''
    };
  },
  
  mounted() {
    // 页面加载时获取数据
    this.loadStudents();
    this.loadHistory();
  },
  
  methods: {
    // 随机抽取学生
    async randomSelectStudent() {
      try {
        this.isRandoming = true;
        
        const response = await fetch(`${API_BASE_URL}/students/random`);
        const result = await response.json();
        
        if (result.message === 'success' && result.data) {
          this.selectedStudent = result.data;
        } else {
          alert('没有找到学生，请先添加学生信息');
        }
      } catch (error) {
        console.error('抽取学生失败:', error);
        alert('抽取失败，请检查服务器连接');
      } finally {
        this.isRandoming = false;
      }
    },
    
    // 保存抽问记录
    async saveRecord() {
      if (!this.selectedStudent) {
        alert('请先抽取学生');
        return;
      }
      
      try {
        const response = await fetch(`${API_BASE_URL}/history`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            student_id: this.selectedStudent.id,
            question: this.questionInput,
            answer_quality: this.qualitySelect || null
          })
        });
        
        const result = await response.json();
        
        if (result.message === 'success') {
          alert('记录保存成功！');
          this.questionInput = '';
          this.qualitySelect = '';
          this.selectedStudent = null;
          this.loadHistory();
        } else {
          alert('保存失败：' + result.error);
        }
      } catch (error) {
        console.error('保存记录失败:', error);
        alert('保存失败，请检查服务器连接');
      }
    },
    
    // 添加学生
    async addStudent() {
      const { name, student_id, class_name } = this.newStudent;
      
      if (!name || !student_id) {
        alert('姓名和学号不能为空');
        return;
      }
      
      try {
        const response = await fetch(`${API_BASE_URL}/students`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            student_id,
            class_name
          })
        });
        
        const result = await response.json();
        
        if (result.message === 'success') {
          alert('学生添加成功！');
          this.cancelAdd();
          this.loadStudents();
        } else {
          alert('添加失败：' + result.error);
        }
      } catch (error) {
        console.error('添加学生失败:', error);
        alert('添加失败，请检查服务器连接');
      }
    },
    
    // 取消添加
    cancelAdd() {
      this.showAddForm = false;
      this.newStudent = {
        name: '',
        student_id: '',
        class_name: ''
      };
    },
    
    // 删除学生
    async deleteStudent(id) {
      if (!confirm('确定要删除这个学生吗？')) {
        return;
      }
      
      try {
        const response = await fetch(`${API_BASE_URL}/students/${id}`, {
          method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.message === 'success') {
          alert('删除成功！');
          this.loadStudents();
        } else {
          alert('删除失败：' + result.error);
        }
      } catch (error) {
        console.error('删除学生失败:', error);
        alert('删除失败，请检查服务器连接');
      }
    },
    
    // 删除历史记录
    async deleteHistory(id) {
      if (!confirm('确定要删除这条记录吗？')) {
        return;
      }
      
      try {
        const response = await fetch(`${API_BASE_URL}/history/${id}`, {
          method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.message === 'success') {
          alert('删除成功！');
          this.loadHistory();
        } else {
          alert('删除失败：' + result.error);
        }
      } catch (error) {
        console.error('删除历史记录失败:', error);
        alert('删除失败，请检查服务器连接');
      }
    },
    
    // 加载学生列表
    async loadStudents() {
      try {
        const response = await fetch(`${API_BASE_URL}/students`);
        const result = await response.json();
        
        if (result.message === 'success') {
          this.students = result.data;
        }
      } catch (error) {
        console.error('加载学生列表失败:', error);
      }
    },
    
    // 加载历史记录
    async loadHistory() {
      try {
        const response = await fetch(`${API_BASE_URL}/history`);
        const result = await response.json();
        
        if (result.message === 'success') {
          this.history = result.data;
        }
      } catch (error) {
        console.error('加载历史记录失败:', error);
      }
    },
    
    // 格式化时间
    formatDateTime(dateString) {
      if (!dateString) return '-';
      const date = new Date(dateString);
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    
    // 格式化回答质量
    formatQuality(quality) {
      if (!quality) return '-';
      const stars = '⭐'.repeat(parseInt(quality));
      return `<span class="quality-stars">${stars}</span>`;
    }
  }
}).mount('#app');
