<template>
  <div class="login">
    <el-form
      class="login-container"
      :model="form"
      :rules="rules"
      ref="userLogin"
      label-width="65px"
    >
      <h3 class="login-title">系统登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item class="buttonA">
        <el-button type="primary">登录</el-button>
      </el-form-item>
      <el-form-item class="buttonB">
        <el-button type="danger">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
}
</script>

<style lang="less" scoped>
.login-container {
  width: 350px;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  background-color: #fff;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  box-sizing: border-box;
  .login-title {
    text-align: center;
    margin-bottom: 30px;
    color: #505458;
  }
  .el-input {
    width: 198px;
  }
  .buttonA {
    float: left;
    margin-right: 10px;
    margin-left: 15px;
  }
}
</style>