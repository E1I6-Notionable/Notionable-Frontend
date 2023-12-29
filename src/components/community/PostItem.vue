<template>
  <q-item clickable :to="`/posts/${post.id}`" class="post-item">
    <q-item-section>
      <p v-if="showLabel" class="label">{{ post.label }}</p>
      <div class="post-title">
        <p class="post-tab">꿀팁</p>
        <p class="bar">|</p>
        <h5>일 잘하는 PM 소리 듣는 노션 활용법 공유할게요!</h5>
      </div>
      <div class="post-content">
        <p>
          {{ post.content }}
        </p>
      </div>
      <div class="row post-info">
        <div class="row time">
          <span class="created">2시간 전</span>
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
            <q-icon name="sym_o_chat_bubble" size="sm" :label="commentCount" />
            <span class="text-black q-ml-xs text-body2">23</span>
          </q-btn>
        </div>
      </div>
      <q-separator class="separator" />
    </q-item-section>
  </q-item>
</template>

<script>
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
};
</script>

<style scoped>
.post-item {
  margin: 20px 0px;
}

.label {
  font-size: 21px;
  font-weight: bolder;
  color: #313440;
  padding-top: 18px;
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
  font-size: small;
  align-items: center;
  justify-content: center;
  background-color: #d6e1f5;
  border-radius: 5px;
  padding: 3px 10px;
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
  font-size: 18px;
  font-weight: 530;
  margin-top: 10px;
  white-space: pre-line;
}

.post-info {
  margin: 20px 0px;
}

.created {
  padding: 6px 0px;
}

.like,
.comment {
  padding: 2px 0px;
}
</style>
