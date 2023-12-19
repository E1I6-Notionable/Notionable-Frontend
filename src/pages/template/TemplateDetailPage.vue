<template>
  <div>
    <CustomHeader />
    <div class="template-page">
      <div class="template-detail">
        <div class="template-img" />
        <div class="template-detail-desc">
          <div class="template-nav">
            <div
              v-for="(category, i) in categoryList"
              :key="i"
              @click="clickCategory(category)"
              :class="{ 'click-category': category === currentCategory }"
            >
              {{ category }}
            </div>
          </div>
          <TemplateNotice v-if="currentCategory === '상품상세'" />
          <TemplateReview v-else-if="currentCategory === '구매후기'" />
        </div>
      </div>
      <div>
        <PaymentFloating />
      </div>
    </div>
    <CustomFooter />
  </div>
</template>

<script>
import CustomHeader from '../../components/CustomHeader.vue';
import CustomFooter from '../../components/CustomFooter.vue';
import PaymentFloating from 'src/components/template/PaymentFloating.vue';
import TemplateNotice from '../../components/template/TemplateNotice.vue';
import TemplateReview from '../../components/template/TemplateReview.vue';
import { ref } from 'vue';
export default {
  name: 'TemplatePage',
  components: {
    CustomHeader,
    CustomFooter,
    PaymentFloating,
    TemplateNotice,
    TemplateReview,
  },
  setup() {
    const categoryList = [
      '상품상세',
      '구매후기',
      '판매자 정보',
      '문의 및 규정',
    ];

    const currentCategory = ref('상품상세');
    const clickCategory = category => {
      currentCategory.value = category;
    };

    return {
      categoryList,
      currentCategory,
      clickCategory,
    };
  },
};
</script>

<style scoped>
.template-page {
  display: flex;
  padding: 5em 12em;
}

.template-detail {
  width: 65%;
  margin-right: 6em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.template-img {
  width: 100%;
  height: 400px;
  background-color: rgb(211, 211, 211);
  border-radius: 50px;
}

.template-detail-desc {
  margin-top: 4em;
  width: 95%;
}

.template-nav {
  display: flex;
  border-bottom: 1px solid #9f9d9d;
}

.template-nav div {
  padding: 0.5em 0.5em;
  margin-right: 2em;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.click-category {
  border-bottom: 2px solid black;
}

a {
  text-decoration: none;
}

a:link,
a:active,
a:visited {
  color: black;
}
</style>
