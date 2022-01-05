<template>
  <div class="footer">
    <div class="logo-box"><Logo /></div>
    <div class="introduction">
      <div>应用介绍文字</div>
      <div>备案号</div>
    </div>
    <div class="links">友情链接</div>
    <div class="contacts">联系方式</div>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue";

export default {
  name: "Footer",
  components: { Logo },
};
</script>

<style scoped>
.footer {
  padding: 36px var(--body-margin, 32px);
  font-size: 12px;
  color: gray;
  background-color: hsl(210, 8%, 15%);
  display: grid;
  gap: 24px;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
  grid-template-areas:
    "t t"
    "l r"
    "l b";
}

.logo-box {
  height: 60px;
  grid-area: t;
}

.logo-box > div {
  margin: auto;
  width: fit-content;
}

.introduction {
  justify-self: end;
  text-align: right;
  grid-area: l;
}

.links {
  grid-area: r;
}

.contacts {
  grid-area: b;
}
</style>