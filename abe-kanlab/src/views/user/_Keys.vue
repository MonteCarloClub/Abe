<template>
  <Card title="密钥管理">
    <div>
      <div v-if="keys.length"></div>
      <el-empty v-else></el-empty>
    </div>
  </Card>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";

export default {
  name: "Keys",
  components: {
    Card,
  },
  data() {
    return {
      keys: [],
    };
  },
  beforeCreate: function () {
    console.log("Keys", "BeforeCreate");
  },
  created: function () {
    console.log("Keys", "Created");
  },
  beforeMount: function () {
    console.log("Keys", "BeforeMount");
  },
  mounted: function () {
    console.log("Keys", "Mounted");
  },
  beforeUpdate: function () {
    console.log("Keys", "BeforeUpdate");
  },
  updated: function () {
    console.log("Keys", "Updated");
  },
  methods: {},
};
</script>