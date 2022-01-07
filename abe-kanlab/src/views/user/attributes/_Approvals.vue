<template>
  <Card title="属性审批">
    <div>
      <div v-if="attributes.length"></div>
      <el-empty v-else></el-empty>
    </div>
  </Card>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";

export default {
  name: "Approvals",
  components: {
    Card,
  },
  data() {
    return {
      attributes: [],
    };
  },

  methods: {},
};
</script>