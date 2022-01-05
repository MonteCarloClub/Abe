<template>
  <Card title="我的属性">
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
  name: "Attributes",
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