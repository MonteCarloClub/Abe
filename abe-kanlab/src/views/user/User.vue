<template>
  <div class="main-content">
    <div class="">
      <transition-group
        class="grid-rows main-col"
        tag="div"
        v-on:before-enter="beforeEnter"
        v-on:enter="animEnter"
        appear
      >
        <Info key="-1" data-index="-1"/>
        <Files key="0" data-index="0" />
      </transition-group>
    </div>
    <transition-group
      class="grid-rows"
      tag="div"
      v-on:before-enter="beforeEnter"
      v-on:enter="animEnter"
      appear
    >
      <Attributes key="1" data-index="1" />
      <Keys key="2" data-index="2" />
    </transition-group>
  </div>
</template>

<script>
import Keys from "./_Keys.vue";
import Info from "./_Info.vue";
import Files from "./_Files.vue";
import Attributes from "./_Attributes.vue";

export default {
  name: "User",
  components: {
    Attributes,
    Files,
    Keys,
    Info,
  },
  data() {
    return {};
  },
  methods: {
    beforeEnter: function (el) {
      if (el.dataset.index > -1) {
        el.style.opacity = 0;
        el.style.transform = "translateY(30px)";
      }
    },
    animEnter: function (el, done) {
      var delay = el.dataset.index * 250;
      setTimeout(function () {
        el.style = ""; // 清空初始的偏移样式
        done();
      }, delay);
    },
  },
};
</script>

<style scoped>
.grid-rows {
  display: grid;
  grid-template-columns: auto;
  grid-gap: var(--row-distance, 10px);
}

.grid-rows > div {
  transition: all 0.5s;
}

.main-col {
  width: 70%;
  float: left;
  margin-right: var(--row-distance, 10px);
}
</style>