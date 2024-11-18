<template>
  <div class="p-d-flex p-jc-center p-ai-center p-p-3">
    <div class="p-card p-m-3" style="width: 800px">
      <h3 class="p-card-title">상품등록</h3>
      <div class="p-card-body">
        <form @submit.prevent="addProduct">
          <!-- 상품명 -->
          <div class="p-mb-3">
            <label for="productName" class="p-d-block">상품명</label>
            <InputText
              v-model="product.productName"
              id="productName"
              :class="{ 'p-invalid': errors.productName }"
              placeholder="상품명을 입력하세요"
            />
            <small v-if="errors.productName" class="p-error">{{
              errors.productName
            }}</small>
          </div>

          <!-- 상품가격 -->
          <div class="p-mb-3">
            <label for="price" class="p-d-block">상품가격</label>
            <InputNumber
              v-model="product.price"
              id="price"
              mode="currency"
              currency="KRW"
              :class="{ 'p-invalid': errors.price }"
              placeholder="0"
            />
            <small v-if="errors.price" class="p-error">{{
              errors.price
            }}</small>
          </div>

          <div class="p-divider p-mt-3"></div>

          <h3>분류 선택</h3>
          <div v-if="loading" class="p-d-flex p-jc-center p-ai-center">
            <ProgressSpinner />
          </div>

          <!-- RadioButton for category selection -->
          <div v-else>
            <div v-for="category in categories" :key="category.categoryId">
              <RadioButton
                :inputId="category.categoryId"
                :value="category.categoryId"
                v-model="product.categoryId"
                :label="category.categoryName"
                class="p-mb-2"
              />
            </div>
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

          <div class="p-divider p-mt-3"></div>

          <h3>상품 옵션</h3>
          <div class="p-d-flex p-jc-between p-mb-3">
            <InputText
              v-model="newOption.optionName"
              label="옵션 이름"
              class="p-mr-2"
            />
            <InputNumber
              v-model="newOption.optionAddPrice"
              label="옵션 추가가격"
              mode="currency"
              currency="KRW"
              class="p-mr-2"
            />
            <Button
              icon="pi pi-plus"
              @click="addOption"
              class="p-button-rounded p-button-success"
            />
          </div>

          <div v-for="(option, index) in productOptions" :key="option.optionId">
            <div class="p-d-flex p-ai-center p-jc-between p-mb-2">
              <InputNumber v-model="option.ea" label="수량" class="p-mr-2" />
              <span
                >{{ option.optionName }} (+ ₩{{ option.optionAddPrice }})</span
              >
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-danger"
                @click="removeOption(option.optionId)"
              />
            </div>
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

  <!-- Toast 컴포넌트 추가 -->
  <Toast ref="toast" />
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
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

<style scoped>
.p-card {
  width: 800px;
}
</style>
