<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu mode="horizontal" unique-opened router>
          <el-menu-item index="/" style="border-bottom: 0px">
            <div class="logo">
              <img alt="Kanlab logo" src="./assets/logo.png">
              <div>KanLab</div>
            </div>
          </el-menu-item>
          <el-menu-item index="/organization"> 组织 </el-menu-item>

          <el-submenu v-if="login" index="/user" class="el-submenu__right">
            <template slot="title">{{ userName }}</template>
            <el-menu-item index="/user"> 个人中心 </el-menu-item>
            <el-menu-item @click="logoutClicked"> 退出登录 </el-menu-item>
          </el-submenu>

          <el-submenu v-else index="/#" class="el-submenu__right">
            <template slot="title">登录/注册</template>
            <el-menu-item index="/login"> 登录 </el-menu-item>
            <el-menu-item index="/signup"> 注册 </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <!-- 内容 -->
      <router-view />
    </el-container>
  </div>
</template>

<script>
import { getters } from "./store/store";
import { actions } from "./store/actions";

export default {
  name: "App",

  components: {},

  data() {
    return {};
  },

  computed: {
    login: getters.isLogin,
    userName: getters.userName,
  },

  methods: {
    logoutClicked() {
      actions.logout().then(() => {
        this.$message({
          message: "退出登录",
          type: "success",
        });
        location.reload();
      });
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 1000px;
  margin: auto;
}

.el-submenu__right {
  float: right !important;
}

.el-menu--popup .el-menu-item:hover {
  background-color: #eeeeee !important;
}

.el-menu--popup {
  min-width: 100px !important;
}

.el-collapse-item__header {
  font-size: 20px !important;
  font-weight: bold !important;
  line-height: 50px !important;
}

.el-header {
  background-color: white;
  position: sticky;
  z-index: 100;
  top: 0;
}

.logo {
  display: flex;
  height: 100%;
  align-items: center;
}

.logo > img {
  height: 80%;
  width: auto;
}


@font-face {
  font-family: "MoonDance";
  src: local("MoonDance"),
   url(./assets/fonts/MoonDance-Regular.ttf) format("truetype");
}

.logo > div {
  font-family: MoonDance;
  font-size: 36px;
  font-weight: bold;
  margin-left: 12px;
}
</style>