<template>
  <Card title="上传文件">
    <div class="grid-cols">
      <el-upload ref="upload" drag action="" :http-request="selecedFile" :on-remove="handleRemove">
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
      <el-form
        label-position="left"
        ref="form"
        :rules="uploadRules"
        :model="form"
        label-width="100px"
      >
        <el-form-item prop="policy" label="策略表达式">
          <el-input v-model="form.policy"></el-input>
        </el-form-item>
        <el-form-item prop="tags" label="标签">
          <el-select v-model="form.tags" multiple placeholder="请添加">
            <el-option v-for="o in options" :key="o" :label="o" :value="o"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="upload">上传到服务器</el-button>
        </el-form-item>
      </el-form>
    </div>
  </Card>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import { Message, Notification } from "element-ui";
import { fileApi } from "@/api/files";
import { getters } from "@/store/store";

export default {
  name: "Upload",
  components: {
    Card,
  },
  data() {
    return {
      form: {
        tags: [],
        policy: "",
      },
      options: ["shanghai", "myc", "edu", "test"],
      uploadRules: {
        policy: [{ required: true, trigger: "blur", message: "请填写上传策略" }],
        tags: [{ required: true, trigger: "blur", message: "请选择标签" }],
      },
    };
  },

  watch: {},

  async mounted() {},

  methods: {
    selecedFile(param) {
      this.file = param.file;
    },
    handleRemove(file) {
      this.$refs.upload.abort(file);
    },
    async upload() {
      if (!this.file) {
        Notification.error({
          title: "拒绝",
          message: "请添加文件",
          duration: 1000,
        });
        return;
      }

      const tags = [...this.form.tags];
      if (tags.length === 0) {
        Notification.error({
          title: "拒绝",
          message: "请选择标签",
          duration: 1000,
        });
        return;
      }
      this.$refs.applyForm.validate(async (valid) => {
        if (!valid) return;

        const file = this.file;
        const userName = getters.userName();
        const fileName = file.name;
        const policy = this.form.policy;

        const res = await fileApi.encrypt({ file, userName, fileName, tags, policy });
        if (res) {
          for (var pair of res.entries()) {
            console.log(pair[0] + ": " + pair[1]);
          }
          Message({
            message: "上传成功",
            duration: 1000,
            type: "success",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.grid-cols {
  display: grid;
  grid-template-columns: 360px auto;
  gap: 16px;
}

.el-select {
  width: 100%;
}
</style>