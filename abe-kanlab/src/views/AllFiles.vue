<template>
  <div class="files">
    <Card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入上传者" v-model="filter.userName" clearable> </el-input>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="请输入包含的标签" v-model="filter.tag" clearable> </el-input>
        </el-col>
        <el-col :span="12">
          <el-button style="float: right" type="primary" @click="search">筛选</el-button>
        </el-col>
      </el-row>
    </Card>

    <Card>
      <el-table :data="files">
        <el-table-column show-overflow-tooltip label="文件名" prop="fileName" width="200" />
        <el-table-column show-overflow-tooltip label="密文" prop="cipher" />
        <el-table-column show-overflow-tooltip label="上传者" prop="sharedUser" width="100" />
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
  </div>
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
  components: {
    Card,
  },
  mixins: [FileDownloader, FilterEmpty],
  data() {
    return {
      files: [],
      bookmark: "",
      filter: {},
    };
  },

  /**
   * 自动获取所有文件
   */
  mounted() {
    const tag = "";
    // 空 为所有人
    const userName = "";
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
    search() {
      this.bookmark = "";
      const { tag, userName } = this.filter;
      const { bookmark } = this;

      fileApi
        .files({ userName, tag, bookmark })
        .then((_) => {
          this.files = _.contents;
          this.bookmark = _.bookmark;
        })
        .catch(console.log);
    },

    decryDownload(scope) {
      const user = getters.userName();
      const { cipher, sharedUser, fileName, tags } = scope;
      fileApi
        .decrypt({ user, cipher, sharedUser, fileName, tags })
        .then(() => {
          return fileApi
            .download({ fileName, sharedUser })
            .then((content) => {
              this.saveFile(fileName, content);
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

.files > div {
  margin-top: var(--row-distance, 10px);
}
</style>


<style>
/* shared by child components */
.el-table .cell {
  white-space: nowrap !important;
}

.el-descriptions-item__content {
  white-space: nowrap !important;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-descriptions-item__label {
  white-space: nowrap !important;
}
</style>