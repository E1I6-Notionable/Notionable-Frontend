<template>
  <div>
    <CustomHeader />
    <div class="template-page">
      <div class="filter">
        <TemplateCategory
          :categoryList="categoryList"
          @click-category="clickCategory"
        />
        <TemplateCategory
          :categoryList="priceList"
          @click-category="clickPrice"
        />
      </div>
      <TemplateList
        :currentCategory="currentCategory"
        :currentPrice="currentPrice"
      />
    </div>
    <CustomFooter />
  </div>
</template>

<script>
import CustomHeader from '../../components/CustomHeader.vue';
import TemplateList from '../../components/template/TemplateList.vue';
import CustomFooter from '../../components/CustomFooter.vue';
import TemplateCategory from 'src/components/template/TemplateCategory.vue';
import { ref } from 'vue';
export default {
  name: 'FreeTemplatePage',
  components: {
    CustomHeader,
    TemplateList,
    CustomFooter,
    TemplateCategory,
  },
  setup() {
    const categoryList = [
      '학업관리',
      '계획표',
      '가계부',
      '비지니스/업무용',
      '취미관리',
      '습관관리',
      '독서관리',
      '여행계획',
    ];

    const priceList = ['전체', '고가순', '저가순'];

    const currentCategory = ref('');
    const currentPrice = ref('');

    const clickCategory = category => {
      currentCategory.value = category;
    };

    const clickPrice = price => {
      currentPrice.value = price;
    };

    return {
      categoryList,
      priceList,
      clickCategory,
      clickPrice,
      currentCategory,
      currentPrice,
    };
  },
};
</script>

<style scoped>
.template-page {
  padding: 3em 12em;
}

.filter {
  display: flex;
}

a:link,
a:active,
a:visited {
  color: black;
}
</style>
