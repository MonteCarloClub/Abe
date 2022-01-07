<template>
  <Card title="上传文件">
    <div>
      <div v-if="files.length"></div>
      <el-empty v-else description="暂无"></el-empty>
    </div>
  </Card>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";

export default {
  name: "Upload",
  components: {
    Card,
  },
  data() {
    return {
      files: [],
    };
  },
  
  methods: {},
};
</script>