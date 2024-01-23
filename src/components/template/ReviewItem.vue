<template>
  <div class="template-review-item">
    <div class="review-profile">
      <div class="review-profile-img">
        <img
          :src="
            review.profile ? review.profile : '/img/icon/default-profile.png'
          "
        />
      </div>
      <div v-for="btn in ['만족해요', '별로에요']" :key="btn">
        <div
          v-if="updateView"
          class="satisfaction-btn"
          :class="btn === satisfaction && 'btn-click'"
          @click="clickSatisfaction(btn)"
        >
          {{ btn }}
          {{ btn === '만족해요' ? '👍🏻' : '👎🏻' }}
        </div>
      </div>
      <span v-if="!updateView"
        >{{ satisfaction }}
        {{ satisfaction === '만족해요' ? '👍🏻' : '👎🏻' }}</span
      >
    </div>
    <div class="review-date">
      {{ parseCreatedAt }}
    </div>
    <div class="review-imgs" v-if="review.imageUrls.length !== 0">
      <div v-for="image in review.imageUrls" :key="image">
        <img :src="image" />
      </div>
    </div>
    <div class="reveiw-content">
      <textarea v-if="updateView" v-model="commentContent" />
      <p v-else>
        {{ commentContent }}
      </p>
      <span
        class="review-update-btn"
        v-if="updateBtnView"
        @click="clickUpdateBtn"
      >
        <img src="/img/icon/myreview-pencil.png" v-if="!updateView" />
        <button v-else>완료</button>
      </span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from '../../axios';
export default {
  props: {
    review: {
      type: Object,
    },
    updateBtnView: {
      type: Boolean,
    },
  },
  setup({ review }) {
    const updateView = ref(false);
    const satisfaction = ref(review.rate);
    const commentContent = ref(review.content);
    const createdAt = new Date(review.createdAt);
    const parseCreatedAt = createdAt.toLocaleDateString();

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Access-Control-Allow-Origin': 'http://localhost:9000',
        'Access-Control-Allow-Credentials': true,
      },
    };

    const clickUpdateBtn = () => {
      updateView.value = !updateView.value;
    };

    const clickSatisfaction = state => {
      satisfaction.value = state;
    };

    const updateReview = async () => {
      try {
        // const res = await axios.put(
        //   `template/review/${review.reviewId}`,
        //   {
        //     templateId,
        //     rate: satisfaction.value,
        //     content: commentContent.value,
        //   },
        //   config,
        // );
        // console.log(res);
      } catch (err) {
        console.log(err);
      }
    };

    return {
      updateView,
      clickUpdateBtn,
      satisfaction,
      clickSatisfaction,
      commentContent,
      updateReview,
      parseCreatedAt,
    };
  },
};
</script>

<style scoped>
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

.satisfaction-btn {
  font-weight: 600;
  font-size: 1.1rem;
  background-color: white;
  padding: 0.4em 1.2em 0.3em;
  margin-right: 1em;
  border-radius: 30px;
  cursor: pointer;
}

.btn-click {
  background-color: #313440;
  color: white;
}

.review-date {
  font-weight: 500;
  text-align: right;
}

.review-imgs {
  display: flex;
  margin-top: 1em;
  overflow: hidden;
}

.review-imgs div {
  width: calc(100% / 3 - 1em);
  height: 140px;
  border-radius: 20px;
  margin-right: 1.5em;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
}

.review-imgs img {
  object-fit: cover;
}

.reveiw-content {
  margin-top: 2em;
  display: flex;
  justify-content: space-between;
}

.reveiw-content p {
  font-weight: 500;
  font-size: 1rem;
}

.reveiw-content textarea {
  border: none;
  background-color: transparent;
  font-weight: 500;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  margin-right: 1em;
}

textarea:focus {
  outline: none;
}

.review-update-btn {
  cursor: pointer;
}

.review-update-btn img {
  width: 25px;
}

.review-update-btn button {
  background-color: #313440;
  color: white;
  border: none;
  padding: 0.5em 1em;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  width: fit-content;
  white-space: nowrap;
}
</style>
