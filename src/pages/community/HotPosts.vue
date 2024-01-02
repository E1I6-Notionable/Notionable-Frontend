<template>
  <div>
    <CustomHeader />
    <div class="community-page">
      <Tabs />
      <PostList :items="posts" :showLabel="true" />
    </div>
    <CustomFooter />
  </div>
</template>

<script>
import CustomHeader from 'src/components/CustomHeader.vue';
import CustomFooter from 'src/components/CustomFooter.vue';
import Tabs from 'src/components/community/CommunityTabs.vue';
import PostList from 'src/components/community/PostList.vue';

export default {
  components: {
    CustomHeader,
    Tabs,
    PostList,
    CustomFooter,
  },
  data() {
    return {
      posts: [
        {
          id: 1,
          title: '일 잘하는 PM 소리 듣는 노션 활용법 공유할게요!',
          content:
            '요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~\n 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~\n 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~',
          likeCount: 106,
          commentCount: 23,
          label: 'TOP 1',
        },
        {
          id: 2,
          title: '일 잘하는 PM 소리 듣는 노션 활용법 공유할게요!',
          content:
            '요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~\n 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~\n 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~',
          likeCount: 106,
          commentCount: 23,
          label: 'TOP 2',
        },
        {
          id: 3,
          title: '일 잘하는 PM 소리 듣는 노션 활용법 공유할게요!',
          content:
            '요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~\n 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~\n 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~',
          likeCount: 106,
          commentCount: 23,
          label: 'TOP 3',
        },
        {
          id: 4,
          title: '일 잘하는 PM 소리 듣는 노션 활용법 공유할게요!',
          content:
            '요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~\n 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~\n 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~',
          likeCount: 106,
          commentCount: 23,
          label: 'TOP 4',
        },
        {
          id: 5,
          title: '일 잘하는 PM 소리 듣는 노션 활용법 공유할게요!',
          content:
            '요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~\n 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~\n 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~ 요즘 노션 정말 필수잖아요~',
          likeCount: 106,
          commentCount: 23,
          label: 'TOP 5',
        },
      ],
    };
  },

  // computed: {
  //   topPosts() {
  //   const sortedPosts = [...this.posts].sort((a, b) => b.likeCount - a.likeCount);
  //   return sortedPosts.slice(0, 5);
  //   },
  //   },
};
</script>
