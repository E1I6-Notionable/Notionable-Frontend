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
import axios from 'axios';

export default {
  components: {
    CustomHeader,
    Tabs,
    PostList,
    CustomFooter,
  },

  data() {
    return {
      posts: [],
      currentPage: 0,
      hasMorePosts: true,
      keyword: null,
      filter: null,
      pageSize: 5,
    };
  },

  async created() {
    await this.fetchPosts();
  },

  methods: {
    async fetchPosts() {
      try {
        const { data } = await axios.get(
          'http://13.209.29.227:8080/posts/hot',
          {
            params: {
              keyword: this.keyword,
              filter: this.filter,
              page: this.currentPage,
              size: this.pageSize,
            },
          },
        );

        if (data.success) {
          let newPosts = data.data.map((item,index) => ({
            id: item.communityId,
            category: item.category,
            title: item.title,
            content: item.content,
            likeCount: item.communityLike,
            commentCount: item.communityComment,
            createdAt: item.createdAt,
            thumbnail: item.thumbnail,
            label:index+1,
          }));

          if (this.currentPage < data.maxPageCount - 1) {
            this.currentPage++;
            await this.fetchPosts();
          } else {
            this.hasMorePosts = false;
          }

          this.posts = [...this.posts, ...newPosts];
        } else {
          console.error('Backend returned success: false', data);
        }
      } catch (error) {
        console.error('Error fetching data from the backend', error);
      }
    },
  },
};
</script>
