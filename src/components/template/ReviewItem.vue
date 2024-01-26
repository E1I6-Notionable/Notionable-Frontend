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
    <div class="review-img-list" v-if="review.imageUrls.length !== 0">
      <div v-for="(image, i) in reviewImgList" :key="image">
        <div class="review-img">
          <img :src="image" />
        </div>
        <i
          v-if="updateView"
          class="fa-solid fa-circle-xmark delete-icon"
          @click="deleteImg(i)"
        ></i>
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
        <div v-else>
          <button class="delete-btn" @click="deleteReview">삭제</button>
          <button class="complete-btn">완료</button>
        </div>
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
    const reviewImgList = ref(review.imageUrls);
    const formData = new FormData();

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
      const reqDto = {
        templateId,
        rate: satisfaction.value,
        content: commentContent.value,
        imageUrls: reviewImgList.value,
      };
      const json = JSON.stringify(reqDto);
      const blob = new Blob([json], { type: 'application/json' });
      formData.append('reqDto', blob);

      try {
        const res = await axios.put(
          `template/review/${review.reviewId}`,
          formData,
          config,
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };

    const deleteReview = async () => {
      try {
        const res = await axios.delete(
          `template/review/${review.reviewId}`,
          config,
        );
        console.log(res);
        if (res.data.code === 200) {
          alert('삭제가 완료되었습니다.');
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    };

    const deleteImg = i => {
      const filteredList = reviewImgList.value.filter(
        (_, index) => index !== i,
      );
      reviewImgList.value = filteredList;
    };

    return {
      updateView,
      clickUpdateBtn,
      satisfaction,
      clickSatisfaction,
      commentContent,
      updateReview,
      parseCreatedAt,
      deleteReview,
      reviewImgList,
      deleteImg,
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

.review-img-list {
  display: flex;
  margin-top: 1em;
}

.review-img-list > div {
  width: calc(100% / 3 - 1em);
  margin-right: 1.5em;
  flex-shrink: 0;
  position: relative;
}

.review-img {
  width: 100%;
  height: 140px;
  border-radius: 20px;
  overflow: hidden;
}

.review-img img {
  width: 100%;
  height: 100%;
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
  resize: none;
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

.review-update-btn div {
  display: flex;
}

.complete-btn,
.delete-btn {
  border: none;
  padding: 0.5em 1em;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  width: fit-content;
  white-space: nowrap;
}

.complete-btn {
  background-color: #313440;
  color: white;
}

.delete-btn {
  background-color: #ebebf0;
  color: #313440;
  margin-right: 0.6em;
}

.delete-icon {
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 1.6rem;
  cursor: pointer;
}
</style>
