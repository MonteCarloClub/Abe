<template>
  <Card title="我的文件">
    <el-table :data="files">
      <el-table-column show-overflow-tooltip label="文件名" prop="fileName"/>
      <el-table-column show-overflow-tooltip label="密文" prop="cipher" />
      <el-table-column show-overflow-tooltip label="上传者" prop="sharedUser"/>
      <el-table-column show-overflow-tooltip label="加密策略" prop="policy" />
      <el-table-column show-overflow-tooltip label="标签" prop="tags">
        <template slot-scope="scope">
          <el-tag v-for="(tag, i) in filterEmpty(scope.row.tags)" :key="i" size="small" effect="plain">
            {{ tag }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="160" align="right">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="decryDownload(scope.row)">
            解密下载
          </el-button>
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
import { FileDownloader } from "@/mixins/Download";
import { FilterEmpty } from "@/mixins/FilterEmpty";

export default {
  name: "Mine",
  mixins: [FileDownloader, FilterEmpty],
  components: {
    Card,
  },
  data() {
    return {
      files: [],
      bookmark: "",
    };
  },

  mounted() {
    const tag = "";
    const userName = getters.userName();
    const { bookmark } = this;

    fileApi
      .files({ userName, tag, bookmark })
      .then((_) => {
        this.files = _.contents;
        this.bookmark = _.bookmark;
      })
      .catch(console.log);
  },

  methods: {
    decryDownload(scope) {
      const user = getters.userName();
      const { cipher, sharedUser, fileName, tags } = scope;
      fileApi
        .decrypt({ user, cipher, sharedUser, fileName, tags })
        .then(() => {
          return fileApi
            .download({ fileName, sharedUser })
            .then((_) => {
              this.saveFile(fileName, _);
            })
            .catch((e) => {
              this.$message({
                message: e.message,
                duration: 5000,
                type: "error",
              });
            });
        })
        .catch((e) => {
          this.$message({
            message: e.message,
            duration: 5000,
            type: "error",
          });
        });
    },
  },
};
</script>

<style scoped>
.el-tag {
  margin-right: 6px;
}
</style>