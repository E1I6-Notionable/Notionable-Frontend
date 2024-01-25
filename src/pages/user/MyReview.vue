<template>
  <CustomHeader />
  <div class="mypage">
    <MypageControl />
    <div class="mypage-content">
      <div v-for="review in reviewList" :key="review.reviewId">
        <ReviewItem :review="review" :updateBtnView="true" />
      </div>
    </div>
  </div>
  <CustomFooter />
</template>

<script>
import CustomHeader from 'src/components/CustomHeader.vue';
import CustomFooter from 'src/components/CustomFooter.vue';
import MypageControl from 'src/components/user/MypageControl.vue';
import ReviewItem from 'src/components/template/ReviewItem.vue';
import { ref } from 'vue';
import axios from '../../axios';

export default {
  components: {
    CustomHeader,
    CustomFooter,
    MypageControl,
    ReviewItem,
  },
  setup() {
    const reviewList = ref([]);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Access-Control-Allow-Origin': 'http://localhost:9000',
        'Access-Control-Allow-Credentials': true,
      },
    };

    const getMyReview = async () => {
      try {
        const res = await axios.get('template/review/list', config);
        reviewList.value = res.data.data;
      } catch (err) {
        console.log(err);
      }
    };

    getMyReview();

    return {
      reviewList,
    };
  },
};
</script>

<style scoped>
.mypage {
  display: flex;
  justify-content: center;
  margin-top: 6em;
}

.mypage-content {
  width: 800px;
}
</style>
