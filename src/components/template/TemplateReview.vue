<template>
  <div class="template-review-top">
    <ReviewWriteBtn
      page="review"
      :writeView="writeView"
      @click="clickWriteBtn"
    />
    <div v-if="!writeView" class="template-satisfaction">
      <span>{{ percent }}%</span><span>의 구매자가 만족한 템플릿이에요</span>
    </div>
  </div>
  <div v-if="!writeView">
    <div
      class="template-review-list"
      v-for="review in reviewList"
      :key="review.reviewId"
    >
      <ReviewItem :review="review" />
    </div>
  </div>
  <WriteReview v-else />
</template>

<script>
import ReviewWriteBtn from './ReviewWriteBtn.vue';
import ReviewItem from './ReviewItem.vue';
import WriteReview from './WriteReview.vue';
import axios from '../../axios';
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    ReviewWriteBtn,
    ReviewItem,
    WriteReview,
  },
  setup() {
    const store = useStore();
    const reviewList = ref([]);
    const percent = ref(0);
    const route = useRoute();
    const id = route.params.id;
    const writeReview = computed(() => store.state.template.writeReview);
    const writeView = ref(writeReview.value ? true : false);

    const getReviewList = async () => {
      try {
        const res = await axios.get(`template/review/list/${id}`);
        const resPercent = await axios.get(`template/review-percent/${id}`);
        console.log(res);

        reviewList.value = res.data.data;
        percent.value = resPercent.data.data;
      } catch (err) {
        console.log(err);
      }
    };

    getReviewList();

    const clickWriteBtn = () => {
      writeView.value = true;
    };

    return {
      reviewList,
      writeView,
      clickWriteBtn,
      percent,
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
</style>
