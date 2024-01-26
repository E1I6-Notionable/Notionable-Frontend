<template>
  <div>
    <CustomHeader page="/posts/all" />
    <div class="community-page">
      <div v-if="postEditing" style="margin-bottom: 20px">
        <q-input
          borderless
          v-model="editedTitle"
          style="width: 100%; font-size: 22px; color: #313440"
        />
      </div>
      <div v-else class="post-title">
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
      <div v-if="postEditing" class="post-content">
        <q-input
          borderless
          v-model="editedContent"
          style="width: 100%; font-size: 20px; color: #313440"
          type="textarea"
        />
      </div>
      <p v-else class="post-content" v-html="post.content"></p>
      <div class="images">
        <div v-for="(imageUrl, index) in post.imageUrls" :key="index">
          <img
            :src="imageUrl"
            style="height: 200px; width: 200px; margin-right: 25px"
          />
        </div>
      </div>
      <div v-if="isWriter" style="margin-bottom: 10px" align="right">
        <q-btn
          v-if="postEditing"
          flat
          label="완료"
          style="background-color: #f7f8fc; border-radius: 10px"
          @click="saveEdit"
        />
        <q-btn
          v-else
          flat
          label="수정"
          style="background-color: #f7f8fc; border-radius: 10px"
          @click="toEdit"
        />
        <q-btn
          v-if="postEditing"
          flat
          label="취소"
          style="
            background-color: #f7f8fc;
            border-radius: 10px;
            margin-left: 5px;
          "
          @click="cancelEdit"
        />
        <q-btn
          v-else
          flat
          label="삭제"
          style="
            background-color: #f7f8fc;
            border-radius: 10px;
            margin-left: 5px;
          "
          @click="confirmDelete = true"
        />
        <q-dialog v-model="confirmDelete" persistent>
          <div
            style="
              width: 300px;
              height: 150px;
              background-color: white;
              border-radius: 8px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            "
          >
            <div
              style="
                text-align: center;
                padding-top: 45px;
                font-size: 14px;
                font-weight: 600;
              "
            >
              게시물을 삭제하시겠습니까?
            </div>
            <div style="display: flex">
              <q-btn
                flat
                label="예"
                @click="deletePost"
                style="
                  width: 50%;
                  background-color: #081829;
                  color: #fafafc;
                  border-radius: 0px;
                  font-size: 13px;
                "
              />
              <q-btn
                flat
                label="아니오"
                v-close-popup
                style="
                  width: 50%;
                  background-color: #fafafc;
                  color: #081829;
                  border-radius: 0px;
                  font-size: 13px;
                "
              />
            </div>
          </div>
        </q-dialog>
      </div>

      <q-separator />
      <div class="row post-info">
        <div class="flex-center like">
          <q-btn class="full-width" flat dense @click="toggleLike">
            <div class="like-img">
              <img
                v-if="post.existLike"
                src="../../../public/img/icon/like_red.png"
              />
              <img v-else src="../../../public/img/icon/like.png" />
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
            <img v-if="userProfile" :src="userProfile" style="width: 30px; height: 30px;border-radius: 20px;" />
            <img
              v-else
              src="../../../public/img/icon/default-profile.png"
              style="width: 25px; "
            />
            <p class="comment-writer">{{ userName }}</p>
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
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  components: {
    CustomFooter,
    CustomHeader,
    CommentList,
  },
  props: {
    postId: {
      type: String,
      default: undefined,
    },
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
    const postEditing = ref(false);
    const router = useRouter();

    return {
      user,
      postEditing,
      router,
    };
  },
  data() {
    return {
      post: {},
      commentText: '',
      comments: [],
      editedTitle: '',
      editedContent: '',
      originalContent: '',
      confirmDelete: false,
    };
  },
  methods: {
    async fetchData() {
      try {
        const postId = this.$route.params.id;
        const token = localStorage.getItem('accessToken');
        const postResponse = await axios.get(
          `http://13.209.29.227:8080/posts/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
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
            existLike: postData.existLike,
            writerName: postData.username,
            category: postData.category,
          };

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
        return postDate.format('YY.MM.DD');
      }
    },

    toEdit() {
      this.postEditing = true;
      this.editedTitle = this.post.title;
      this.editedContent = this.post.content;
      this.originalContent = this.post.content;
    },

    cancelEdit() {
      this.postEditing = false;
    },

    isWriter() {
      if (userName == this.writerName) {
        return true;
      } else {
        return false;
      }
    },

    async saveEdit() {
      try {
        const token = localStorage.getItem('accessToken');
        const postId = this.$route.params.id;

        const formdata = new FormData();
        const communityReq = {
          title: this.editedTitle,
          content: this.editedContent,
          category: this.post.category,
        };
        const json = JSON.stringify(communityReq);
        const blob = new Blob([json], { type: 'application/json' });

        if (this.post.imageUrls.length !== 0) {
          for (let i = 0; i < this.post.imageUrls.length; i++) {
            formdata.append('files', this.post.imageUrls[i]);
          }
        }
        formdata.append('communityReq', blob);

        const response = await axios.put(
          `http://13.209.29.227:8080/posts/${postId}`,
          formdata,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data.success) {
          this.originalContent = this.editedContent;
          this.postEditing = false;
          location.reload();
        } else {
          console.error('Failed to update comment:', response.data.message);
        }
      } catch (error) {
        console.error('Error updating comment:', error);
      }
    },

    async deletePost() {
      const token = localStorage.getItem('accessToken');
      const postId = this.$route.params.id;

      try {
        const response = await axios.delete(
          `http://13.209.29.227:8080/posts/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.data.success) {
          this.router.push('/posts/all');
        } else {
          console.error('Failed to delete comment:', response.data.message);
        }
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    },

    async toggleLike() {
      try {
        console.log(this.post.existLike);
        this.post.existLike = !this.post.existLike;
        this.post.likeCount += this.post.existLike ? 1 : -1;

        const postId = this.$route.params.id;
        const token = localStorage.getItem('accessToken');
        console.log(this.post.existLike);

        await axios.post(
          `http://13.209.29.227:8080/posts/like/${postId}`,
          {
            isLiked: this.post.existLike,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
      } catch (error) {
        console.error('Error toggling like:', error);

        if (error.response) {
          console.error('Response data:', error.response.data);
        }
      }
    },
    submitComment() {
      if (!this.commentText) {
        alert('댓글을 작성해주세요!');
      } else {
        const token = localStorage.getItem('accessToken');
        console.log(token);
        const postId = this.$route.params.id;
        console.log(postId);
        console.log(this.commentText);
        axios
          .post(
            `http://13.209.29.227:8080/comments/${postId}`,
            {
              content: this.commentText,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            },
          )
          .then(response => {
            if (response.data.success) {
              this.commentText = '';
              this.fetchData();
            } else {
              console.error(
                'Comment submission failed:',
                response.data.message,
              );
            }
          })
          .catch(error => {
            console.error('Error submitting comment:', error);
          });
      }
    },
  },

  computed: {
    userName() {
      return this.user.name;
    },
    userProfile() {
      return this.user.profile;
    },
  },
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
  margin-top: 70px;
  margin-bottom: 40px;
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
  padding-top: 11%;
  padding-left: 6px;
}

.comment-upload {
  border-radius: 10px;
  font-weight: 600;
}
</style>