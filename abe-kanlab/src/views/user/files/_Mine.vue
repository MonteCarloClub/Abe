<template>
  <Card title="我的文件">
    <el-table ref="multipleTable" :data="files">
      <el-table-column label="文件名" prop="fileName" width="200" />
      <el-table-column label="密钥" prop="cipher" width="100" />
      <el-table-column label="上传者" prop="sharedUser" width="100" />
      <el-table-column label="加密策略" prop="policy" />
      <el-table-column label="标签" prop="tags">
        <template slot-scope="scope">
          <el-tag v-for="tag in scope.row.tags" :key="tag"  size="small" effect="plain">
            {{ tag }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </Card>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import { fileApi } from "@/api/files";
import { getters } from "@/store/store";

export default {
  name: "Mine",
  components: {
    Card,
  },
  data() {
    return {
      files: [],
    };
  },

  mounted() {
    const tag = "*";
    const userName = getters.userName();
    fileApi.files({ userName, tag }).then((_) => {
      console.log(_);
      this.files = _.contents;
    });
  },

  methods: {},
};
</script>

<style scoped>
.el-tag {
  margin-right: 6px;
}
</style>