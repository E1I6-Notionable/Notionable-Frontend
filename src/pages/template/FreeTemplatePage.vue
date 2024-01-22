<template>
  <div>
    <CustomHeader page="template" />
    <div class="template-page">
      <TemplateCategory
        :categoryList="categoryList"
        @click-category="clickCategory"
      />
      <div class="template-list">
        <TemplateItem
          v-for="(template, i) in templateList"
          :key="i"
          :template="template"
        >
        </TemplateItem>
      </div>
    </div>
    <CustomFooter />
  </div>
</template>

<script>
import CustomHeader from '../../components/CustomHeader.vue';
import CustomFooter from '../../components/CustomFooter.vue';
import TemplateCategory from '../../components/template/TemplateCategory.vue';
import TemplateItem from '../../components/template/TemplateItem.vue';
import { ref, watch } from 'vue';
import axios from '../../axios';
export default {
  name: 'FreeTemplatePage',
  components: {
    CustomHeader,
    CustomFooter,
    TemplateCategory,
    TemplateItem,
  },
  setup() {
    const categoryList = [
      { ko: '전체', en: '' },
      { ko: '학업관리', en: 'studyManagement' },
      { ko: '계획표', en: 'plan' },
      { ko: '가계부', en: 'account' },
      { ko: '비지니스/업무용', en: 'business' },
      { ko: '취미관리', en: 'hobby' },
      { ko: '습관관리', en: 'habit' },
      { ko: '독서관리', en: 'reading' },
      { ko: '여행계획', en: 'travel' },
    ];
    const currentCategory = ref('');
    const templateList = ref([]);

    const getTemplate = async (category = { en: '' }) => {
      const params = {
        page: 0,
        keyword: '',
        template_type: 'free',
        category: category.en,
        criteria: 'createdAt',
        criteria_option: '',
      };

      try {
        const res = await axios.get(`template/filter`, {
          params,
        });
        console.log(res);
        templateList.value = res.data.data;
      } catch (err) {
        console.log(err);
        alert('오류가 발생하였습니다.');
      }
    };

    getTemplate();

    watch(currentCategory, () => {
      getTemplate(currentCategory.value);
    });

    const clickCategory = category => {
      currentCategory.value = category;
    };

    return {
      categoryList,
      clickCategory,
      currentCategory,
      templateList,
    };
  },
};
</script>

<style scoped>
.template-page {
  padding: 3em 10em;
}

.template-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
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
