<template>
  <div>
    <Card title="属性申请">
      <template v-slot:op>
        <el-button size="small" slot="append" @click="dialogFormVisible = true">
          申请属性
        </el-button>
      </template>
      <div v-if="attributes.length">
        <el-table :data="attributes" stripe style="width: 100%">
          <el-table-column prop="name" label="属性名" width="140"> </el-table-column>
          <el-table-column prop="address" label="属性值"> </el-table-column>
          <el-table-column prop="date" label="申请时间" width="180"> </el-table-column>
          <el-table-column prop="approvaller" label="审批者" width="180"> </el-table-column>
          <el-table-column prop="status" label="状态" width="100">
            <template slot-scope="scope">
              <el-tag :type="statusTypes[scope.row.status]">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-empty v-else :image-size="100" description="没有正在申请的属性"></el-empty>
    </Card>
    <el-dialog title="申请属性" :visible.sync="dialogFormVisible">
      <el-form ref="applyForm" :rules="applyRules" :model="form" label-width="80px">
        <el-form-item prop="attr" label="属性名">
          <el-input v-model="form.attr"></el-input>
        </el-form-item>
        <el-form-item label="所属用户">
          <el-input v-model="form.to"></el-input>
        </el-form-item>
        <el-form-item label="所属组织">
          <el-input v-model="form.org"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="applyForAttr">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import { attrApi } from "@/api/attributes";
import { getters } from "@/store/store";

export default {
  name: "Applications",
  components: {
    Card,
  },
  data() {
    return {
      attributes: [
        {
          date: "2016-05-02",
          name: "属性",
          address: "上海市普陀区金沙江路 1518 弄",
          approvaller: "小明",
          status: "已通过",
        },
        {
          date: "2016-05-04",
          name: "属性",
          address: "上海市普陀区金沙江路 1517 弄",
          approvaller: "小明",
          status: "被拒绝",
        },
        {
          date: "2016-05-04",
          name: "属性",
          address: "上海市普陀区金沙江路 1517 弄",
          approvaller: "小明",
          status: "未处理",
        },
      ],
      statusTypes: {
        已通过: "success",
        被拒绝: "danger",
        未处理: "info",
      },
      dialogFormVisible: false,
      form: {
        attr: "",
        to: "",
        org: "",
        remark: "",
      },
      applyRules: {
        attr: [{ required: true, trigger: "blur", message: "属性名不能为空" }],
      },
    };
  },

  mounted() {},

  methods: {
    applyForAttr() {
      const { name } = getters.properties(["name"]);
      if (!name) return;

      this.$refs.applyForm.validate((valid) => {
        if (!valid) return;
        
        attrApi
          .apply({
            ...this.form,
            name,
          })
          .then((_) => {
            this.dialogFormVisible = false;
            console.log(_);
          });
      });
    },
  },
};
</script>

<style scoped>
</style>