<template>
  <Card title="我的信息" key="-1" data-index="-1">
    <el-descriptions :column="3">
      <el-descriptions-item label="用户名">{{ name }} </el-descriptions-item>
      <el-descriptions-item label="我的角色">
        {{role === "user" ? "用户" : "管理员"}}
      </el-descriptions-item>
      <el-descriptions-item label="所在通道">{{channel}}</el-descriptions-item>
    </el-descriptions>
  </Card>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import { getters } from "@/store/store";

export default {
  name: "Info",

  components: {
    Card,
  },

  computed: {
    ...getters.mapUser(["name", "channel", "role"])
  },

  beforeCreate: function () {
    console.log("Info", "BeforeCreate");
  },
  created: function () {
    console.log("Info", "Created");
  },
  beforeMount: function () {
    console.log("Info", "BeforeMount");
  },
  mounted: function () {
    console.log("Info", "Mounted");
  },
  beforeUpdate: function () {
    console.log("Info", "BeforeUpdate");
  },
  updated: function () {
    console.log("Info", "Updated");
  },
  methods: {},
};
</script>