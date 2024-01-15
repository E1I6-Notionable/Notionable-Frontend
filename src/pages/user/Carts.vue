<template>
  <CustomHeader />
  <div class="carts-container">
    <h1>장바구니</h1>
    <div class="carts-list-container">
      <div class="carts-list">
        <TemplateItem
          v-for="cart in cartsList"
          :key="cart.item_id"
          :template="cart"
        />
      </div>
    </div>
  </div>
  <CustomFooter />
</template>

<script>
import CustomHeader from 'src/components/CustomHeader.vue';
import CustomFooter from 'src/components/CustomFooter.vue';
import TemplateItem from 'src/components/template/TemplateItem.vue';
import { ref } from 'vue';
import axios from '../../axios';
export default {
  components: {
    CustomHeader,
    CustomFooter,
    TemplateItem,
  },
  setup() {
    const cartsList = ref([]);
    const accessToken = `Bearer ${localStorage.getItem('accessToken')}`;
    const config = {
      Authorization: accessToken,
    };

    const getCarts = async () => {
      try {
        // const res = axios.get('user/my-cart', config);
        cartsList.value = [
          {
            item_id: 6,
            template_id: null,
            thumbnail:
              'https://notionable-s3-bucket.s3.ap-northeast-2.amazonaws.com/63993fff-ffa8-4dc4-83e0-e24f8896000d.jpg',
            creator: 'jun',
            attribute: '인기',
            template_url: 'template',
            price: 30000,
            title: '제목예시',
          },
          {
            item_id: 6,
            template_id: null,
            thumbnail:
              'https://notionable-s3-bucket.s3.ap-northeast-2.amazonaws.com/63993fff-ffa8-4dc4-83e0-e24f8896000d.jpg',
            creator: 'jun',
            attribute: '인기',
            template_url: 'template',
            price: 30000,
            title: '제목예시',
          },
          {
            item_id: 6,
            template_id: null,
            thumbnail:
              'https://notionable-s3-bucket.s3.ap-northeast-2.amazonaws.com/63993fff-ffa8-4dc4-83e0-e24f8896000d.jpg',
            creator: 'jun',
            attribute: '인기',
            template_url: 'template',
            price: 30000,
            title: '제목예시',
          },
          {
            item_id: 6,
            template_id: null,
            thumbnail:
              'https://notionable-s3-bucket.s3.ap-northeast-2.amazonaws.com/63993fff-ffa8-4dc4-83e0-e24f8896000d.jpg',
            creator: 'jun',
            attribute: '인기',
            template_url: 'template',
            price: 30000,
            title: '제목예시',
          },
        ];
      } catch (err) {
        console.log(err);
      }
    };

    getCarts();

    return {
      cartsList,
    };
  },
};
</script>

<style>
.carts-container {
  width: 1200px;
  margin: 3em auto;
}

.carts-container h1 {
  font-weight: 600;
  font-size: 2rem;
  margin: 0;
  padding-left: 1.4em;
}

.carts-list {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e4e5ec;
  padding: 0 3em 3em;
}

.carts-list:not(:first-of-type) {
  padding: 2em 3em 3em;
}
</style>
