<template>
  <q-item class="comment-item q-py-md">
    <q-item-section>
      <div class="row">
        <q-img
          v-if="comment.profile"
          :src="comment.profile"
          :alt="comment.writer"
          style="width: 30px; height: 30px; border-radius: 50%"
        />
        <div class="flex text-caption q-pl-sm" style="width: 950px">
          <span
            class="text-black writer"
            style="font-size: 18px; font-weight: 600"
            >{{ comment.writer }}</span
          >
          <span
            class="bar"
            style="font-size: large; color: #737584; margin: 4px 5px"
            >|</span
          >
          <span
            class="date"
            style="color: #313440; font-weight: 500; font-size: 14.5px"
            >{{ comment.date }}</span
          >

          <q-btn flat dense style="margin-left: 5px" @click="startReplying">
            <img
              src="../../../../public/img/icon/comment.png"
              style="width: 23px"
            />
          </q-btn>
        </div>
      </div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div
          v-if="!isEditing"
          class="q-mt-md content"
          style="width: calc(100% - 110px); margin-right: 10px"
        >
          {{ comment.content }}
        </div>

        <div v-if="isEditing" class="q-mt-md">
          <q-input
            v-model="editedContent"
            @input="updateCharCount"
            style="width: 950px"
          />
        </div>
        <div style="display: flex; margin-top: 46px; align-items: center">
          <span
            v-if="!isEditing"
            @click="editComment"
            style="cursor: pointer; margin-right: 5px; font-weight: 600"
            >수정</span
          >
          <span
            v-if="isEditing"
            @click="saveEdit"
            style="cursor: pointer; margin-right: 4px; font-weight: 600"
            >완료</span
          >
          <span style="margin-top: -3px; font-size: medium; color: #737584"
            >|</span
          >
          <span
            @click="confirmDelete = true"
            style="cursor: pointer; font-weight: 600; margin-left: 4px"
            >삭제</span
          >
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
                댓글을 삭제하시겠습니까?
              </div>
              <div style="display: flex;">
                <q-btn
                  flat
                  label="예"
                  @click="deleteComment"
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
      </div>

      <div v-if="replies.length">
        <div
          class="reply-separator"
          style="border-top: 0.5px solid #e0e0e0; margin-top: 20px"
        ></div>
        <div v-for="reply in replies" :key="reply.id" class="row">
          <img
            src="../../../../public/img/icon/reply_arrow.png"
            style="
              width: 30px;
              height: 30px;
              margin-top: 25px;
              margin-right: 15px;
            "
          />

          <div style="margin-top: 25px; align-items: center">
            <div style="display: flex">
              <q-img
                v-if="reply.profile"
                :src="reply.profile"
                :alt="reply.writer"
                style="width: 30px; height: 30px; border-radius: 50%"
              />
              <div class="flex text-caption q-pl-sm" style="width: 905px">
                <span
                  class="text-black writer"
                  style="font-size: 18px; font-weight: 600"
                  >{{ reply.writer }}</span
                >
                <span
                  class="bar"
                  style="font-size: large; color: #737584; margin: 4px 5px"
                  >|</span
                >
                <span
                  class="date"
                  style="color: #313440; font-weight: 500; font-size: 14.5px"
                  >{{ reply.date }}</span
                >
              </div>
            </div>
            <div class="q-mt-md content">{{ reply.content }}</div>
            <CommentList
              v-if="reply.replies && reply.replies.length"
              class="comment-reply"
              :items="reply.replies"
            />
          </div>
        </div>
      </div>
      <div v-if="isReplying" style="display: flex">
        <img
          src="../../../../public/img/icon/reply_arrow.png"
          style="
            width: 30px;
            height: 30px;
            margin-top: 25px;
            margin-right: 15px;
          "
        />
        <div style="margin-top: 30px; margin-bottom: 10px; display: flex">
          <q-input
            v-model="replyContent"
            @input="updateReplyCharCount"
            filled
            style="width: 875px; height: 20px"
          />
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 10px;
              margin-left: 13px;
            "
          >
            <q-btn
              @click="writeReply"
              label="등록"
              color="primary"
              style="font-weight: 600; border-radius: 10px"
            />
            <q-btn
              @click="cancelReplying"
              label="취소"
              color="primary"
              style="margin-left: 5px; font-weight: 600; border-radius: 10px"
            />
          </div>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
import CommentList from './CommentList.vue';
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';

const { comment } = defineProps(['comment']);
const replies = ref([]);
const isEditing = ref(false);
const editedContent = ref(comment.content);
const originalContent = ref(comment.content);
const emit = defineEmits(['update:comment', 'comment-deleted']);
const isReplying = ref(false);
const replyContent = ref('');
const confirmDelete = ref(false);

const fetchData = async () => {
  if (replies.value.length === 0) {
    try {
      const response = await axios.get(
        `http://13.209.29.227:8080/reply/${comment.id}`,
      );
      if (response.data.success) {
        replies.value = response.data.data.infoList.map(reply => ({
          id: reply.replyId,
          writer: reply.username,
          date: formatCreatedAt(reply.createdAt),
          content: reply.content,
          profile: reply.profile,
          replies: [],
        }));
      } else {
        console.error('Failed to fetch replies:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  }
};

const formatCreatedAt = createdAt => {
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
};

const startReplying = () => {
  isReplying.value = true;
};

const cancelReplying = () => {
  isReplying.value = false;
};

const writeReply = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    await axios.post(
      `http://13.209.29.227:8080/reply/${comment.id}`,
      {
        content: replyContent.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    isReplying.value = false;
    location.reload();
  } catch (error) {
    console.error('Error writing reply:', error);
  }
};

const editComment = () => {
  isEditing.value = true;
  originalContent.value = comment.content;
};

const saveEdit = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.put(
      `http://13.209.29.227:8080/comments/${comment.id}`,
      {
        content: editedContent.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.data.success) {
      originalContent.value = editedContent.value;
      emit('upadate:comment', {
        commentId: comment.id,
        newContent: editedContent.value,
      });
      isEditing.value = false;
      location.reload();
    } else {
      console.error('Failed to update comment:', response.data.message);
    }
  } catch (error) {
    console.error('Error updating comment:', error);
    console.log(editedContent.value);
  }
};

const deleteComment = async () => {
  const token = localStorage.getItem('accessToken');
  try {
    const response = await axios.delete(
      `http://13.209.29.227:8080/comments/${comment.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.data.success) {
      emit('comment-deleted', { commentId: comment.id });
      const parentCommentId = comment.id;
      emit('comment-deleted', { commentId: parentCommentId });
    } else {
      console.error('Failed to delete comment:', response.data.message);
    }
    location.reload();
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style lang="scss" scoped>
.writer,
.date {
  margin-top: 5px;
}
.content {
  font-size: 16.8px;
  font-weight: bold;
  color: #313440;
}
.reply-separator {
  width: 103%;
  margin-left: -15.5px;
}
.comment-reply {
  margin-top: 20px;
  padding-left: 30px;
}
</style>
