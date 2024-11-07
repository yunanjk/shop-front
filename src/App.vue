<template>
  <div id="app">
    <div class="app-bar">
      <Button icon="pi pi-bars" class="mr-2" @click="toggleDrawer" />
      <Button label="Acorn 전자상가" class="title ml-3 mr-5" text />
      <InputText
        v-model="searchKeyword"
        placeholder="상품 검색"
        @keyup.enter="getProduct"
        class="search-input"
      />
      <div class="spacer"></div>
      <Button label="마이페이지" text />
      <Button label="장바구니" text />
      <Button label="로그인" text to="/login" />
      <Button icon="pi pi-cog" text to="/admin" />
    </div>

    <!--    <div v-if="drawer" class="drawer-content">-->
    <!--      <template v-for="(item, i) in items" :key="i">-->
    <!--        <Divider v-if="item.divider" class="my-4" />-->
    <!--        <div v-else-if="item.heading" class="heading">{{ item.heading }}</div>-->
    <!--        <Button-->
    <!--          v-else-->
    <!--          icon="pi"-->
    <!--          :label="item.text"-->
    <!--          class="menu-item"-->
    <!--          :icon="'pi pi-' + item.icon"-->
    <!--          :to="item.link"-->
    <!--          text-->
    <!--        />-->
    <!--      </template>-->
    <!--    </div>-->

    <router-view />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { InputText, Button, Divider } from "primevue";

const searchKeyword = ref("");
const drawer = ref(false);
const router = useRouter();

const items = [
  { heading: "상품 관리" },
  { icon: "list", text: "상품목록", link: "/productInfo" },
  { icon: "add", text: "상품등록", link: "/product" },
  { divider: true },
  { heading: "판매" },
  { icon: "money", text: "결제 정보 확인", link: "/purchases" },
  { icon: "ban", text: "환불 정보 확인", link: "/refunds" },
  { divider: true },
  { heading: "정산" },
  { icon: "chart-line", text: "기간별 정산", link: "/financials" },
  { divider: true },
  { heading: "사이트 관리" },
  { icon: "question-circle", text: "문의 내용 확인", link: "/contacts" },
  { icon: "tools", text: "상품 메뉴 관리", link: "/layout" },
];

function toggleDrawer() {
  drawer.value = !drawer.value;
}

function getProduct() {
  axios
    .get(`/product/by_name?productName=${searchKeyword.value}`)
    .then((response) => {
      router.push("/");
      router.push({ name: "ProductInfo", params: { data: response.data } });
    });
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");

.application {
  font-family: "Roboto", "Nanum Gothic", sans-serif;
}

.app-bar {
  display: flex;
  align-items: center;
  background-color: var(--primary-color);
  padding: 1rem;
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
}

.search-input {
  flex: 1;
  margin: 0 1rem;
}

.spacer {
  flex-grow: 1;
}

.drawer-content {
  padding: 1rem;
}

.heading {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.menu-item {
  width: 100%;
  justify-content: flex-start;
}
</style>
