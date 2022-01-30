<template>
  <div class="content">
    <div class="wer">
      <div class="wer-left">
        <el-input placeholder="用户名称" v-model="searchInput" />
      </div>
      <div>
        <el-button @click="searchCert"> 查询证书 </el-button>
        <el-button type="info" @click="applyFormVisible = true"> 证书申请 </el-button>
        <el-button type="primary" @click="applyAttrFormVisible = true"> 属性申请 </el-button>
      </div>
    </div>

    <el-table :data="certificates" :empty-text="emptyText">
      <el-table-column show-overflow-tooltip label="用户名称" prop="ABSUID" />
      <el-table-column show-overflow-tooltip label="证书序号" prop="serialNumber" />
      <el-table-column label="操作" align="right">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="verify(scope)" plain> 验证证书 </el-button>
          <el-button size="mini" type="info" @click="detailInfo(scope.row)"> 详细信息 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="详细信息" :visible.sync="detailVisible">
      <ObjectForm :obj="detail"/>

      <div slot="footer">
        <el-button type="primary" @click="detailVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="证书申请" :visible.sync="applyFormVisible">
      <el-form
        ref="applyForm"
        :rules="applyRules"
        :model="applyCert"
        label-position="left"
        label-width="140px"
      >
        <el-form-item prop="uid" label="唯一标识参数">
          <el-input v-model="applyCert.uid"></el-input>
        </el-form-item>
        <el-form-item prop="attribute" label="属性集合">
          <el-input v-model="applyCert.attribute"></el-input>
        </el-form-item>
        <div v-if="applyRes">
          <ObjectForm :obj="applyRes"/>
        </div>
      </el-form>

      <div slot="footer">
        <el-button @click="applyFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="applyForCert">申 请</el-button>
      </div>
    </el-dialog>

    <el-dialog title="属性申请" :visible.sync="applyAttrFormVisible">
      <el-form
        label-position="left"
        label-width="140px"
      >
        <el-form-item prop="uid" label="属性名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="attribute" label="CA 公钥">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="attribute" label="要求字段">
          <el-input></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="applyAttrFormVisible = false">取 消</el-button>
        <el-button type="primary">申 请</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { certApi } from "@/api/certificates";
import ObjectForm from "@/components/ObjectForm.vue";

export default {
  name: "List",
  components: {
    ObjectForm
  },
  data() {
    return {
      certificates: [],
      emptyText: "暂无数据",
      detailVisible: false,
      detail: {},

      applyFormVisible: false,
      applyAttrFormVisible: false,
      applyCert: {},

      applyRules: {
        uid: [{ required: true, trigger: "blur", message: "唯一标识参数不能为空" }],
        attribute: [{ required: true, trigger: "blur", message: "属性集合不能为空" }],
      },

      searchInput: "",
      applyRes: false,
    };
  },

  mounted() {
    this.emptyText = "正在加载...";
    certApi
      .list()
      .then((res) => {
        this.certificates = res.map((item) => {
          item.certificate["absSignature"] = item.absSignature;
          return item.certificate;
        });
        this.emptyText = "暂无证书";
      })
      .catch(console.log);
  },

  methods: {
    detailInfo(cert) {
      this.detailVisible = true;
      this.detail = cert;
    },

    revoke(scope) {
      const no = scope.row.serialNumber;
      certApi
        .revoke({ no })
        .then((res) => {
          if (res === "OK.") {
            this.$message({
              message: "撤销成功",
              duration: 2 * 1000,
              type: "success",
            });
            this.certificates.splice(scope.$index, 1);
          } else {
            this.$message({
              message: res,
              type: "error",
            });
          }
        })
        .catch((e) => {
          this.$message({
            message: e.message,
            type: "error",
          });
        });
    },

    verify() {
        this.$alert('该证书验证通过，有效期至 2023-01-30', '提示', {
          confirmButtonText: '确定'
        });
    },

    applyForCert() {
      this.$refs.applyForm.validate((valid) => {
        if (!valid) return;
        const { uid, attribute } = this.applyCert;
        this.applyRes = false;

        certApi
          .apply(uid, attribute)
          .then((item) => {
            item.certificate["absSignature"] = item.absSignature;
            this.applyRes = item.certificate;
            this.$message({
              message: "申请成功",
              duration: 2 * 1000,
              type: "success",
            });
          })
          .catch((e) => {
            this.$message({
              message: e.message,
              type: "error",
            });
          });
      });
    },

    searchCert() {
      const a = this.searchInput;
      if (a) {
        certApi
          .certInfo(a)
          .then((item) => {
            item.certificate["absSignature"] = item.absSignature;
            this.certificates = [item.certificate];
          })
          .catch((e) => {
            this.$message({
              message: e.message,
              type: "error",
            });
          });
      }
    },
  },
};
</script>

<style scoped>
.content {
  padding: 16px;
  background-color: var(--bg-color-1, #d4d4d4);
}

.wer {
  display: flex;
  gap: 16px;
  padding: 8px 0;
}

.wer-left {
  flex: 1;
}
</style>