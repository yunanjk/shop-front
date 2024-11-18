<template>
  <div class="layout-wrapper">
    <!-- App bar -->
    <header class="app-bar">
      <!--      <Button-->
      <!--        icon="pi pi-bars"-->
      <!--        class="p-button-text p-button-plain"-->
      <!--        @click="drawer = !drawer"-->
      <!--      />-->

      <router-link to="/" class="app-title"> 👻 open yy shop 👻 </router-link>

      <div class="search-container">
        <InputText
          v-model="searchKeyword"
          placeholder="상품 검색"
          class="p-inputtext-sm"
          @keyup.enter="getProduct"
        />
        <Button icon="pi pi-search" class="p-button-text" @click="getProduct" />
      </div>

      <div class="p-d-flex p-ai-center">
        <router-link to="/admin">
          <Button icon="pi pi-cog" class="p-button-text p-button-plain" />
        </router-link>
      </div>
    </header>

    <div class="main-layout">
      <!-- Side bar -->
      <aside class="sidebar" v-if="drawer">
        <template v-for="(item, index) in items" :key="index">
          <h3 v-if="item.heading">{{ item.heading }}</h3>
          <ul v-else-if="!item.divider" class="p-menu-list">
            <li>
              <router-link :to="item.link">{{ item.text }}</router-link>
            </li>
          </ul>
          <hr v-if="item.divider" />
        </template>
      </aside>

      <!-- Main content -->
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

const drawer = ref(true);
const searchKeyword = ref("");

const items = [
  { heading: "상품 관리" },
  { text: "상품 목록", link: "/productInfo" },
  { text: "상품 등록", link: "/product" },
  { divider: true },
  { heading: "판매" },
  { text: "결제 정보 확인", link: "/purchases" },
  { text: "환불 정보 확인", link: "/refunds" },
  { divider: true },
  { heading: "정산" },
  { text: "기간별 정산", link: "/financials" },
  { divider: true },
  { heading: "사이트 관리" },
  { text: "문의 내용 확인", link: "/contacts" },
  { text: "상품 메뉴 관리", link: "/layout" },
];

const getProduct = () => {
  console.log(`검색어: ${searchKeyword.value}`);
};
</script>

<style>
/* 전체 레이아웃 설정 */
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* AppBar 설정 (상단 고정) */
.app-bar {
  background-color: #ffc107;
  color: white;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 1000;
}

.app-title {
  font-weight: bold;
  margin-left: 1rem;
  text-decoration: none;
  color: white;
}

.search-container {
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin-left: 1rem;
}

/* 메인 레이아웃 (사이드바와 콘텐츠 영역 분리) */
.main-layout {
  display: flex;
  flex-grow: 1;
  margin-top: 60px; /* AppBar 높이만큼 여백 추가 */
}

/* 사이드바 설정 */
.sidebar {
  width: 250px;
  background-color: #f5f5f5;
  padding: 1rem;
  overflow-y: auto;
  height: calc(100vh - 60px); /* AppBar 높이 제외 */
  position: fixed;
  top: 60px; /* AppBar 바로 아래에 위치 */
  left: 0;
}

/* 콘텐츠 영역 설정 */
.content {
  flex-grow: 1;
  margin-left: 250px; /* 사이드바 너비만큼 여백 추가 */
  padding: 1rem;
  background-color: #f9f9f9;
  overflow-y: auto;
}

.p-menu-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.p-menu-list a,
.p-menu-list {
  text-decoration: none;
}

.p-menu-list li a {
  color: #3b82f6;
}
</style>
