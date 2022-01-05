<template>
  <div class="nav">
    <div class="logo">
      <router-link to="/"> <Logo /> </router-link>
    </div>
    <div class="menu">
      <!-- <el-menu mode="horizontal" unique-opened router>
        <el-menu-item index="/organization"> 组织 </el-menu-item>
      </el-menu> -->
    </div>
    <div class="options">
      <router-link v-if="login" to="/user"> {{ userName }} </router-link>
      <router-link v-else to="/login"> 登录/注册 </router-link>
    </div>
  </div>
</template>

<script>
import { getters } from "@/store/store";
import { actions } from "@/store/actions";
import Logo from "@/components/Logo.vue";

export default {
  name: "Navigator",
  components: { Logo },

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
.nav {
  height: var(--header-height, 60px);
  padding: 0 var(--body-margin, 32px);
  display: flex;
}

a {
  text-decoration: none;
}

a, a:visited, a:hover, a:active {
  color: inherit;
}

.logo {
  flex: none;
  color: black;
}

.menu {
  flex-grow: 1;
}

.options {
  display: flex;
  align-items: center;
}

.el-menu {
  background-color: transparent !important;
}

.el-collapse-item__header {
  font-size: 20px !important;
  font-weight: bold !important;
  line-height: 50px !important;
}
</style>