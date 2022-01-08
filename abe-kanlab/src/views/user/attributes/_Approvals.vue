<template>
  <div>
    <Card title="属性审批">
      <div v-if="attributes.length">
        <el-table :data="attributes" stripe style="width: 100%">
          <el-table-column prop="attr" label="属性名" width="120"> </el-table-column>
          <el-table-column prop="user" label="申请人" width="180"> </el-table-column>
          <el-table-column prop="remark" label="申请备注"> </el-table-column>
          <el-table-column prop="date" label="申请日期" width="120"> </el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="agree(scope.row, true)">
                同意
              </el-button>
              <el-button size="mini" type="danger" @click="agree(scope.row, false)">
                拒绝
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-empty v-else :image-size="100" description="暂无待审批的属性"></el-empty>
    </Card>
    <el-dialog title="属性审批" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="80px">
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="approval">确 定</el-button>
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
  name: "Approvals",
  components: {
    Card,
  },
  data() {
    return {
      attributes: [
        {
          date: "2016-05-02",
          attr: "属性",
          remark: "上海市普陀区金沙江路 1518 弄",
          user: "小明",
        },
        {
          date: "2016-05-04",
          attr: "属性",
          remark: "上海市普陀区金沙江路 1517 弄",
          user: "小明",
        },
      ],
      form: {
        remark: "",
      },
      params: {},
      dialogFormVisible: false,
    };
  },

  methods: {
    agree(application, agree) {
      const to = getters.userName();
      const { attr, user } = application;
      this.params = { to, agree, attr, user };
      this.dialogFormVisible = true;
    },
    approval() {
      attrApi.approval({ ...this.params, ...this.form }).then((_) => {
        console.log(_);
        this.dialogFormVisible = false;
      });
    },
  },
};
</script>