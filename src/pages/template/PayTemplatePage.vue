<template>
  <div>
    <CustomHeader page="template" />
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
import TemplateCategory from 'src/components/template/TemplateCategory.vue';
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

    const priceList = [{ ko: '전체' }, { ko: '고가순' }, { ko: '저가순' }];

    const currentCategory = ref('');
    const currentPrice = ref('');
    const templateList = ref([]);

    const getTemplate = async (category = { en: '' }, currentPrice = '') => {
      let params = {
        page: 0,
        keyword: '',
        template_type: 'paid',
        category: category.en,
        criteria: currentPrice,
        criteria_option: '',
      };

      if (currentPrice.ko === '고가순') {
        params = { ...params, criteria: 'price', criteria_option: 'desc' };
      } else if (currentPrice.ko === '저가순') {
        params = { ...params, criteria: 'price', criteria_option: 'asc' };
      } else if (currentPrice.ko === '전체') {
        params = { ...params, criteria: '', criteria_option: 'desc' };
      }

      try {
        const res = await axios.get(`template/filter`, {
          params,
        });
        console.log(res);
        templateList.value = res.data.data;
      } catch (err) {
        console.log(err);
      }
    };

    getTemplate();

    watch(currentCategory, () => {
      getTemplate(currentCategory.value, currentPrice.value);
    });

    watch(currentPrice, () => {
      getTemplate(currentCategory.value, currentPrice.value);
    });

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

.filter {
  display: flex;
}

a:link,
a:active,
a:visited {
  color: black;
}
</style>
