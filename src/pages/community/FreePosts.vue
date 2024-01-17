<template>
  <div>
    <CustomHeader />
    <div class="community-page">
      <Tabs />
      <q-infinite-scroll @load="loadMorePosts" :offset="250">
        <PostList :items="posts" />
      </q-infinite-scroll>
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
      pageSize: 6,
    };
  },

  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get(
          'http://13.209.29.227:8080/posts/all?filter=자유',
          {
            params: {
              keyword: this.keyword,
              filter: this.filter,
              page: this.currentPage,
              size: this.pageSize,
            },
          },
        );

        if (response.status === 200) {
          const { data } = response;

          if (data.success) {
            let newPosts = data.data.infoList.map(item => ({
              id: item.communityId,
              category: item.category,
              title: item.title,
              content: item.content,
              likeCount: item.communityLike,
              commentCount: item.communityComment,
              createdAt: item.createdAt,
              thumbnail: item.thumbnail,
            }));

            if (this.currentPage < data.data.maxPageCount - 1) {
              this.currentPage++;
              this.fetchPosts();
            } else {
              this.hasMorePosts = false;
            }

            this.posts = [...this.posts, ...newPosts];
          } else {
            console.error('Backend returned success: false', data);
          }
        } else {
          console.error('Non-200 status code received', response);
        }
      } catch (error) {
        console.error('Error fetching data from the backend', error);
      }
    },

    loadMorePosts() {
      if (this.hasMorePosts) {
        this.fetchPosts();
      }
    },
  },
};
</script>
