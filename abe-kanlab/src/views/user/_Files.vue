<template>
  <Card title="我的文件">
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
  name: "Files",
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