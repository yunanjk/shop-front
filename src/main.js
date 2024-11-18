import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";

// 스타일 파일 임포트
// import "primevue/resources/themes/saga-orange/theme.css";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const app = createApp(App);
app.use(PrimeVue); // PrimeVue 전역 설정 추가
app.mount("#app");
