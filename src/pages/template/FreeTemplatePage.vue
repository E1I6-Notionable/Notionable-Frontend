<template>
  <div>
    <CustomHeader page="template" />
    <div class="template-page">
      <TemplateCategory
        :categoryList="categoryList"
        @click-category="clickCategory"
      />
      <TemplateList :currentCategory="currentCategory" />
    </div>
    <CustomFooter />
  </div>
</template>

<script>
import CustomHeader from '../../components/CustomHeader.vue';
import TemplateList from '../../components/template/TemplateList.vue';
import CustomFooter from '../../components/CustomFooter.vue';
import TemplateCategory from '../../components/template/TemplateCategory.vue';
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
    const currentCategory = ref('');

    const clickCategory = category => {
      currentCategory.value = category;
    };

    return {
      categoryList,
      clickCategory,
      currentCategory,
    };
  },
};
</script>

<style scoped>
.template-page {
  padding: 3em 12em;
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
