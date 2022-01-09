<template>
  <section class="header">
    <el-carousel height="450px" :interval="2000" arrow="always">
      <el-carousel-item>
        <div class="background-image">
          <img src="@/assets/images/home/banner-1.jpg" alt="信息安全" />
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="background-image">
          <img src="@/assets/images/home/banner-2.png" alt="信息安全" />
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="background-image">
          <img src="@/assets/images/home/banner-3.jpg" alt="信息安全" />
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="intro">
      <div>
        <h1>数据共享交换</h1>
      </div>
      <div class="options">
        <router-link to="/signup">
          <el-button type="primary">去注册</el-button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: "Banner",
  methods: {},
};
</script>

<style scoped>
.header {
  position: relative;
}

.titles {
  margin: 32px 0;
  font-size: 20px;
  display: grid;
  grid-template-columns: auto auto auto;
}

.intro {
  z-index: 10;
  margin: 0 auto;
  position: absolute;
  left: var(--body-margin, 32px);
  top: var(--header-height, 16px);
}

.intro h1 {
  font-weight: 300;
  font-size: 3.625rem;
}

.options {
  padding-top: 50px;
}

.background-image {
  width: 100%;
  height: 450px;
  overflow: hidden;
}

.background-image img {
  width: 100%;
  height: 100%;
}

.background-image:after {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: block;
  background: linear-gradient(220deg, #5a5a5a40, transparent, transparent);
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