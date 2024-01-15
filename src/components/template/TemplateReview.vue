<template>
  <div class="template-review-top">
    <ReviewWriteBtn page="review" />
    <div class="template-satisfaction">
      <span>99%</span><span>의 구매자가 만족한 템플릿이에요</span>
    </div>
  </div>
  <div class="template-review-list">
    <div
      class="template-review-item"
      v-for="review in reviewList"
      :key="review.reviewId"
    >
      <div class="review-profile">
        <div class="review-profile-img">
          <img
            :src="
              review.profile ? review.profile : '/img/icon/default-profile.png'
            "
          />
        </div>
        <span>{{ review.rate }} 👍🏻</span>
      </div>
      <div class="review-date">2023.11.12</div>
      <div class="review-imgs">
        <div v-for="image in review.imageUrls" :key="image">
          <img :src="image" />
        </div>
      </div>
      <div class="reveiw-content">
        <p>
          {{ review.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewWriteBtn from './ReviewWriteBtn.vue';
import axios from '../../axios';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
export default {
  components: {
    ReviewWriteBtn,
  },
  setup() {
    const reviewList = ref([]);
    const route = useRoute();
    const id = route.params.id;

    const getReviewList = async () => {
      try {
        // const res = await axios.get(`/template/review/list/${id}`);
        // reviewList.value = res.data.data;
        reviewList.value = [
          {
            reviewId: 1,
            nickName: 'test_user',
            profile: 'imageurl',
            rate: '만족해요',
            content: '댓글 내용',
            imageUrls: [
              'https://notionable-s3-bucket.s3.ap-northeast-2.amazonaws.com/2eea54d7-685c-459c-8c55-d092d1452001.png',
              'https://notionable-s3-bucket.s3.ap-northeast-2.amazonaws.com/0b1e592e-6489-4443-b9f4-0d35eede9cf5.png',
            ],
          },
        ];
      } catch (err) {
        console.log(err);
      }
    };

    getReviewList();

    return {
      reviewList,
    };
  },
};
</script>

<style>
.template-review-top {
  margin-top: 1em;
  position: relative;
}

.template-satisfaction {
  padding-top: 4em;
}

.template-satisfaction span:first-child {
  font-weight: 800;
  font-size: 1.5rem;
}

.template-satisfaction span:last-child {
  font-size: 1.5rem;
  font-weight: 500;
}

.template-review-list {
  margin-top: 3em;
}

.template-review-item {
  background-color: #fafafc;
  border-radius: 20px;
  padding: 1.8em;
  margin-bottom: 2.5em;
}

.review-profile {
  display: flex;
  align-items: center;
}

.review-profile-img {
  width: 35px;
  height: 35px;
  border-radius: 100%;
  margin-right: 1em;
  overflow: hidden;
  display: flex;
}

.review-profile-img img {
  object-fit: cover;
}

.review-profile span {
  font-weight: 600;
  font-size: 1.1rem;
}

.review-date {
  font-weight: 500;
  text-align: right;
}

.review-imgs {
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
}

.review-imgs div {
  width: 200px;
  height: 140px;
  border-radius: 20px;
  overflow: hidden;
}

.review-imgs img {
  object-fit: cover;
}

.reveiw-content {
  margin-top: 2em;
}

.reveiw-content p {
  font-weight: 500;
  font-size: 1rem;
}
</style>
