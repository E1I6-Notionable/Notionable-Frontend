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
        </div>
        <div style="display: flex; margin-top: 5px">
          <span v-if="!isEditing" @click="editComment" style="cursor: pointer;">수정</span>
          <span v-if="isEditing" @click="saveEdit" style="cursor:pointer">완료</span>
          <span>&nbsp;|&nbsp; </span>
          <span @click="confirmDelete" style="cursor: pointer;">삭제</span>
        </div>
      </div>

      <div v-if="!isEditing" class="q-mt-md content">{{ comment.content }}</div>
      <div v-if="isEditing" class="q-mt-md">
        <q-input
          v-model="editedContent"
          autogrow
          counter
          @input="updateCharCount"
        />
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
              <div
                style="margin-top: 7px; display: flex"
              >
                <span>수정</span>
                <span>&nbsp;|&nbsp; </span>
                <span>삭제</span>
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
    </q-item-section>
  </q-item>
</template>

<script setup>
import CommentList from './CommentList.vue';
import { ref, onMounted, defineProps } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';

const { comment } = defineProps(['comment']);
const replies = ref([]);
const isEditing = ref(false);
const editedContent = ref(comment.content);
const originalContent = ref(comment.content);


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

const editComment = () => {
  isEditing.value = true;
  originalContent.value = comment.content;
};

const saveEdit = async () => {
  try {
    const response = await axios.put(`http://13.209.29.227:8080/comments/${comment.id}`, {
      content: editedContent.value,
    });

    if (response.data.success) {
      emit('comment-updated', { commentId: comment.id, newContent: editedContent.value });
      isEditing.value = false;
    } else {
      console.error('Failed to update comment:', response.data.message);
    }
  } catch (error) {
    console.error('Error updating comment:', error);
    console.log(editedContent.value);

  }
};

const confirmDelete = () => {
  const userConfirmed = window.confirm('댓글을 삭제하시겠습니까?');

  if (userConfirmed) {
    deleteComment();
  }
};

const deleteComment = async () => {
  try {
    const response = await axios.delete(`http://13.209.29.227:8080/comments/${comment.id}`);

    if (response.data.success) {
      emit('comment-deleted', { commentId: comment.id });
    } else {
      console.error('Failed to delete comment:', response.data.message);
    }
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
