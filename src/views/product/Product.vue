<template>
  <div class="p-d-flex p-jc-center p-ai-center p-p-3">
    <div class="p-card" style="max-width: 800px">
      <h3 class="p-card-title">상품등록</h3>
      <div class="p-card-body">
        <form @submit.prevent="addProduct">
          <!-- 상품명 -->
          <div class="p-mb-3">
            <label for="productName" class="p-d-block">상품명</label>
            <InputText
              v-model="product.productName"
              id="productName"
              placeholder="상품명을 입력하세요"
              style="width: 100%"
            />
          </div>

          <!-- 상품가격 -->
          <div class="p-mb-3">
            <label for="price" class="p-d-block">상품가격</label>
            <InputNumber
              v-model="product.price"
              id="price"
              mode="currency"
              currency="KRW"
              placeholder="₩0"
              style="width: 100%"
            />
          </div>

          <div class="p-divider"></div>

          <!-- 분류 선택 -->
          <h3>분류 선택</h3>
          <div class="category-buttons">
            <button
              v-for="category in categories"
              :key="category.categoryId"
              :class="{ active: product.categoryId === category.categoryId }"
              @click="selectCategory(category.categoryId)"
            >
              {{ category.categoryName }}
            </button>
          </div>

          <!-- 대표 이미지 -->
          <FileUpload
            name="productImage"
            url="your-upload-url"
            accept="image/*"
            chooseLabel="대표 이미지"
            class="p-mt-3"
          />
          <!-- 상세 이미지 -->
          <FileUpload
            name="detailImage"
            url="your-upload-url"
            accept="image/*"
            chooseLabel="상세 이미지"
            class="p-mt-3"
          />

          <div class="p-divider"></div>

          <!-- 상품 옵션 -->
          <h3>상품 옵션</h3>
          <div class="p-d-flex p-mb-3">
            <InputText
              v-model="newOption.optionName"
              placeholder="옵션 이름"
              class="p-mr-2"
              style="flex: 1"
            />
            <InputNumber
              v-model="newOption.optionAddPrice"
              mode="currency"
              currency="KRW"
              placeholder="₩0"
              class="p-mr-2"
              style="flex: 1"
            />
            <Button
              icon="pi pi-plus"
              @click="addOption"
              class="p-button-rounded p-button-success"
            />
          </div>

          <div
            v-for="(option, index) in productOptions"
            :key="option.optionId"
            class="product-options"
          >
            <InputNumber
              v-model="option.ea"
              placeholder="수량"
              style="width: 50px"
              class="p-mr-2"
            />
            <span
              >{{ option.optionName }} (+ ₩{{ option.optionAddPrice }})</span
            >
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger"
              @click="removeOption(option.optionId)"
            />
          </div>

          <div class="p-d-flex p-jc-between">
            <Button type="submit" label="상품등록" icon="pi pi-check" />
            <Button
              label="취소"
              icon="pi pi-times"
              @click="clear"
              class="p-button-secondary"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { shop } from "@/utils/paths/api.js";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import RadioButton from "primevue/radiobutton";
import FileUpload from "primevue/fileupload";
import ProgressSpinner from "primevue/progressspinner";
import Toast from "primevue/toast";

const loading = ref(true);
const selection = ref(null);
const isExist = ref(true);
const categories = ref([]);
const toast = ref(null);
const snackbar = ref(false);
const text = ref("");

const getCategoryUrl = ref(shop.url.selectCategory);

const product = reactive({
  productName: "",
  categoryId: null,
  productImage: null,
  price: 0,
});
const newOption = reactive({
  optionName: "",
  optionAddPrice: 0,
});
const productOptions = ref([
  {
    optionId: 0,
    ea: 99,
    optionName: "기본 옵션",
    optionAddPrice: 0,
    disabled: true,
  },
]);
const errors = reactive({
  productName: "",
  price: "",
});

const messages = {
  addOptionMessage: "옵션이 추가되었습니다.",
  addProductMessage: "상품 등록이 완료되었습니다.",
};

// 상품명과 가격에 대한 간단한 검증
// const validateProduct = () => {
//   let isValid = true
//   if (!product.productName) {
//     errors.productName = '상품명을 입력해주세요.'
//     isValid = false
//   } else {
//     errors.productName = ''
//   }
//
//   if (!product.price || product.price <= 0) {
//     errors.price = '상품가격을 입력해주세요.'
//     isValid = false
//   } else {
//     errors.price = ''
//   }
//
//   return isValid
// }

onMounted(() => {
  // 분류 선택 값 불러오기
  getCategory();
});

const getCategory = async () => {
  const res = await axios.get(getCategoryUrl.value);
  categories.value = res.data;
};

const setId = (categoryId) => {
  product.categoryId = categoryId;
};

const addOption = () => {
  productOptions.value.push({
    optionId:
      productOptions.value[productOptions.value.length - 1].optionId + 1,
    ea: 99,
    optionName: newOption.optionName,
    optionAddPrice: newOption.optionAddPrice,
    disabled: false,
  });
  newOption.optionName = "";
  newOption.optionAddPrice = 0;
  // text.value = messages.addOptionMessage;
  // snackbar.value = true;
  showToast(messages.addOptionMessage);
};

const removeOption = (index) => {};
const isExistProduct = (productName) => {};
const addProduct = () => {};
const clear = () => {};
const showToast = (message) => {
  toast.value.add({
    severity: "success",
    summary: "알림",
    detail: message,
    life: 3000,
  });
};
</script>

<style>
/* 전체 카드 스타일 */
.p-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.p-card-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
  border-bottom: 2px solid #f9c200;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

/* 카테고리 선택 버튼 */
.category-buttons button {
  border-radius: 20px;
  margin-right: 5px;
  padding: 8px 12px;
  background-color: #f3f3f3;
  border: 1px solid #ddd;
  color: #666;
}

.category-buttons button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

/* 옵션 추가 영역 */
.product-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border: 1px solid #ddd;
  background: #f9f9f9;
  border-radius: 5px;
  margin-bottom: 8px;
}

.product-options span {
  flex-grow: 1;
  text-align: left;
  margin-left: 10px;
}

/* 버튼 스타일 */
.p-button {
  min-width: 80px;
}

.p-button-success {
  background-color: #28a745 !important;
}

.p-button-danger {
  background-color: #dc3545 !important;
}
</style>
