<template>
  <div>
    <CustomHeader page="template" />
    <div class="template-page">
      <div class="template-detail">
        <img class="template-img" :src="templateDesc.thumbnail" />
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
        <PaymentFloating :templateDesc="templateDesc" />
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
import axios from '../../axios';
import { useRoute } from 'vue-router';

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
    const route = useRoute();
    const id = route.params.id;

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

    const templateDesc = ref({
      templateId: 0,
      nickName: '',
      profile: '',
      thumbnail: '',
      title: '',
      category: '',
      price: 0,
      content: '',
      imageUrls: [''],
      createdAt: '',
    });

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Access-Control-Allow-Origin': 'http://localhost:9000',
        'Access-Control-Allow-Credentials': true,
      },
    };

    const getTemplateDetail = async () => {
      const res = await axios.get(`template/detail/${id}`, config);
      templateDesc.value = res.data.data;
    };

    getTemplateDetail();

    return {
      categoryList,
      currentCategory,
      clickCategory,
      templateDesc,
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
  border-radius: 50px;
  object-fit: cover;
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
