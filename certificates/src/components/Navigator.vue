<template>
  <div class="nav">
    <div class="logo">
      <router-link to="/"> <Logo /> </router-link>
    </div>
    <div class="menu"></div>
    <div class="options">
      <router-link to="/">
        <button> 证书管理 </button>
      </router-link>

      <router-link to="/">
        <button> 文件仓库 </button>
      </router-link>

      <router-link to="/">
        <button class="login-button">登录 / 注册</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue";

export default {
  name: "Navigator",
  components: { Logo },

  computed: {
  },

  methods: {
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

a,
a:visited,
a:hover,
a:active {
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

button {
  color: #767676;
  border: none;
  height: 32px;
  font-size: 14px;
  padding: 0 11px;
  line-height: 30px;
  border-radius: 4px;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  transition: all 0.1s ease-in-out;
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  cursor: pointer;
  background-color: transparent;
}

button:hover {
  color: black;
}

.login-button {
  border: 1px solid #76767699;
}

.login-button:hover {
  border: 1px solid #767676;
}
</style>