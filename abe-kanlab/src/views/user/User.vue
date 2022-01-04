<template>
  <div class="main-content">
    <div class="grid-rows main-col">
      <Files />
    </div>
    <transition-group class="grid-rows" tag="div" name="list" v-on:enter="animEnter" appear>
      <!-- <Attributes key="1" data-index="1" />
      <Keys key="2" data-index="2" /> -->
      <component
        v-bind:css="false"
        v-for="(comp, index) in componentList"
        v-bind:is="comp"
        v-bind:key="comp"
        v-bind:data-index="index"
      ></component>
    </transition-group>
  </div>
</template>

<script>
import Keys from "./_Keys.vue";
import Files from "./_Files.vue";
import Attributes from "./_Attributes.vue";
import Velocity from "velocity-animate";

export default {
  name: "User",
  components: {
    Attributes,
    Files,
    Keys,
  },
  data() {
    return {
      componentList: ["Attributes", "Keys"],
    };
  },
  methods: {
    animEnter: function (el, done) {
      var delay = el.dataset.index * 250;
      setTimeout(function () {
        Velocity(el, { opacity: 1 }, { complete: done });
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

.main-col {
  width: 70%;
  float: left;
  margin-right: var(--row-distance, 10px);
}

.list-enter-active {
  transition: all 0.5s;
}

.list-enter {
  opacity: 0;
  transform: translateY(30px);
}
</style>