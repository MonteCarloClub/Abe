<template>
  <div id="app">
    <el-container>
      <el-header>
        <Navigator />
      </el-header>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
import Navigator from "@/components/Navigator";

export default {
  name: "App",

  components: {
    Navigator,
  },

  data() {
    return {};
  },

  computed: {},

  methods: {},
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 900px;
  margin: auto;
}

.el-header {
  top: 0;
  z-index: 100;
  position: sticky;
  padding: 0 !important;
  transition: ease 0.6s all;
  background-color: white;
  box-shadow: 0 4px 12px #00000014, 0 0 1px #0100001a;
}
</style>