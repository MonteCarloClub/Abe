<template>
  <div class="main-content">
    <div class="grid-rows main-col">
      <Files />
    </div>
    <div class="grid-rows">
      <Attributes />
      <Keys />
    </div>
  </div>
</template>

<script>
import Keys from "./_Keys.vue";
import Files from "./_Files.vue";
import Attributes from "./_Attributes.vue";

export default {
  name: "User",
  components: {
    Attributes,
    Files,
    Keys,
  },
};
</script>

<style scoped>
.grid-rows {
  display: grid;
  grid-template-columns: auto;
  grid-gap: var(--row-distance, 10px);
}

.main-col {
  width: 70%;
  float: left;
  margin-right: var(--row-distance, 10px);
}
</style>