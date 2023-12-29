<template>
  <div>
    <CustomHeader page="community" />
    <div class="community-page">
      <div class="post-title">
        <h5>{{ post.title }}</h5>
      </div>
      <div class="row post-info">
        <div class="row time">
          <span class="created">{{ post.created }}</span>
          <span class="bar">&nbsp;|</span>
        </div>
        <div class="flex-center like">
          <q-btn class="full-width" flat dense @click.prevent>
            <q-icon name="sym_o_favorite" size="sm" :label="likeCount" />
            <span class="text-black q-ml-xs text-body2">{{
              post.likeCount
            }}</span>
          </q-btn>
        </div>
        <div class="flex-center comment">
          <q-btn class="full-width" flat dense @click.prevent>
            <q-icon
              name="sym_o_chat_bubble"
              class="q-ml-xs"
              size="sm"
              :label="commentCount"
            />
            <span class="text-black q-ml-xs text-body2">23</span>
          </q-btn>
        </div>
      </div>
      <q-separator />
      <div class="post-content">
        <p>{{ post.content }}</p>
      </div>
      <q-separator />
      <div class="row post-info">
        <div class="flex-center like">
          <q-btn class="full-width" flat dense @click.prevent>
            <q-icon
              class="q-mb-lg"
              name="sym_o_favorite"
              size="md"
              :label="likeCount"
            />
            <span
              class="text-black q-mb-lg q-ml-xs text-body2"
              style="font-size: 17px"
              >{{ post.likeCount }}</span
            >
          </q-btn>
        </div>
        <div class="flex-center q-ml-xs comment">
          <q-btn class="full-width" flat dense @click.prevent>
            <q-icon
              class="q-mb-lg"
              name="sym_o_chat_bubble"
              size="md"
              :label="commentCount"
            />
            <span
              class="text-black q-mb-lg q-ml-xs text-body2"
              style="font-size: 17px"
              >23</span
            >
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
            <q-icon
              name="account_circle"
              size="md"
              color="grey"
              :label="account"
            />
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

.like,
.comment {
  padding: 2px 0px;
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
