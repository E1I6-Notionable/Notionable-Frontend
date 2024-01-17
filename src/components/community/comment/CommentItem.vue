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
        <div class="flex text-caption q-pl-sm">
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
      </div>

      <div class="q-mt-md content">{{ comment.content }}</div>
      <div v-if="replies.length">
        <div
          class="reply-separator"
          style="border-top: 0.5px solid #e0e0e0; margin-top: 20px"
        ></div>
        <div class="row">
          <img src="../../../../public/img/icon/reply_arrow.png" />
          <div style="margin-top: -20px; margin-bottom: -10px">
            <CommentList class="comment-reply" :items="replies" />
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

const { comment } = defineProps(['comment']);
// const props = defineProps(['comment']);
const replies = ref([]);
console.log(comment.id);
const fetchData = async () => {
  try {
    const response = await axios.get(
      `http://13.209.29.227:8080/reply/${comment.id}`,
    );
    if (response.data.success) {
      replies.value = response.data.data.infoList.map(reply => ({
        id: reply.replyId,
        writer: reply.username,
        date: reply.createdAt,
        content: reply.content,
        profile: reply.profile,
      }));
    } else {
      console.error('Failed to fetch replies:', response.data.message);
    }
  } catch (error) {
    console.error('Error fetching replies:', error);
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
