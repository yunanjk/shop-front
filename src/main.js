import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Divider from "primevue/divider";
import router from "@/router/index.js";

// 스타일 파일 임포트
// import "./assets/main.css";
// import "primevue/resources/themes/lara-light-blue/theme.css"; // 테마 CSS
// import "primevue/resources/primevue.min.css"; // PrimeVue 기본 스타일
// import "primeicons/primeicons.css"; // PrimeIcons 아이콘

const app = createApp(App);

app.use(PrimeVue); // PrimeVue 전역 설정 추가
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Divider", Divider);

app.mount("#app");
