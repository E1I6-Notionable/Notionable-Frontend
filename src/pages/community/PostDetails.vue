<template>
  <div>
    <CustomHeader page="/posts/all" />
    <div class="community-page">
      <div class="post-title">
        <h5>{{ post.title }}</h5>
      </div>
      <div class="row post-info">
        <div class="row time">
          <span class="created">{{ post.created }}&nbsp;&nbsp;&nbsp;</span>
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
      </div>
      <q-separator />
      <div class="row post-info">
        <div class="flex-center like">
          <q-btn class="full-width" flat dense @click="toggleLike">
            <img
              :src="
                isLiked
                  ? '../../../public/img/icon/like_red.png'
                  : '../../../public/img/icon/like.png'
              "
            />
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
          v-model="text"
          placeholder="댓글을 입력해주세요"
          :dense="dense"
        >
          <template v-slot:prepend>
            <img src="../../../public/img/icon/default-profile.png" />
            <p class="comment-writer">{{ writing_comment.writer }}</p>
          </template>
          <template v-slot:append>
            <q-btn class="comment-upload" color="dark" label="등록" />
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
import { VueElement, ref } from 'vue';

export default {
  components: {
    CustomFooter,
    CustomHeader,
    CommentList,
  },
  data() {
    return {
      post: {
        title: '일 잘하는 PM 소리 듣는 노션 활용법 공유할게요',
        content:
          '요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~ \n 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~ \n \n \n \n \n \n \n \n \n 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~\n요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~\n요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~ ',
        created: '2시간 전',
        likeCount: 106,
        commentCount: 23,
        isLiked: false,
      },
      writing_comment: {
        writer: '서은',
      },
      comments: [
        {
          id: 1,
          writer: '횬닝',
          date: '3분 전',
          content: '꿀팁 공유 너무 감사드려요~',
          replies: [
            {
              id: 4,
              writer: '서은',
              date: '3분 전',
              content: '도움이 되셨다니 다행이에요!',
            },
          ],
        },
        {
          id: 2,
          writer: '횬닝',
          date: '3분 전',
          content: '꿀팁 공유 너무 감사드려요~',
        },
        {
          id: 3,
          writer: '횬닝',
          date: '3분 전',
          content: '꿀팁 공유 너무 감사드려요~',
        },
      ],
    };
  },
  methods: {
    toggleLike() {
      this.post.likeCount += this.isLiked ? -1 : 1;
      this.isLiked = !this.isLiked;
    },
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
