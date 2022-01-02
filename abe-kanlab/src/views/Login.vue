<template>
  <div class="sign">
    <div class="sign-container">
      <div class="sign-in">
        <el-card class="sign-card">
          <div slot="header" class="clearfix">
            <span>登录</span>
            <router-link
              :to="{ name: 'signup' }"
              class="sign-card-header--button"
            >
              前往注册
            </router-link>
          </div>

          <el-form ref="loginForm" :model="login" :rules="loginRules">
            <el-form-item prop="name">
              <el-input
                v-model="login.name"
                placeholder="请输入用户名"
                maxlength="11"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="login.password"
                placeholder="请输入密码"
                show-password
                @keyup.enter.native="onLoginSubmit"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                style="width: 100%"
                type="primary"
                @click="onLoginSubmit"
              >
                登录
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
  name: "Login",
  components: {},

  data() {
    return {
      login: {
        name: "",
        password: "",
      },
      loginRules: {
        name: [{ required: true, trigger: "blur", message: "手机号不能为空" }],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
        ],
      },

      loading: false,
    };
  },

  created() {
    const name = this.$route.query["name"];
    if (name) {
      this.login.name = name;
    }
  },

  methods: {
    onLoginSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) return;
        this.loading = true;
        actions
          .login(this.login)
          .then((data) => {
            this.$message({
              message: "登录成功",
              type: "success",
            });
            this.jumpTo();
            return data
          })
          .then((loginResp) => {
            const {token} = loginResp;
            // 获取 token 后立即获取用户信息
            return actions.getInfo(token)
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },

    jumpTo() {
      const redirect = this.$route.query["redirect"];
      if (redirect) {
        // 登录成功后回到想看的页面
        this.$router.push({ path: redirect });
      } else this.$router.push({ path: "/" });
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