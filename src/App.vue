<template>
  <div class="app-container">
    <Header />
    <div class="content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%; /* 전체 화면 높이를 100%로 설정 */
  display: flex;
  flex-direction: column;
}

/* app-container는 전체 화면을 차지하며, Header, Footer, Content 영역을 포함 */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* 콘텐츠 영역은 가변적으로 늘어나며, 스크롤이 필요한 경우 스크롤이 발생 */
.content {
  flex: 1;
  overflow-y: auto; /* 내용이 많을 경우 세로 스크롤 */
}
</style>
