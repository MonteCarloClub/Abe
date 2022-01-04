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
  beforeCreate: function () {
    console.log("Attributes", "BeforeCreate");
  },
  created: function () {
    console.log("Attributes", "Created");
  },
  beforeMount: function () {
    console.log("Attributes", "BeforeMount");
  },
  mounted: function () {
    console.log("Attributes", "Mounted");
  },
  activated: function () {
    console.log("Attributes", "Activated");
  },
  deactivated: function () {
    console.log("Attributes", "Deactivated");
  },
  beforeUpdate: function () {
    console.log("Attributes", "BeforeUpdate");
  },
  updated: function () {
    console.log("Attributes", "Updated");
  },
  methods: {},
};
</script>