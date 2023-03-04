<template>
  <div class="userManage">
    <div class="dialog">
      <!-- 添加表单对话框 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form :model="form" :inline="true" :rules="rules" ref="form">
          <el-form-item label="姓名" prop="name">
            <el-input type="text" v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input type="text" v-model.number="form.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio v-model="form.sex" :label="1">男</el-radio>
            <el-radio v-model="form.sex" :label="0">女</el-radio>
          </el-form-item>
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
              v-model="form.birth"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="地址" prop="addr">
            <el-input type="text" v-model="form.addr" placeholder="输入地址"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="consleForm">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="header">
      <el-button @click="addUser" type="primary">+新增</el-button>
      <!-- 用户搜索区 -->
      <el-form :model="checkUser" class="checker">
        <el-form-item>
          <el-input placeholder="请输出用户相关信息" v-model="checkUser.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="checked">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <div class="table">
        <!-- 用户信息表格 -->
        <el-table :data="currentUsers" stripe border style="width: 100%" max-height="670">
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="sex" label="姓别" width="120">
            <!-- 自定义表格 -->
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.sex == 1 ?'男' : '女' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="120"></el-table-column>
          <el-table-column prop="birth" label="出生日期" width="250"></el-table-column>
          <el-table-column prop="addr" label="地址"></el-table-column>
          <!-- 操作按钮 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="editUser(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentPage"
          :current-page="currentPage"
          :page-sizes="[10,20,30,40,50]"
          :page-size="pageSize"
          layout="total,sizes,prev, pager, next"
          :total="totalPage"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// 用户接口
import { getUser, addUser, updateUser, deleteUser } from '../api/index'
export default {
  name: 'User',
  data() {
    return {
      // 对话框是否弹出
      dialogVisible: false,
      // 弹窗是新增还是编辑 1 是新增 0是编辑
      dialogType: 0,
      // 表单信息
      form: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: '',
      },
      // 验证规则
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        addr: [{ required: true, message: '请填写地址', trigger: 'blur' }],
        age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
        birth: [{ required: true, message: '请输入出生日期', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
      },
      // 表格信息
      tableData: [],
      totalPage: 0, //总页数
      currentPage: 1, //当前页数
      pageSize: 10, //每页总数默认10
      checkUser: {},
    }
  },
  computed: {
    // 当前页的用户信息
    currentUsers() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize - 1
      )
    },
  },
  methods: {
    // 操作成功提示
    message1() {
      this.$message({
        message: '操作成功成功',
        type: 'success',
      })
    },
    // 操作失败提示
    message2() {
      this.$message({
        message: '操作失败成功',
        type: 'warning',
      })
    },
    // 取消操作提示
    message3() {
      this.$message({
        message: '取消操作',
        type: 'info',
      })
    },
    // 表单提交
    onSubmit() {
      this.$refs.form.validate((valid) => {
        // 表单校验通过
        if (valid) {
          if (this.dialogType) {
            // dialogType为1 新增 调用addUser接口
            addUser(this.form).then(() => {
              // 调用getList接口刷新列表
              this.getList()
              this.message1()
            })
          } else {
            // dialogType为0 编辑 调用updateUser接口
            updateUser(this.form).then(() => {
              console.log('表单信息：', this.form)
              // 调用getList接口刷新列表
              this.getList()
              this.message1()
            })
          }
          console.log('表单校验成功')
          // 提交表单后清除表单信息
          this.handleClose()
        } else {
          // 表单校验不通过
          console.log('表单校验失败')
          this.message2
        }
      })
    },
    // 对话框关闭清除表单信息
    handleClose() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    // 对话框取消清除表单信息
    consleForm() {
      this.message3()
      this.handleClose()
    },
    // 新增用户
    addUser() {
      this.dialogVisible = true
    },
    // 编辑用户
    editUser(index, row) {
      console.log(row)
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
      // 将一整行的信息放到表单上
    },
    // 删除用户
    deleteUser(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // 调用deleteUser接口删除用户
          deleteUser(row).then(() => {
            // 调用getList接口刷新列表
            this.getList()
          })
          this.message1()
        })
        .catch(() => {
          this.message3()
        })
    },
    // 获取用户
    getList() {
      // 调用getUser接口获取列表数据
      getUser().then((resp) => {
        console.log(resp)
        this.tableData = resp.data.list
        this.totalPage = resp.data.list ? resp.data.list.length : 0
      })
    },
    // 分页总数变化
    handleSizeChange(pageSizes) {
      // 总页数变动
      this.pageSize = pageSizes
      this.currentPage = 1
    },
    // 点击当前页
    handleCurrentPage(page) {
      // 当前页变动
      this.currentPage = page
      console.log(page)
    },
    // 用户搜索
    checked() {
      // 调用深度搜索接口
    },
  },
  mounted() {
    this.getList()
  },
}
</script>

<style lang="less" scoped>
.userManage {
  height: 90%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .checker {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .common-table {
    position: relative;
    .page {
      position: absolute;
      bottom: -40px;
      right: 20px;
    }
  }
}
</style>