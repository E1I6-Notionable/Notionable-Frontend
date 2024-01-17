<template>
  <div>
    <CustomHeader page="/posts/all" />
    <div class="community-page">
      <div class="post-title">
        <h5>{{ post.title }}</h5>
      </div>
      <div class="row post-info">
        <div class="row time">
          <span class="created"
            >{{ formatCreatedAt(post.createdAt) }}&nbsp;&nbsp;&nbsp;</span
          >
        </div>
        <div class="flex-center like">
          <div class="like-img">
            <img src="../../../public/img/icon/like.png" />
          </div>
          <span class="text-black q-ml-xs text-body2">{{
            post.likeCount
          }}</span>
        </div>
        <div class="flex-center comment">
          <div class="comment-img">
            <img src="../../../public/img/icon/comment.png" />
          </div>
          <span class="text-black q-ml-xs text-body2">{{
            post.commentCount
          }}</span>
        </div>
      </div>
      <q-separator />
      <div class="post-content">
        <p>{{ post.content }}</p>
        <div class="images">
          <div v-for="(imageUrl, index) in post.imageUrls" :key="index">
            <img :src="imageUrl" style="height: 200px; width: 200px; margin-right: 25px;"/>
          </div>
        </div>
      </div>

      <q-separator />
      <div class="row post-info">
        <div class="flex-center like">
          <q-btn class="full-width" flat dense @click="toggleLike">
            <div class="like-img" :class="{ isLiked: post.isLiked }">
              <img src="../../../public/img/icon/like.png" />
            </div>
            <span
              class="text-black q-mb-lg q-ml-xs text-body2"
              style="font-size: 17px"
              id="count"
              >{{ post.likeCount }}</span
            >
          </q-btn>
        </div>
        <div class="flex-center q-ml-xs comment">
          <q-btn
            class="full-width"
            flat
            dense
            @click.prevent
            style="font-size: 10px"
          >
            <img src="../../../public/img/icon/comment.png" />
            <span class="text-black q-mb-lg q-ml-sm text-body2">{{
              post.commentCount
            }}</span>
          </q-btn>
        </div>
      </div>
      <div class="comment-input">
        <q-input
          filled
          v-model="commentText"
          placeholder="댓글을 입력해주세요"
          :dense="dense"
        >
          <template v-slot:prepend>
            <img src="../../../public/img/icon/default-profile.png" />
            <p class="comment-writer">{{ commentWriter }}</p>
          </template>
          <template v-slot:append>
            <q-btn
              class="comment-upload"
              color="dark"
              label="등록"
              @click="submitComment"
            />
          </template>
        </q-input>
      </div>
      <div class="q-mt-lg comment-list">
        <CommentList :items="comments" />
      </div>
    </div>

    <CustomFooter />
  </div>
</template>

<script>
import CustomHeader from '../../components/CustomHeader.vue';
import CustomFooter from '../../components/CustomFooter.vue';
import CommentList from '../../components/community/comment/CommentList.vue';
import axios from 'axios';
import dayjs from 'dayjs';

export default {
  components: {
    CustomFooter,
    CustomHeader,
    CommentList,
  },
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      post: {},
      commentText: '',
      commentWriter: '서은',
      comments: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        const postId = this.$route.params.id;
        const postResponse = await axios.get(
          `http://13.209.29.227:8080/posts/${postId}`,
        );

        if (postResponse.data.success) {
          const postData = postResponse.data.data;
          this.post = {
            title: postData.title,
            content: postData.content,
            createdAt: postData.createdAt,
            likeCount: postData.communityLike,
            commentCount: postData.communityComment,
            imageUrls: postData.imageUrls,
            isLiked: false,
          };
          console.log(postId);

          const commentResponse = await axios.get(
            `http://13.209.29.227:8080/comments/${postId}`,
          );

          if (commentResponse.data.success) {
            const commentData = commentResponse.data.data;
            this.comments = commentData.infoList.map(comment => ({
              id: comment.commentId,
              writer: comment.username,
              date: this.formatCreatedAt(comment.createdAt),
              content: comment.content,
              profile: comment.profile,
            }));
          } else {
            console.error(
              'Comment backend request failed:',
              commentResponse.data.message,
            );
          }
        } else {
          console.error(
            'Post backend request failed:',
            postResponse.data.message,
          );
        }
      } catch (error) {
        console.error('Error fetching data from the backend:', error);
      }
    },
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
        return postDate.format('YYYY년 MM월 DD일');
      }
    },

    toggleLike() {
      this.post.isLiked = !this.post.isLiked;
      if (this.post.isLiked) {
        this.post.likeCount++;
      } else {
        this.post.likeCount--;
      }
    },
    submitComment() {
    },
  },
  computed: {},
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.community-page {
  margin: 115px 300px;
}

.post-title h5 {
  font-weight: 700;
  margin-bottom: 20px;
}

.post-info {
  margin: 17px 0px;
}

.bar {
  margin: 0 8px;
  height: 35px;
  font-size: 20px;
}

.created {
  padding: 6px 0px;
}
.like-img,
.comment-img {
  padding-top: 3px;
  padding-left: 2px;
}
.like,
.comment {
  padding: 2px 4px;
  display: flex;
}
.like-img {
  padding-top: 3px;
  padding-left: 2px;
}

.like-img.isLiked img {
  content: url('../../../public/img/icon/like_red.png');
}
.text-body2 {
  font-size: 17px;
  margin-bottom: 2px;
  margin-left: 5px;
}

.post-content {
  margin: 70px 0px;
  font-size: 20px;
  font-weight: 550;
  color: #313440;
  white-space: pre-line;
  line-height: 40px;
}

.images {
  display: flex;
  width: 100%;
  margin-top: 23px;
}

.comment-writer {
  font-size: 18px;
  font-weight: 600;
  color: black;
  padding-top: 19%;
  padding-left: 4px;
}

.comment-upload {
  border-radius: 10px;
  font-weight: 600;
}
</style>
