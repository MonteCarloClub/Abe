<template>
  <Card title="我的属性">
    <template v-slot:op>
      <el-input size="medium" placeholder="请输入要声明的属性" v-model="newAttr">
        <el-button slot="append" @click="generateAttr">声明新属性</el-button>
      </el-input>
    </template>
    <div v-if="appliedAttrMap">
      <el-table :data="getAttributes(appliedAttrMap)" style="width: 100%">
        <el-table-column prop="name" label="属性名" width="180"> </el-table-column>
        <el-table-column prop="value" label="属性值"> </el-table-column>
      </el-table>
    </div>
    <el-empty v-else :image-size="100" description="还没有属性"></el-empty>
  </Card>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import { getters } from "@/store/store";
import { attrApi } from "@/api/attributes";

export default {
  name: "Mine",
  components: {
    Card,
  },

  computed: {
    ...getters.mapUser(["appliedAttrMap"]),
  },

  data() {
    return {
      newAttr: "",
    };
  },

  methods: {
    getAttributes(attrMap) {
      let attributes = [];
      for (let key of Object.keys(attrMap)) {
        attributes.push({
          name: key,
          value: attrMap[key],
        });
      }
      return attributes;
    },
    generateAttr() {
      const { name, password } = getters.properties(["name", "password"]);
      const attr = this.newAttr;
      attrApi.generate({ name, password, attr }).then((_) => {
        console.log(_);
      });
    },
  },
};
</script>
