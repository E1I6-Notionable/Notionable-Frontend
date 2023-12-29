<template>
  <div class="tabs-container">
    <div class="tabs">
      <div
        v-for="tab in tabs"
        :key="tab"
        @click="selectTab(tab)"
        :class="{ active: selectedTab === tab }"
      >
        {{ tab }}
      </div>
    </div>
    <q-btn
      padding="8px 12px 8px 8px"
      unelevated
      color=""
      text-color="black"
      class="post-write"
      border-color="CACBD3"
    >
      <q-avatar
        class="q-mr-sm"
        color="semi-dark"
        text-color="primary"
        size="22px"
      >
        <q-icon name="edit" size="14px" />
      </q-avatar>
      <span class="text-weight-bold">글 작성하기</span>
    </q-btn>
    <component :is="selectedComponent" />
  </div>
</template>

<script>
import AllPosts from 'src/components/community/posts/AllPosts.vue';
import HotPosts from 'src/components/community/posts/HotPosts.vue';
import FreePosts from 'src/components/community/posts/FreePosts.vue';
import InquiryPosts from 'src/components/community/posts/InquiryPosts.vue';
import TipPosts from 'src/components/community/posts/TipPosts.vue';

export default {
  data() {
    return {
      tabs: ['전체글', '인기글', '자유게시판', '꿀팁공유', '질문있어요'],
      selectedTab: '전체글',
    };
  },
  computed: {
    selectedComponent() {
      switch (this.selectedTab) {
        case '전체글':
          return AllPosts;
        case '인기글':
          return HotPosts;
        case '자유게시판':
          return FreePosts;
        case '꿀팁공유':
          return TipPosts;
        case '질문있어요':
          return InquiryPosts;
        default:
          return AllPosts;
      }
    },
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
    },
  },
};
</script>

<style scoped>
.tabs-container {
  margin: 70px 360px;
}

.tabs {
  display: flex;
  cursor: pointer;
}

.tabs div {
  padding: 8px 15px;
  margin-right: 25px;
  font-weight: 600;
}

.tabs div.active {
  border: 1.5px solid #3168cd;
  border-radius: 50px;
  color: #3168cd;
}

.post-write {
  display: flex;
  margin-left: auto;
  border: 1.5px solid #cacbd3;
  border-radius: 50px;
}

</style>
