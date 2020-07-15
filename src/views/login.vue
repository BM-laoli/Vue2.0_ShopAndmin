<template>
  <div class="contents">
    <div class="login_box">
      <h2>系统登录</h2>
      <div class="box">
        <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" size="small">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" show-password v-model="loginForm.password"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { checkEmail } from "../lib/utils";
export default {
  name: "login",
  data () {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { mix: 4, max: 15, message: "长度在6到15位之间", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { mix: 6, max: 15, message: "长度在6到15位之间", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async login () {
      // 发请求要做三件事
      // 1. 进行表表当数据的验证
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          this.$message.error("输入不合法！");
          return;
        }

        // 2.验证通过开始发请求
        let { data: res } = await this.$http.post('/login', this.loginForm)
        // 3. 拿到数据之后开始做处理 是存还是抛出错误====> 请拦截器中判断错误

        window.sessionStorage.setItem("token", res.token);

        this.$notify({
          title: "标题名称",
          message: "登录成功"
        });
        this.$router.push("/home");
      })
      this.$router.push("/home");

    }
  }
}
</script>

<style  scoped>
.contents {
  background-color: #2d3a4b;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login_box {
  width: 500px;
  height: 300px;
  background-color: #ffff;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
}

.box {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  margin: 8px 0;
}
.el-button {
  width: 100%;
}
</style>