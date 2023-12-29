<template>
  <q-item class="comment-item q-py-md">
    <q-item-section>
      <div class="row">
        <q-avatar size="md">
          <q-icon
            class="account"
            name="account_circle"
            size="md"
            color="grey"
            :label="account"
        /></q-avatar>
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
            style="color: #313440; font-weight: 500; font-size: medium"
            >{{ comment.date }}</span
          >
        </div>
      </div>

      <div class="q-mt-md content">
        {{ comment.content }}
      </div>
      <div v-if="comment.replies">
        <div
          class="reply-separator"
          style="border-top: 0.5px solid #e0e0e0; margin-top: 20px"
        />
        <div class="row">
          <q-icon
            class="q-ml-md"
            name="subdirectory_arrow_right"
            style="margin-top: 16px; font-size: 28px; color: grey"
            :label="reply"
          />
          <div style="margin-top: -20px; margin-bottom: -10px">
            <CommentList class="comment-reply" :items="comment.replies" />
          </div>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
import CommentList from './CommentList.vue';

defineProps(['comment']);
</script>

<style lang="scss" scoped>
.writer,
.date {
  margin-top: 5px;
}
.content {
  font-size: 16.8px;
  font-weight: 550;
  color: #313440;
}
.reply-separator {
  width: 103%;
  margin-left: -15.5px;
}
</style>
