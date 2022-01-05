<template>
  <div class="home">
    <!-- 用来装逼的小节 -->
    <section class="grid-cols-2">
      <div>
        <div class="left-intro">
          <h1>数据共享交换</h1>
        </div>
      </div>
      <div class="img-box">
        <img :src="imgHome('section_1.jpg')" alt="信息安全" />
      </div>
    </section>

    <!-- 小节内容 -->
    <!--     
    <section>
      <div class="section-title">身份管理</div>
    </section> 
    -->

    <!-- 小节内容 -->
    <section class="section">
      <div class="section-title">属性管理</div>
      <div class="flex-cols">
        <div v-for="(attr, index) in attrs" :key="index" class="flex-entry">
          <div class="entry-title">{{ attr.title }}</div>
          <div class="entry-desc">{{ attr.desc }}</div>
        </div>
      </div>
    </section>

    <!-- 小节内容 -->
    <section class="section">
      <div class="section-title">组织管理</div>
      <div class="grid-cols-3">
        <div v-for="(attr, index) in organizations" :key="index" class="grid-entry">
          <img :src="imgHome(attr.icon)" :alt="attr.title" />
          <div class="entry-title">{{ attr.title }}</div>
          <div class="entry-desc">{{ attr.desc }}</div>
        </div>
      </div>
    </section>

    <!-- 小节内容 -->
    <section class="section">
      <div class="section-title">文件管理</div>
      <div class="grid-cols-6_4">
        <div class="image-box">
          <img :src="imgHome('files.jpg')" alt="文件" />
        </div>
        <div style="background-color: black"></div>
        <div class="list-rows">
          <div v-for="(file, index) in files" :key="index" class="list-entry">
            <img :src="imgHome(file.icon)" :alt="file.title" />
            <div class="entry-title">{{ file.title }}</div>
            <div class="entry-desc">{{ file.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/Footer.vue";
import { throttle } from "@/utils/helpers";

export default {
  name: "Home",
  components: { Footer },
  data() {
    return {
      attrs: [
        { title: "声明", desc: "声明用户属性" },
        { title: "申请", desc: "用户申请属性" },
        { title: "查询", desc: "查询属性" },
        { title: "审批", desc: "审批属性申请" },
        { title: "同步", desc: "同步用户属性" },
      ],
      organizations: [
        { title: "创建", icon: "create.svg", desc: "申请成立新组织" },
        { title: "加入", icon: "join.svg", desc: "同意加入新组织" },
        { title: "属性", icon: "attrs.svg", desc: "提交part-pk（生成组织 / 组织属性）" },
        { title: "查询", icon: "search.svg", desc: "查询新增组织 / 组织属性申请" },
        { title: "声明", icon: "declare.svg", desc: "声明组织新属性" },
        { title: "审批", icon: "approval.svg", desc: "审批组织新属性" },
      ],
      files: [
        { title: "加密", icon: "encryption.svg", desc: "加密共享文件" },
        { title: "解密", icon: "decrypt.svg", desc: "解密共享文件" },
        { title: "查询", icon: "query.svg", desc: "查询共享文件" },
      ],
    };
  },
  methods: {
    imgHome(name) {
      // https://stackoverflow.com/questions/40491506/vue-js-dynamic-images-not-working/47480286
      // expression inside v-bind is executed in runtime, webpack aliases work in compile time.
      // https://github.com/vuejs/vue-loader/issues/896
      return require("../assets/images/home/" + name);
    },
    handleScroll: throttle(function () {
      const c = this.$route.meta.headerClass;
      if (window.scrollY > 60) {
        document.querySelector(".el-header").classList.remove(c);
      } else {
        document.querySelector(".el-header").classList.add(c);
      }
    }, 500),
  },
  created() {
    // 创建该组件时，监听滚动函数
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    // 切换到其它页面时，移除滚动监听
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.home {
  margin-top: calc(0px - var(--header-height, 60px));
}

.grid-cols-2 {
  display: grid;
  grid-template-columns: 50% 50%;
}

.grid-cols-3 {
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
}

.grid-cols-6_4 {
  display: grid;
  grid-template-columns: 45% 3px auto;
  gap: 5%;
}

.flex-cols {
  display: flex;
}

.list-rows {
  max-width: 240px;
}

.left-intro {
  margin: 30% 0 0 30%;
  font-size: 40px;
}

.img-box {
  overflow: hidden;
  position: relative;
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

section:nth-child(even) {
  background: var(--body-background, #f1f1f2);
}

section:nth-child(odd) {
  background: white;
}

.section {
  padding: 36px var(--body-margin, 32px);
}

.section-title {
  text-align: center;
  font-size: 1.8em;
  padding: 0.5em 0 1em 0;
}

.flex-entry {
  flex: 1;
  padding: 16px;
  margin: 0 16px;
  border-radius: 4px;
  box-sizing: border-box;
  border: 2px solid #fff;
  background-image: linear-gradient(0deg, #fff, #f3f5f8);
  box-shadow: 8px 8px 20px 0 rgb(55 99 170 / 10%), -8px -8px 20px 0 #fff;
}

.grid-entry {
  padding: 32px 0;
  margin: 0 16px;
  text-align: center;
}

.list-entry {
  display: grid;
  margin: 16px 0;
  grid-template-columns: 80px auto;
  grid-template-areas:
    "l t"
    "l b";
}

.list-entry > div {
  margin: 0 !important;
  align-self: center;
}

.list-entry > img {
  grid-area: l;
  width: 70px;
  height: 70px;
  /* https://stackoverflow.com/questions/14387690/how-can-i-show-only-corner-borders */
  background: linear-gradient(to right, black 2px, transparent 2px) 0 0,
    linear-gradient(to right, black 2px, transparent 2px) 0 100%,
    linear-gradient(to left, black 2px, transparent 2px) 100% 0,
    linear-gradient(to left, black 2px, transparent 2px) 100% 100%,
    linear-gradient(to bottom, black 2px, transparent 2px) 0 0,
    linear-gradient(to bottom, black 2px, transparent 2px) 100% 0,
    linear-gradient(to top, black 2px, transparent 2px) 0 100%,
    linear-gradient(to top, black 2px, transparent 2px) 100% 100%;

  background-repeat: no-repeat;
  background-size: 20px 20px;
}

.list-entry > .entry-title {
  grid-area: t;
}

.list-entry > .entry-desc {
  grid-area: b;
}

.entry-title {
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 500;
  color: #000;
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.entry-desc {
  font-size: 14px;
  color: #98a3b7;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.image-box {
  height: 300px;
  justify-self: end;
}

.image-box img {
  max-width: 100%;
  max-height: 100%;
}
</style>