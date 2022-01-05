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
  
  methods: {},
};
</script>