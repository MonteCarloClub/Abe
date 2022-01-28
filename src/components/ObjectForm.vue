<template>
  <el-form label-position="left" label-width="140px">
    <el-form-item v-for="(o, i) in keyValues" :key="i" size="mini" :label="o.key">
      <span v-if="o.value.length < 100"> {{ o.value }} </span>
      <el-input v-else type="textarea" :rows="4" readonly v-model="o.value"> </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "ObjectForm",
  props: {
    obj: {
      default: () => {},
      type: Object,
    },
  },
  computed: {
    keyValues: function () {
      return Object.entries(this.obj).map((kv) => {
        return {
          key: kv[0],
          value: kv[1].toString(),
        };
      });
    },
  },
};
</script>

<style scoped>
</style>