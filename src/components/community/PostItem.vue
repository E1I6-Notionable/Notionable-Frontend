<template>
  <q-item
    :class="{ 'label-present': showLabel }"
    clickable
    :to="`/posts/${post.id}`"
    class="post-item"
  >
    <q-item-section
      style="
        height: 280px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      "
    >
      <div>
        <p v-if="showLabel" class="label">TOP {{ post.label }}</p>
        <div class="post-title">
          <p class="post-tab">{{ post.category }}</p>
          <p class="bar">|</p>
          <h5>{{ post.title }}</h5>
        </div>
        <div class="post-content">
          <div :class="{ 'content-container': post.thumbnail }">
            <p>{{ post.content }}</p>
          </div>
          <div v-if="post.thumbnail" class="thumbnail-container">
            <img :src="post.thumbnail" alt="Thumbnail" class="thumbnail" />
          </div>
        </div>
      </div>
      <div class="row post-info">
        <div class="row time">
          <span class="created">{{ formatCreatedAt(post.createdAt) }}</span>
          <span class="bar">|</span>
        </div>
        <div class="flex-center like">
          <q-btn class="full-width" flat dense @click.prevent>
            <img
              v-if="post.existLike"
              src="../../../public/img/icon/like_red.png"
            />
            <img v-else src="../../../public/img/icon/like.png" />
            <span class="text-black q-ml-xs text-body2">{{
              post.likeCount
            }}</span>
          </q-btn>
        </div>
        <div class="flex-center comment">
          <q-btn class="full-width" flat dense @click.prevent>
            <img src="../../../public/img/icon/comment.png" />
            <span class="text-black q-ml-xs text-body2">{{
              post.commentCount
            }}</span>
          </q-btn>
        </div>
      </div>
      <q-separator class="separator" />
    </q-item-section>
  </q-item>
</template>
<script>
import dayjs from 'dayjs';

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    showLabel: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formatCreatedAt(createdAt) {
      const postDate = dayjs(createdAt);
      const currentDate = dayjs();

      const minutesDiff = currentDate.diff(postDate, 'minute');
      const hoursDiff = currentDate.diff(postDate, 'hour');
      const daysDiff = currentDate.diff(postDate, 'day');

      if (minutesDiff < 1) {
        return '방금 전';
      } else if (hoursDiff < 1) {
        return `${minutesDiff}분 전`;
      } else if (hoursDiff < 24) {
        return `${hoursDiff}시간 전`;
      } else if (daysDiff <= 7) {
        return `${daysDiff}일 전`;
      } else {
        return postDate.format('YY.MM.DD');
      }
    },
  },
};
</script>

<style scoped>
.post-item {
  margin: 20px 0px;
}

.label-present {
  height: 320px;
  margin-top: 70px;
}

.label {
  font-size: 21px;
  font-weight: bolder;
  color: #313440;
  margin-top: -60px;
  margin-bottom: 25px;
}
.post-title {
  display: flex;
  margin: 10px 0px;
  align-items: center;
}

.post-tab,
.bar,
h5 {
  margin: 0;
}

.post-tab {
  color: #3168cd;
  font-weight: 600;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  background-color: #d6e1f5;
  border-radius: 5px;
  padding: 2px 9px;
}
.bar {
  margin: 0 8px;
  height: 35px;
  font-size: 20px;
}

h5 {
  font-weight: bold;
}

.post-content {
  width: 100%;
  height: 120px;
  margin-top: 20px;
  display: flex;
  font-size: 18px;
  font-weight: 530;
  white-space: pre-line;
}

.content-container {
  width: 70%;
  height: 140px;
  display: flex;
}

.thumbnail-container {
  display: flex;
  width: 30%;
  height: 150px;
  margin-right: 10px;
}

.thumbnail {
  width: 100%;
}

.post-info {
  margin: 20px 0px;
}

.created {
  text-align: center;
  padding: 5px 0px;
  font-size: 16px;
}

.like,
.comment {
  padding: 3px 0px;
}

.text-body2 {
  font-size: 17px;
  margin-bottom: 2px;
  margin-left: 5px;
}
</style>
