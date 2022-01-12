<template>
  <Card title="组织信息">
    <el-descriptions v-if="info" :column="3">
      <el-descriptions-item label="组织名称">{{ info.orgId }}</el-descriptions-item>
      <el-descriptions-item label="成员总数">{{ info.n }}</el-descriptions-item>
      <el-descriptions-item label="阈值">{{ info.t }}</el-descriptions-item>
      <el-descriptions-item label="创建时间">
        {{ formatTime(info.createTime) }}
      </el-descriptions-item>
      <el-descriptions-item label="创建人">{{ info.fromUserName }}</el-descriptions-item>
      <el-descriptions-item label="状态">{{ info.status }}</el-descriptions-item>
      <el-descriptions-item v-if="info.opk" label="组织公钥">{{ info.opk }}</el-descriptions-item>
    </el-descriptions>
  </Card>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";

export default {
  name: "Mine",
  components: {
    Card,
  },
  props: {
    info: {
      orgId: "",
      t: "",
      n: "",
      createTime: "",
      fromUserName: "",
      status: "",
    },
  },

  data() {
    return {};
  },
  methods: {
    formatTime(unix_timestamp) {
      let a = "-";
      try {
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        a = new Date(unix_timestamp * 1000);
      } catch (error) {
        console.log(error);
      }
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
      return time;
    },
  },
};
</script>