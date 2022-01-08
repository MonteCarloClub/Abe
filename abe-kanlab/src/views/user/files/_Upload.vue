<template>
  <Card title="上传文件">
    <el-upload
      ref="upload"
      drag
      multiple
      :action="action"
      :http-request="uploadFile"
      :on-remove="handleRemove"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>
    <div class="role">
      <div v-for="(item, index) in allRoles" :key="index">
        <div>{{ item.key }}:</div>
        <el-checkbox-group v-model="selectRolesList[index]">
          <el-checkbox v-for="role in item.value" :key="role" :label="role" />
        </el-checkbox-group>
      </div>
    </div>
    <div v-if="fileLegancy">策略表达式：{{ fileLegancy }}</div>
  </Card>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import { Message, Notification } from "element-ui";

export default {
  name: "Upload",
  components: {
    Card,
  },
  data() {
    return {
      action: "",
      allRoles: [],
      selectRolesList: [],
      fileLegancy: "",
    };
  },

  watch: {
    selectRolesList: {
      handler: function (newV) {
        this.fileLegancy = "";
        newV.forEach((item, index) => {
          if (item.length === 0) return;
          else if (item.length === 1) {
            /* index !== 0 && (this.fileLegancy += ' and ' + item) */
            /* index === 0 &&  */ this.fileLegancy += item;
          } else {
            this.fileLegancy = this.fileLegancy + "(";
            this.fileLegancy = this.fileLegancy + item.join(" or ");
            this.fileLegancy = this.fileLegancy + ")";
          }
          if (index < newV.filter((v) => v.length > 0).length - 1)
            this.fileLegancy = this.fileLegancy + " and ";
        });
      },
      immediate: true,
    },
  },

  async mounted() {
    // const allRoles = await getAllRoles();
    // this.allRoles = allRoles;
    // let length = allRoles.length;
    // while (length--) {
    //   this.selectRolesList.push([]);
    // }
  },

  methods: {
    uploadFile(param) {
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
      if (!this.fileLegancy) {
        Notification.error({
          title: "拒绝",
          message: "请填写上传策略",
          duration: 1000,
        });
        return;
      }
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("rules", this.fileLegancy);
      // const res = await uploadFile(formData);

      // if (res) {
      Message({
        message: "上传成功",
        duration: 1000,
        type: "success",
      });
      // }
    },
  },
};
</script>