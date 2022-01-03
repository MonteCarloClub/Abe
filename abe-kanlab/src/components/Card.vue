<template>
  <div class="card">
    <div class="card-head" v-if="title">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>

.card {
  padding: var(--content-padding, 16px);
  background: #fff;
  border: 1px solid #e3e4e6;
  border-radius: 4px;
}

.card:hover {
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.13);
  transition: box-shadow 0.3s;
}

.card-head {
  font-weight: 500;
  line-height: 54px;
  margin-top: -16px;
}
</style>