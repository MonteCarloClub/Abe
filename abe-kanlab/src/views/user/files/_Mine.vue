<template>
  <Card title="我的文件">
    <el-table :data="files">
      <el-table-column label="文件名" prop="fileName" width="200" />
      <el-table-column label="密文" prop="cipher" />
      <el-table-column label="上传者" prop="sharedUser" width="100" />
      <el-table-column label="加密策略" prop="policy" />
      <el-table-column label="标签" prop="tags">
        <template slot-scope="scope">
          <el-tag v-for="(tag, i) in scope.row.tags" :key="i" size="small" effect="plain">
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

export default {
  name: "Mine",
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
      const { cipher, sharedUser, fileName } = scope;
      fileApi
        .decrypt({ user, cipher, sharedUser, fileName })
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

    saveFile(fileName, _) {
      var pom = document.createElement("a");
      pom.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(_));
      pom.setAttribute("download", fileName);

      if (document.createEvent) {
        var event = document.createEvent("MouseEvents");
        event.initEvent("click", true, true);
        pom.dispatchEvent(event);
      } else {
        pom.click();
      }
    },
  },
};
</script>

<style scoped>
.el-tag {
  margin-right: 6px;
}
</style>