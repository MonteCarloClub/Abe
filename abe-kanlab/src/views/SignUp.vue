<template>
  <div class="sign">
    <div class="sign-container">
      <div class="sign-up">
        <el-card class="sign-card">
          <div slot="header" class="clearfix">
            <span>注册</span>
            <router-link
              :to="{ name: 'login' }"
              class="sign-card-header--button"
            >
              前往登录
            </router-link>
          </div>

          <el-form ref="signupForm" :model="signup" :rules="signupRules">
            <el-form-item label="用户名" prop="name">
              <el-input
                v-model="signup.name"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input
                v-model="signup.password"
                placeholder="请输入密码"
                show-password
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                style="width: 100%"
                type="primary"
                @click="onSignupSubmit"
              >
                注册
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { actions } from "../store/actions";

export default {
  name: "SignUp",
  components: {},

  data() {
    return {
      signup: {
        name: "",
        password: "",
      },
      signupRules: {
        name: [{ required: true, trigger: "blur", message: "用户名不能为空" }],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
          { min: 8, trigger: "blur", message: "密码长度至少为 8 位" },
        ],
      },
    };
  },

  methods: {
    onSignupSubmit() {
      this.$refs.signupForm.validate((valid) => {
        if (!valid) return;

        this.loading = true;
        actions
          .signup(this.signup)
          .then((user) => {
            this.$message({
              message: "注册成功，请登录",
              type: "success",
            });
            this.$router.push({
              name: "login",
              query: { name: user.name },
            });
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(()=>{
            this.loading = false;
          });
      });
    },
  },
};
</script>

<style scoped>
.sign-container {
  max-width: 600px;
  margin: 60px auto;
}

.sign-card {
  width: 400px;
  margin: auto;
}

.sign-card-header--button {
  float: right;
  text-decoration: none;
  color: #79bbff;
}

.sign-card-header--button:hover {
  color: #409eff;
}
</style>