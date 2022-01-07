<template>
  <section class="grid-cols-2">
    <div class="animated-background">
      <div class="left-intro">
        <h1>数据共享交换</h1>
      </div>
    </div>
    <div class="img-box">
      <img :src="imgHome('section_1.jpg')" alt="信息安全" />
    </div>
  </section>
</template>

<script>
import { DynamicImage } from "@/mixins/DynamicImage";

export default {
  name: "Banner",
  mixins: [DynamicImage("home/")],
  methods: {},
};
</script>

<style scoped>

.grid-cols-2 {
  display: grid;
  grid-template-columns: 50% 50%;
}

.left-intro {
  margin: 30% 0 0 30%;
  font-size: 40px;
}

.img-box {
  overflow: hidden;
  position: relative;
}

.img-box img {
  height: 100%;
}

.img-box:after {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: block;
  background: linear-gradient(220deg, #5c5c5c30, transparent, transparent);
  content: "";
}

/* Animations */
@keyframes bg-scrolling-reverse {
  100% {
    background-position: 0 50px;
  }
}

/* Main styles */
.animated-background {
  /* img size is 50x50 */
  /* Background data (Original source: https://subtlepatterns.com/grid-me/) */
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABnSURBVHja7M5RDYAwDEXRDgmvEocnlrQS2SwUFST9uEfBGWs9c97nbGtDcquqiKhOImLs/UpuzVzWEi1atGjRokWLFi1atGjRokWLFi1atGjRokWLFi1af7Ukz8xWp8z8AAAA//8DAJ4LoEAAlL1nAAAAAElFTkSuQmCC")
    repeat 0 0;
  animation: bg-scrolling-reverse 0.92s infinite; /* IE 10+ */
  animation-timing-function: linear;
}

</style>